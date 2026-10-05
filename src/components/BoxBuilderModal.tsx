import React, { useState } from 'react';
import { Product, CartItem } from '../types/candy';
import { RIBBON_OPTIONS } from '../data/candies';
import { X, Check, Gift, Sparkles, Plus, Trash2, ArrowRight } from 'lucide-react';

interface BoxBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddBoxToCart: (item: CartItem) => void;
}

export const BoxBuilderModal: React.FC<BoxBuilderModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddBoxToCart,
}) => {
  const [boxSize, setBoxSize] = useState<6 | 12>(6);
  const [selectedCandies, setSelectedCandies] = useState<{ [candyId: string]: number }>({});
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0]);
  const [recipient, setRecipient] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalSelected = Object.values(selectedCandies).reduce((acc, qty) => acc + qty, 0);
  const remaining = boxSize - totalSelected;
  const boxPrice = boxSize === 6 ? 28.00 : 48.00;

  const handleAddCandy = (candyId: string) => {
    if (totalSelected >= boxSize) return;
    setSelectedCandies((prev) => ({
      ...prev,
      [candyId]: (prev[candyId] || 0) + 1,
    }));
  };

  const handleRemoveCandy = (candyId: string) => {
    setSelectedCandies((prev) => {
      const current = prev[candyId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[candyId];
        return next;
      }
      return { ...prev, [candyId]: current - 1 };
    });
  };

  const handleAutoFill = () => {
    const nextSelection: { [candyId: string]: number } = {};
    let count = 0;
    const popularProducts = products.filter((p) => p.isPopular);
    const pool = popularProducts.length ? popularProducts : products;

    while (count < boxSize) {
      const randomCandy = pool[count % pool.length];
      nextSelection[randomCandy.id] = (nextSelection[randomCandy.id] || 0) + 1;
      count++;
    }
    setSelectedCandies(nextSelection);
  };

  const handleClear = () => {
    setSelectedCandies({});
  };

  const handleAddToCart = () => {
    if (totalSelected < boxSize) return;

    const boxItemsList = Object.entries(selectedCandies).map(([cId, qty]) => {
      const prod = products.find((p) => p.id === cId);
      return {
        name: prod?.name || 'Artisan Sweet',
        quantity: qty,
      };
    });

    const customBoxCartItem: CartItem = {
      id: `box-${Date.now()}`,
      name: `${boxSize}-Piece Bespoke Confectionery Casket`,
      price: boxPrice,
      quantity: 1,
      image: products[0].image,
      weightOrSize: `${boxSize} Handcrafted Pieces`,
      isCustomBox: true,
      boxItems: boxItemsList,
      ribbonColor: selectedRibbon.name,
      giftNote: giftNote ? `To: ${recipient || 'Honored Recipient'} — "${giftNote}"` : undefined,
    };

    onAddBoxToCart(customBoxCartItem);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  // Convert selection into flat array of items for slot display
  const filledSlots: Product[] = [];
  Object.entries(selectedCandies).forEach(([id, qty]) => {
    const candy = products.find((p) => p.id === id);
    if (candy) {
      for (let i = 0; i < qty; i++) {
        filledSlots.push(candy);
      }
    }
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="box-builder-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#E8DFD5] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#8C4A26]" />
            <h2 id="box-builder-title" className="font-display text-xl sm:text-2xl font-bold text-[#241F1C]">
              Bespoke Sweet Box Studio
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sweet box studio"
            className="p-1.5 rounded-full hover:bg-[#EAE2D5] text-[#241F1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Step 1: Select Box Size */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C4A26]">Step 1 · Select Box Size</p>
              <h3 className="font-display text-lg font-semibold text-[#241F1C]">Choose Casket Dimension</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setBoxSize(6);
                  setSelectedCandies({});
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  boxSize === 6
                    ? 'border-[#8C4A26] bg-[#8C4A26] text-white shadow-sm'
                    : 'border-[#D9CFC4] bg-white text-[#241F1C] hover:border-[#8C4A26]'
                }`}
              >
                6-Piece Petite Box · $28.00
              </button>
              <button
                onClick={() => {
                  setBoxSize(12);
                  setSelectedCandies({});
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  boxSize === 12
                    ? 'border-[#8C4A26] bg-[#8C4A26] text-white shadow-sm'
                    : 'border-[#D9CFC4] bg-white text-[#241F1C] hover:border-[#8C4A26]'
                }`}
              >
                12-Piece Grand Casket · $48.00
              </button>
            </div>
          </div>

          {/* Visual Box Chamber Preview */}
          <div className="p-5 bg-[#241F1C] text-[#FAF7F2] rounded-2xl border border-[#3D3530] shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#C9933B] font-semibold">
                  Visual Casket Preview
                </span>
                <span className="text-xs text-stone-400">
                  ({totalSelected}/{boxSize} slots filled)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAutoFill}
                  className="text-xs text-[#E8C5A8] hover:text-white flex items-center gap-1 underline underline-offset-4"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Atelier Auto-Fill</span>
                </button>
                {totalSelected > 0 && (
                  <button
                    onClick={handleClear}
                    className="text-xs text-stone-400 hover:text-red-300 flex items-center gap-1 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Grid of Slots */}
            <div
              className={`grid gap-3 ${
                boxSize === 6 ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-4 sm:grid-cols-6'
              }`}
            >
              {Array.from({ length: boxSize }).map((_, idx) => {
                const filledCandy = filledSlots[idx];
                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-xl border border-dashed flex flex-col items-center justify-center p-2 relative overflow-hidden transition-all ${
                      filledCandy
                        ? 'border-[#C9933B] bg-[#332A25]'
                        : 'border-stone-700 bg-stone-900/40 text-stone-500'
                    }`}
                  >
                    {filledCandy ? (
                      <>
                        <img
                          src={filledCandy.image}
                          alt={filledCandy.name}
                          className="w-8 h-8 rounded-full object-cover mb-1 border border-[#C9933B]/50"
                        />
                        <span className="text-[10px] text-[#FAF7F2] text-center font-medium line-clamp-1 leading-tight">
                          {filledCandy.name}
                        </span>
                        <button
                          onClick={() => handleRemoveCandy(filledCandy.id)}
                          aria-label={`Remove one ${filledCandy.name}`}
                          className="absolute -top-1 -right-1 bg-red-800 text-white rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-mono text-stone-600">#{idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Ribbon Accent Bar */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span>Hand-tied Ribbon:</span>
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block border border-white/20"
                  style={{ backgroundColor: selectedRibbon.hex }}
                />
                <span className="font-semibold text-white">{selectedRibbon.name}</span>
              </div>
              <span className="text-[#C9933B] font-mono tabular-nums text-xs">
                {remaining === 0 ? '✓ Ready to seal' : `Select ${remaining} more sweets`}
              </span>
            </div>
          </div>

          {/* Step 2: Choose Candies from Catalog */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C4A26]">Step 2 · Fill The Slots</p>
                <h3 className="font-display text-base font-semibold text-[#241F1C]">Select Confections to Include</h3>
              </div>
              <span className="text-xs text-[#70645B]">
                {remaining > 0 ? `${remaining} remaining` : 'Casket is full!'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {products.map((product) => {
                const count = selectedCandies[product.id] || 0;
                return (
                  <div
                    key={product.id}
                    className="p-3 bg-white border border-[#E8DFD5] rounded-xl flex items-center justify-between gap-3 hover:border-[#8C4A26] transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#241F1C] truncate">{product.name}</p>
                      <p className="text-[11px] text-[#70645B] truncate">{product.flavorNotes[0]}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {count > 0 && (
                        <>
                          <button
                            onClick={() => handleRemoveCandy(product.id)}
                            className="w-6 h-6 rounded-md bg-[#FAF7F2] border border-[#D9CFC4] text-[#241F1C] flex items-center justify-center font-bold text-xs hover:bg-[#EFEAE2]"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold tabular-nums px-1">{count}</span>
                        </>
                      )}
                      <button
                        onClick={() => handleAddCandy(product.id)}
                        disabled={remaining <= 0}
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-all ${
                          remaining <= 0
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-[#8C4A26] text-white hover:bg-[#723B1E]'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Ribbon Selection */}
          <div className="p-4 bg-white border border-[#E8DFD5] rounded-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C4A26] mb-1">
              Step 3 · Signature Silk Ribbon
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {RIBBON_OPTIONS.map((ribbon) => (
                <button
                  key={ribbon.id}
                  onClick={() => setSelectedRibbon(ribbon)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    selectedRibbon.id === ribbon.id
                      ? 'border-[#241F1C] bg-[#FAF7F2] shadow-xs'
                      : 'border-[#E8DFD5] hover:border-[#8C4A26]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: ribbon.hex }}
                  />
                  <span>{ribbon.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Handwritten Gift Note (Optional) */}
          <div className="p-4 bg-white border border-[#E8DFD5] rounded-xl space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C4A26]">
                Step 4 · Complimentary Calligraphed Card (Optional)
              </p>
              <p className="text-xs text-[#70645B]">
                We pen your words by hand onto heavy archival cotton paper with a hot wax stamp.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient name (e.g., Madeleine)"
                className="p-2.5 text-xs bg-[#FAF7F2] border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26]"
              />
              <input
                type="text"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Gift message (e.g., Happy anniversary, darling!)"
                className="p-2.5 text-xs bg-[#FAF7F2] border border-[#D9CFC4] rounded-lg focus:outline-none focus:border-[#8C4A26]"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="px-6 py-4 border-t border-[#E8DFD5] bg-[#F5EFE6] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#70645B] block">Total Box Price</span>
            <span className="font-display font-bold text-xl text-[#241F1C] tabular-nums">
              ${boxPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={remaining > 0 || isSuccess}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              remaining > 0
                ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
                : isSuccess
                ? 'bg-emerald-700 text-white'
                : 'bg-[#8C4A26] hover:bg-[#723B1E] text-white'
            }`}
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Box Added to Bag!</span>
              </>
            ) : remaining > 0 ? (
              <span>Add {remaining} More to Complete Box</span>
            ) : (
              <>
                <span>Seal & Add Bespoke Box</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
