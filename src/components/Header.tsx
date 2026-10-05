import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBoxBuilder: () => void;
  onOpenTasteQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenBoxBuilder,
  onOpenTasteQuiz,
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      {/* Promotional Banner (max 40px, dismissible) */}
      {showPromo && (
        <div className="bg-[#241F1C] text-[#FAF7F2] text-xs py-2 px-4 flex items-center justify-between text-center border-b border-[#3D3530]">
          <div className="mx-auto flex items-center gap-2">
            <span className="text-[#C9933B]">✦</span>
            <span>Complimentary signature gift packaging & wax seal on orders over $45</span>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="hidden sm:inline text-stone-300">Small-batch kettle simmered weekly</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <a
          href="#"
          className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#241F1C] hover:opacity-90 transition-opacity"
        >
          Bonbonnière
        </a>

        {/* Zone 2: 4-5 Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#574D45]">
          <a
            href="#confections"
            className="hover:text-[#241F1C] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C4A26]"
          >
            Confections
          </a>
          <button
            onClick={onOpenBoxBuilder}
            className="hover:text-[#241F1C] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C4A26]"
          >
            Custom Box
          </button>
          <button
            onClick={onOpenTasteQuiz}
            className="hover:text-[#241F1C] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C4A26] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9933B]" />
            <span>Taste Finder</span>
          </button>
          <a
            href="#heritage"
            className="hover:text-[#241F1C] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C4A26]"
          >
            Craftsmanship
          </a>
          <a
            href="#ateliers"
            className="hover:text-[#241F1C] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C4A26]"
          >
            Ateliers
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBoxBuilder}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-[#FAF7F2] bg-[#8C4A26] rounded-full hover:bg-[#723B1E] transition-colors shadow-sm"
          >
            <span>Build Sweet Box</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Open shopping bag, ${cartCount} items`}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D9CFC4] hover:border-[#8C4A26] bg-[#FAF7F2] text-[#241F1C] transition-all hover:shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#8C4A26]" />
            <span className="text-xs font-semibold tabular-nums">
              Bag ({cartCount})
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-[#241F1C] hover:bg-[#EFEAE2] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drop */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFD5] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#3D3530]">
            <a
              href="#confections"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C4A26] transition-colors"
            >
              Confections Catalog
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBoxBuilder();
              }}
              className="py-1 text-left hover:text-[#8C4A26] transition-colors flex items-center justify-between"
            >
              <span>Custom Sweet Box</span>
              <span className="text-xs text-[#8C4A26] font-semibold">Pick & Mix</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTasteQuiz();
              }}
              className="py-1 text-left hover:text-[#8C4A26] transition-colors flex items-center gap-2 text-[#8C4A26]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Flavor & Mood Quiz</span>
            </button>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C4A26] transition-colors"
            >
              Copper Kettle Heritage
            </a>
            <a
              href="#ateliers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C4A26] transition-colors"
            >
              Boutique Ateliers
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBoxBuilder();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-[#8C4A26] rounded-xl hover:bg-[#723B1E] transition-colors shadow-sm"
            >
              Assemble Bespoke Box
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
