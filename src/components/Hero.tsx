import React from 'react';
import { ArrowRight, Sparkles, Award, Clock } from 'lucide-react';
import heroImg from '../assets/images/hero_artisan_candy_store_1791181722172.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onOpenBoxBuilder: () => void;
  onOpenTasteQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenBoxBuilder,
  onOpenTasteQuiz,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#E8DFD5]">
      {/* Background warm grain ambiance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Editorial Kicker (NO PILLS) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C4A26]">
              <span>Handcrafted Confections</span>
              <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
              <span>Normandy & Paris Atelier</span>
              <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
              <span>Est. 1928</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#241F1C] leading-[1.12] text-balance">
              Pure botanical sweets, slow-simmered for curious palates.
            </h1>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-[#574D45] leading-relaxed max-w-2xl">
              We practice the time-honored French art of copper-kettle confectionery.
              From tart, sugar-dusted botanical fruit gems to rich salted butter caramels,
              each batch is infused with real garden fruit purées, cold-pressed citrus, and zero synthetic colorings.
            </p>

            {/* Actions Zone */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-[#FAF7F2] bg-[#8C4A26] rounded-full hover:bg-[#723B1E] transition-all shadow-sm hover:shadow flex items-center gap-2"
              >
                <span>Browse The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBoxBuilder}
                className="px-6 py-3.5 text-sm font-semibold text-[#241F1C] bg-[#FAF7F2] border border-[#241F1C] rounded-full hover:bg-[#EFEAE2] transition-colors"
              >
                Create Pick & Mix Box
              </button>

              <button
                onClick={onOpenTasteQuiz}
                className="px-4 py-3 text-xs font-medium text-[#723B1E] hover:text-[#241F1C] transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9933B]" />
                <span className="underline underline-offset-4">Need help choosing? Take 30s Quiz</span>
              </button>
            </div>

            {/* Quantitative Quality Markers (Claim-to-proof) */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-[#E8DFD5] max-w-lg">
              <div>
                <p className="font-display text-2xl font-bold text-[#241F1C] tabular-nums">100%</p>
                <p className="text-xs text-[#70645B] mt-0.5">Real fruit & plant pigments</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#241F1C] tabular-nums">140°C</p>
                <p className="text-xs text-[#70645B] mt-0.5">Copper kettle caramelization</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#241F1C] tabular-nums">24h</p>
                <p className="text-xs text-[#70645B] mt-0.5">Fresh small batch release</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D9CFC4] shadow-xl bg-[#EFEAE2] aspect-[4/3] lg:aspect-[16/11]">
              <img
                src={heroImg}
                alt="Bonbonnière vintage confectionery shop with apothecary jars brimming with jewel-toned sweets"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* In-Frame Editorial Vignette Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-4 rounded-xl border border-[#E8DFD5] flex items-center justify-between text-[#241F1C]">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8C4A26] uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Now Simmering</span>
                  </div>
                  <p className="font-display font-medium text-sm mt-0.5">
                    Wild Raspberry & Elderflower Drops
                  </p>
                </div>
                <button
                  onClick={onExploreClick}
                  className="text-xs font-semibold px-3 py-1.5 bg-[#241F1C] text-white rounded-lg hover:bg-[#8C4A26] transition-colors whitespace-nowrap"
                >
                  View Batch
                </button>
              </div>
            </div>

            {/* Subtle decorative stamp */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#FAF7F2] border border-[#D9CFC4] rounded-full p-3 shadow-md items-center gap-2">
              <Award className="w-5 h-5 text-[#C9933B]" />
              <div className="text-left pr-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#70645B]">Artisan Award</p>
                <p className="text-xs font-semibold text-[#241F1C]">Salon du Chocolat 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
