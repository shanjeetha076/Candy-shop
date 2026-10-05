import React from 'react';
import { TASTING_NOTES_REVIEWS } from '../data/candies';
import { Flame, Sparkles, Sprout, MapPin, Clock, Star, Quote } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="heritage" className="py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C4A26] mb-3">
            <span>The Bonbonnière Method</span>
            <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
            <span>Artisan Confectionery Craft</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241F1C] tracking-tight">
            How true confectionery was meant to be tasted.
          </h2>
          <p className="text-base text-[#574D45] mt-4 leading-relaxed">
            In an era of high-fructose syrups and artificial flavorings, we maintain the uncompromising discipline of 19th-century master confectioners.
          </p>
        </div>

        {/* 3 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Pillar 1 */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-8 hover:border-[#8C4A26] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#8C4A26]/10 text-[#8C4A26] flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#241F1C] mb-2">
                Unlined Copper Kettles
              </h3>
              <p className="text-sm text-[#574D45] leading-relaxed">
                We simmer our syrups in thick solid French copper basins. Copper distributes heat with microsecond precision, preventing scorch spots and ensuring silky butter caramelization at exact sugar temperatures.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EFEAE2] text-xs font-mono text-[#8C4A26]">
              Controlled to 140°C · Zero crystallization
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-8 hover:border-[#8C4A26] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C9933B]/10 text-[#C9933B] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#241F1C] mb-2">
                Pure Cold-Pressed Botanicals
              </h3>
              <p className="text-sm text-[#574D45] leading-relaxed">
                Rather than synthetic chemical esters, our flavors stem directly from the soil: whole French raspberry purées, distilled organic lavender hydrosol, mountain thyme infusions, and cold-pressed citrus rinds.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EFEAE2] text-xs font-mono text-[#C9933B]">
              80% Fruit solids · Natural pectin base
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-8 hover:border-[#8C4A26] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#4B6B56]/10 text-[#4B6B56] flex items-center justify-center mb-6">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#241F1C] mb-2">
                Zero Artificial Dyes
              </h3>
              <p className="text-sm text-[#574D45] leading-relaxed">
                Nature provides all the vibrant hues we need. Our ruby reds come from heirloom beetroots, our warm ambers from demerara sugars, and our emerald greens from gentle alfalfa and spirulina extracts.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EFEAE2] text-xs font-mono text-[#4B6B56]">
              100% Plant pigments · Clean label verified
            </div>
          </div>
        </div>

        {/* Customer Proof & Sommelier Reviews */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C4A26] block">
              Tasting Testimonials
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#241F1C] mt-1">
              Praised by Chefs & Connoisseurs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TASTING_NOTES_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F5EFE6] border border-[#E8DFD5] rounded-xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-700 mb-3">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#C4B5A5] mb-2" />
                  <p className="text-xs sm:text-sm text-[#3D3530] italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E8DFD5] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#241F1C]">{rev.author}</p>
                    <p className="text-[#70645B] text-[11px]">{rev.role} · {rev.location}</p>
                  </div>
                  <span className="text-[10px] text-[#8C4A26] font-medium bg-[#EAE2D5] px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atelier Locations Section */}
        <div id="ateliers" className="bg-[#241F1C] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#3D3530]">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#C9933B] font-semibold">
              The Physical Parlours
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">
              Visit Our Flagship Sweet Boutiques
            </h3>
            <p className="text-sm text-stone-300 mt-2">
              Step inside our fragrant tasting rooms to sample fresh copper-kettle batches warm from the marble table, or commission a bespoke wedding casket.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#C9933B] font-semibold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Paris Atelier</span>
              </div>
              <p className="text-xs text-stone-300">
                42 Rue Saint-Honoré, 75001 Paris
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Tue – Sun: 10:00 – 19:30</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#C9933B] font-semibold text-sm">
                <MapPin className="w-4 h-4" />
                <span>London Sweet House</span>
              </div>
              <p className="text-xs text-stone-300">
                18 Floral Street, Covent Garden, WC2E 9DS
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Mon – Sat: 10:00 – 20:00</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#C9933B] font-semibold text-sm">
                <MapPin className="w-4 h-4" />
                <span>New York Salon</span>
              </div>
              <p className="text-xs text-stone-300">
                114 Prince Street, SoHo, NY 10012
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Daily: 11:00 – 19:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
