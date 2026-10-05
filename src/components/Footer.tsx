import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#1C1714] text-[#FAF7F2] border-t border-[#332A24] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Ethos (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-[#FAF7F2]">
              Bonbonnière
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisan confectionery atelier committed to traditional French copper kettle simmering, pure unrefined cane sugars, wild botanicals, and zero synthetic colorings.
            </p>
            <div className="text-[11px] text-stone-500 pt-2 space-y-1">
              <p>Normandy Copper Atelier & Paris Flagship</p>
              <p>Certified Organic & Clean-Label Ingredients</p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C9933B]">
              Confections
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#confections" className="hover:text-white transition-colors">
                  Sour Botanical Gems
                </a>
              </li>
              <li>
                <a href="#confections" className="hover:text-white transition-colors">
                  Fleur de Sel Caramels
                </a>
              </li>
              <li>
                <a href="#confections" className="hover:text-white transition-colors">
                  Ribbon Swirl Lollipops
                </a>
              </li>
              <li>
                <a href="#confections" className="hover:text-white transition-colors">
                  Hazelnut Praline Bonbons
                </a>
              </li>
              <li>
                <a href="#confections" className="hover:text-white transition-colors">
                  Pâte de Fruits
                </a>
              </li>
            </ul>
          </div>

          {/* Heritage & Atelier (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C9933B]">
              The Atelier
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#heritage" className="hover:text-white transition-colors">
                  Copper Kettle Craft
                </a>
              </li>
              <li>
                <a href="#ateliers" className="hover:text-white transition-colors">
                  Paris Flagship Parlour
                </a>
              </li>
              <li>
                <a href="#ateliers" className="hover:text-white transition-colors">
                  London Sweet House
                </a>
              </li>
              <li>
                <a href="#ateliers" className="hover:text-white transition-colors">
                  New York Boutique
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-white transition-colors">
                  Sommelier Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Seasonal Batch Dispatch (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C9933B]">
              Seasonal Batch Gazette
            </p>
            <p className="text-xs text-stone-400">
              Receive private invitations when new small-batch copper kettle confections are drawn and bottled.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900 border border-stone-700 text-stone-200 placeholder:text-stone-500 rounded-lg focus:outline-none focus:border-[#C9933B]"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe to seasonal newsletter"
                  className="px-4 py-2 bg-[#8C4A26] hover:bg-[#723B1E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#3E7C69]">
                  ✓ Merci! You are registered for our next batch announcement.
                </p>
              )}
            </form>

            <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-2">
              <span>Zero spam</span>
              <span>·</span>
              <span>Handcrafted in small batches weekly</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Bonbonnière Atelier Confectionery Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Plant Dyes</span>
            <span>·</span>
            <span>Unlined Copper Basin Method</span>
            <span>·</span>
            <span>Fleur de Sel de Guérande</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
