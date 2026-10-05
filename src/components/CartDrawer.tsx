import React, { useState } from 'react';
import { CartItem } from '../types/candy';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 45.0;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (rawSubtotal * appliedPromo.percent) / 100 : 0;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const isFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);
  const progressPercent = Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'BONBON15') {
      setAppliedPromo({ code: 'BONBON15', percent: 15 });
      setPromoCode('');
    } else if (code === 'SWEET10') {
      setAppliedPromo({ code: 'SWEET10', percent: 10 });
      setPromoCode('');
    } else {
      setPromoError('Invalid promotion code. Try BONBON15');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl border-l border-[#E8DFD5] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFD5] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl text-[#241F1C]">
              Your Sweet Bag
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAE2D5] text-[#241F1C] tabular-nums">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sweet bag"
            className="p-1.5 rounded-full hover:bg-[#EAE2D5] text-[#241F1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF7F2] px-5 py-3 border-b border-[#E8DFD5]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-[#241F1C]">
              {isFreeShipping ? (
                <span className="text-[#3E7C69] font-bold">
                  ✓ Complimentary signature shipping unlocked!
                </span>
              ) : (
                <>
                  Add <strong className="tabular-nums text-[#8C4A26]">${amountNeededForFreeShipping.toFixed(2)}</strong> more for free shipping
                </>
              )}
            </span>
            <span className="text-[11px] text-[#70645B] tabular-nums">
              ${FREE_SHIPPING_THRESHOLD.toFixed(0)} Goal
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E8DFD5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8C4A26] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#70645B]">
              <span className="text-4xl mb-3">🍬</span>
              <p className="font-display text-lg font-bold text-[#241F1C]">Your bag is empty</p>
              <p className="text-xs mt-1 max-w-xs">
                Browse our botanical gummies, slow caramels, or assemble a custom gift box.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-full bg-[#8C4A26] text-white text-xs font-semibold hover:bg-[#723B1E] transition-colors"
              >
                Explore Confections
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white border border-[#E8DFD5] rounded-xl flex gap-3 relative hover:border-[#8C4A26]/40 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0 border border-[#E8DFD5]"
                />

                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#241F1C] leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#70645B] mt-0.5">
                    {item.weightOrSize}
                  </p>

                  {/* If custom box, show ribbon and contents */}
                  {item.isCustomBox && (
                    <div className="mt-1 text-[11px] text-[#8C4A26] space-y-0.5">
                      <div className="flex items-center gap-1 font-medium">
                        <Gift className="w-3 h-3 text-[#C9933B]" />
                        <span>Ribbon: {item.ribbonColor}</span>
                      </div>
                      {item.boxItems && (
                        <p className="text-[10px] text-stone-600 line-clamp-1">
                          Contains: {item.boxItems.map((b) => `${b.quantity}x ${b.name}`).join(', ')}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2EDE4]">
                    <span className="font-display font-bold text-sm text-[#241F1C] tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#D9CFC4] rounded-md bg-[#FAF7F2] p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#574D45] hover:text-[#241F1C]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums text-[#241F1C]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#574D45] hover:text-[#241F1C]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remove ${item.name} from bag`}
                  className="absolute top-3 right-3 text-stone-400 hover:text-red-700 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Drawer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E8DFD5] bg-[#F5EFE6] space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#70645B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. BONBON15)"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26] uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-semibold bg-[#241F1C] text-white rounded-lg hover:bg-[#8C4A26] transition-colors"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs text-[#3E7C69] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.percent}% off)</span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-stone-500 hover:text-red-700 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            )}

            {promoError && (
              <p className="text-xs text-red-600">{promoError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#574D45] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-[#241F1C]">
                  ${rawSubtotal.toFixed(2)}
                </span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-[#3E7C69]">
                  <span>Atelier Discount</span>
                  <span className="tabular-nums font-semibold">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Signature Insulated Shipping</span>
                <span className="tabular-nums font-semibold text-[#241F1C]">
                  {isFreeShipping ? 'FREE' : '$4.95'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#241F1C] pt-2 border-t border-[#E8DFD5]">
                <span>Estimated Total</span>
                <span className="tabular-nums font-display text-base text-[#8C4A26]">
                  ${(subtotal + (isFreeShipping ? 0 : 4.95)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onProceedToCheckout(appliedPromo ? appliedPromo.percent : 0, appliedPromo ? appliedPromo.code : '')}
              className="w-full py-3.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#8C4A26] hover:bg-[#723B1E] text-white transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#70645B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4B6B56]" />
              <span>Artisanal temperature-insulated delivery guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
