import React, { useState } from 'react';
import { Product } from '../types/candy';
import { Plus, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [addedRecently, setAddedRecently] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1200);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl overflow-hidden hover:border-[#8C4A26]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Product Display Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFEAE2]">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#E5DDD2] text-[#70645B] p-4 text-center">
            <span className="text-2xl mb-1">🍬</span>
            <p className="text-xs font-medium">{product.name}</p>
          </div>
        )}

        {/* Single subtle editorial text badge (max 1 tag, no pill clusters) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#241F1C]/90 backdrop-blur-sm text-[#FAF7F2] text-[11px] font-medium tracking-wide px-2.5 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Hover Quick View Icon Affordance */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`View tasting notes for ${product.name}`}
            className="p-2 bg-[#FAF7F2]/90 hover:bg-white text-[#241F1C] rounded-full shadow-md transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Unboxed Metadata (NO PILLS) */}
          <div className="flex items-center gap-1.5 text-xs text-[#70645B] font-medium tracking-wider uppercase mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
            <span>{product.weight}</span>
          </div>

          <h3 className="font-display font-semibold text-lg text-[#241F1C] group-hover:text-[#8C4A26] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#574D45] mt-1 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Flavor Notes unboxed tags */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3 text-[11px] text-[#8C4A26]">
            {product.flavorNotes.map((note, idx) => (
              <span key={note} className="flex items-center gap-1">
                {idx > 0 && <span className="text-[#D9CFC4]">/</span>}
                <span>{note}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Price & Purchase Row */}
        <div className="pt-4 mt-4 border-t border-[#EFEAE2] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#70645B]">Price</span>
            <span className="font-display font-bold text-lg text-[#241F1C] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="text-xs font-medium text-[#70645B] hover:text-[#241F1C] underline underline-offset-2 px-2 py-1"
            >
              Notes
            </button>
            <button
              onClick={handleAdd}
              disabled={addedRecently}
              aria-label={`Add ${product.name} to bag`}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                addedRecently
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#241F1C] hover:bg-[#8C4A26] text-[#FAF7F2]'
              }`}
            >
              {addedRecently ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
