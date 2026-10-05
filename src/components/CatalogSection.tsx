import React, { useState, useMemo } from 'react';
import { Product, CandyCategory, DietaryTag } from '../types/candy';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpenBoxBuilder: () => void;
}

const CATEGORIES: { id: CandyCategory; label: string }[] = [
  { id: 'all', label: 'All Confections' },
  { id: 'sour-crystals', label: 'Sour Crystals' },
  { id: 'caramels', label: 'Artisan Caramels' },
  { id: 'gummies', label: 'Botanical Gummies' },
  { id: 'hard-candies', label: 'Heirloom Hard Drops' },
  { id: 'chocolates', label: 'Gourmet Chocolates' },
];

const DIETARY_OPTIONS: DietaryTag[] = ['Vegan', 'Gluten-Free', 'Gelatin-Free', 'Nut-Free'];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onOpenBoxBuilder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CandyCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Dietary filter
        if (
          selectedDietary.length > 0 &&
          !selectedDietary.every((tag) => product.dietaryTags.includes(tag))
        ) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.shortDesc.toLowerCase().includes(q);
          const matchNotes = product.flavorNotes.some((n) => n.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchNotes) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, selectedCategory, selectedDietary, searchQuery, sortBy]);

  return (
    <section id="confections" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8DFD5]">
        <div>
          {/* Unboxed Kicker (NO PILLS) */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C4A26] mb-2">
            <span>The Atelier Counter</span>
            <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
            <span>Small-Batch Confections</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#241F1C] tracking-tight">
            Curated Sweets & Botanical Gems
          </h2>
          <p className="text-sm text-[#574D45] mt-2 max-w-xl">
            Simmered in copper cauldrons with pure unrefined cane sugars, wild berries, and floral essences.
          </p>
        </div>

        {/* Custom Sweet Box Teaser Button */}
        <button
          onClick={onOpenBoxBuilder}
          className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#8C4A26] text-[#8C4A26] hover:bg-[#8C4A26] hover:text-white transition-all text-xs font-semibold shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9933B]" />
          <span>Prefer a Mix? Build a Custom Gift Box</span>
        </button>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="pt-8 space-y-4">
        {/* Row 1: Category Segmented Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#241F1C] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#EFEAE2] text-[#574D45] hover:bg-[#E5DDD2] hover:text-[#241F1C]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Search, Dietary Filters & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#70645B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flavor, flower, fruit, or texture..."
              className="w-full pl-10 pr-9 py-2 text-xs bg-[#FAF7F2] border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26] text-[#241F1C] placeholder:text-[#8C4A26]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#70645B] hover:text-[#241F1C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dietary Checkbox Toggles & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#70645B] flex items-center gap-1 font-medium hidden lg:inline-flex">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Dietary:</span>
            </span>

            {DIETARY_OPTIONS.map((tag) => {
              const isChecked = selectedDietary.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    isChecked
                      ? 'border-[#4B6B56] bg-[#4B6B56]/10 text-[#2B4B36]'
                      : 'border-[#D9CFC4] bg-[#FAF7F2] text-[#70645B] hover:border-[#8C4A26]'
                  }`}
                >
                  {isChecked ? '✓ ' : ''}{tag}
                </button>
              );
            })}

            <div className="ml-auto sm:ml-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF7F2] border border-[#D9CFC4] text-xs text-[#241F1C] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8C4A26]"
              >
                <option value="featured">Sort: Atelier Curated</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid (3-column desktop baseline) */}
      <div className="mt-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#EFEAE2]/60 rounded-2xl border border-dashed border-[#D9CFC4] p-8">
            <p className="font-display text-xl text-[#241F1C]">No sweet confection matches your selection</p>
            <p className="text-xs text-[#70645B] mt-2">
              Try adjusting your dietary filters or clearing your search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary([]);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#8C4A26] bg-[#FAF7F2] border border-[#8C4A26] rounded-full hover:bg-[#8C4A26] hover:text-white transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
