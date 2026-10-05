import React, { useState } from 'react';
import { Product } from '../types/candy';
import { X, Check, ShoppingBag, Star, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 p-2 bg-[#FAF7F2]/90 hover:bg-[#EFEAE2] text-[#241F1C] rounded-full border border-[#D9CFC4] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Origin */}
          <div className="relative bg-[#EFEAE2] min-h-[300px] md:min-h-[440px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-3 rounded-lg border border-[#E8DFD5] text-xs">
              <span className="font-semibold text-[#8C4A26] block">Atelier Provenance:</span>
              <span className="text-[#574D45]">{product.origin}</span>
            </div>
          </div>

          {/* Right Column: Flavor Profile, Ingredients & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#70645B] mb-2">
                <span className="font-semibold tracking-wider uppercase text-[#8C4A26]">
                  {product.categoryLabel} · {product.weight}
                </span>
                <div className="flex items-center gap-1 text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                  <span className="text-[#8C4A26]/70">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 id="modal-product-title" className="font-display text-2xl font-bold text-[#241F1C] leading-snug">
                {product.name}
              </h2>
              <p className="font-display text-xl font-bold text-[#8C4A26] tabular-nums mt-1">
                ${product.price.toFixed(2)}
              </p>

              {/* Culinary Description */}
              <p className="text-sm text-[#574D45] mt-3 leading-relaxed">
                {product.fullDesc}
              </p>

              {/* Flavor Profile Bars */}
              <div className="mt-5 p-4 bg-[#F2EDE4] rounded-xl border border-[#E5DDD2] space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#241F1C]">
                  <span>Flavor Architecture</span>
                  <span className="text-[11px] font-normal text-[#70645B] italic">Tasting scale (1-5)</span>
                </div>

                {/* Sweetness */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#574D45] w-24">Sweetness</span>
                  <div className="flex-1 max-w-[140px] h-2 bg-[#E2D9CE] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8C4A26] rounded-full"
                      style={{ width: `${(product.flavorProfile.sweetness / 5) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right tabular-nums text-xs font-semibold text-[#241F1C]">
                    {product.flavorProfile.sweetness}/5
                  </span>
                </div>

                {/* Tartness */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#574D45] w-24">Tartness</span>
                  <div className="flex-1 max-w-[140px] h-2 bg-[#E2D9CE] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C9933B] rounded-full"
                      style={{ width: `${(product.flavorProfile.tartness / 5) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right tabular-nums text-xs font-semibold text-[#241F1C]">
                    {product.flavorProfile.tartness}/5
                  </span>
                </div>

                {/* Chewiness */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#574D45] w-24">Chewiness</span>
                  <div className="flex-1 max-w-[140px] h-2 bg-[#E2D9CE] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4B6B56] rounded-full"
                      style={{ width: `${(product.flavorProfile.chewiness / 5) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right tabular-nums text-xs font-semibold text-[#241F1C]">
                    {product.flavorProfile.chewiness}/5
                  </span>
                </div>

                <div className="pt-1.5 border-t border-[#E2D9CE] text-[11px] text-[#70645B]">
                  <strong className="text-[#241F1C]">Botanical Aroma: </strong>
                  {product.flavorProfile.aroma}
                </div>
              </div>

              {/* Pairings & Ingredients */}
              <div className="mt-4 space-y-2 text-xs">
                <p className="text-[#574D45]">
                  <strong className="text-[#241F1C]">Sommelier Pairing: </strong>
                  {product.pairings}
                </p>

                <div>
                  <strong className="text-[#241F1C]">Ingredients: </strong>
                  <span className="text-[#70645B]">
                    {product.ingredients.join(', ')}
                  </span>
                </div>

                {/* Dietary Markers */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#4B6B56]">
                  {product.dietaryTags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-6 mt-6 border-t border-[#E8DFD5] flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#D9CFC4] rounded-lg bg-[#FAF7F2] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="px-2.5 py-1 text-sm font-bold text-[#574D45] hover:text-[#241F1C]"
                >
                  -
                </button>
                <span className="px-3 text-sm font-semibold tabular-nums text-[#241F1C]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="px-2.5 py-1 text-sm font-bold text-[#574D45] hover:text-[#241F1C]"
                >
                  +
                </button>
              </div>

              {/* Add CTA */}
              <button
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#8C4A26] hover:bg-[#723B1E] text-[#FAF7F2]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
