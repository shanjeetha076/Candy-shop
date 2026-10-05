import React, { useState } from 'react';
import { CartItem } from '../types/candy';
import { X, CheckCircle, Package, Truck, CreditCard, ShieldCheck, ArrowRight, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercent: number;
  promoCode: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercent,
  promoCode,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card' as 'card' | 'cod' | 'applepay',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const isFreeShipping = rawSubtotal >= 45.0;
  const shippingCost = isFreeShipping ? 0 : 4.95;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount) + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.street || !formData.postalCode) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = `BB-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderNumber(randomOrder);
      setOrderConfirmed(true);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {!orderConfirmed ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#E8DFD5]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C4A26]">
                  Atelier Dispatch
                </span>
                <h2 id="checkout-modal-title" className="font-display text-2xl font-bold text-[#241F1C]">
                  Finalize Sweet Order
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="p-1.5 rounded-full hover:bg-[#EFEAE2] text-[#241F1C] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Recipient & Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#241F1C]">
                  1. Delivery Destination
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#70645B] mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Eleanor Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#70645B] mb-1">Email for Tracking</label>
                    <input
                      required
                      type="email"
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-[#70645B] mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      placeholder="74 Rosewood Terrace, Apt 4B"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#70645B] mb-1">City</label>
                    <input
                      required
                      type="text"
                      placeholder="London or New York"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#70645B] mb-1">Postal / ZIP Code</label>
                    <input
                      required
                      type="text"
                      placeholder="WC2E 9DS"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#241F1C]">
                  2. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'applepay', label: 'Apple / Google Pay', icon: ShieldCheck },
                    { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-[#8C4A26] bg-[#8C4A26]/10 text-[#8C4A26] font-semibold'
                            : 'border-[#D9CFC4] bg-white text-[#574D45] hover:border-[#8C4A26]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] leading-tight">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="p-4 bg-[#F5EFE6] border border-[#E8DFD5] rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-[#574D45]">
                  <span>Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                  <span className="tabular-nums font-semibold text-[#241F1C]">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#3E7C69]">
                    <span>Atelier Promo ({promoCode})</span>
                    <span className="tabular-nums font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#574D45]">
                  <span>Insulated Thermal Packaging & Shipping</span>
                  <span className="tabular-nums font-semibold text-[#241F1C]">
                    {isFreeShipping ? 'FREE' : '$4.95'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#241F1C] pt-2 border-t border-[#E2D9CE]">
                  <span>Total Due</span>
                  <span className="font-display text-[#8C4A26] tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#8C4A26] hover:bg-[#723B1E] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Dispatching Order to Atelier...</span>
                ) : (
                  <>
                    <span>Confirm Order · ${grandTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Confirmation Screen */
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#8C4A26] tracking-widest uppercase">
                Order Confirmed & Sealed
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#241F1C] mt-1">
                Thank you, {formData.fullName || 'Confection Lover'}!
              </h2>
              <p className="text-xs sm:text-sm text-[#574D45] mt-2 max-w-md mx-auto">
                Your order <strong className="font-mono text-[#241F1C]">{confirmedOrderNumber}</strong> has been transferred to our copper-kettle master. We are packing your confections with parchment and custom ribbon.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white border border-[#E8DFD5] rounded-xl p-5 text-left text-xs space-y-2 max-w-md mx-auto shadow-xs">
              <div className="flex justify-between font-bold border-b border-[#E8DFD5] pb-2 text-[#241F1C]">
                <span>Order Reference:</span>
                <span className="font-mono">{confirmedOrderNumber}</span>
              </div>
              <div className="flex justify-between text-[#574D45]">
                <span>Shipping To:</span>
                <span className="text-right text-[#241F1C]">{formData.street}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-[#574D45]">
                <span>Payment Method:</span>
                <span className="uppercase text-[#241F1C]">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[#574D45]">
                <span>Estimated Arrival:</span>
                <span className="font-semibold text-emerald-800">In 2–3 Business Days</span>
              </div>
              <div className="flex justify-between text-[#241F1C] font-bold pt-2 border-t border-[#E8DFD5]">
                <span>Amount Paid:</span>
                <span className="font-display text-sm text-[#8C4A26]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-full border border-[#D9CFC4] text-xs font-semibold text-[#241F1C] hover:bg-[#EFEAE2] transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#241F1C] hover:bg-[#8C4A26] text-white text-xs font-semibold transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
