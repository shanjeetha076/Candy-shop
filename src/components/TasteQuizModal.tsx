import React, { useState } from 'react';
import { Product } from '../types/candy';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';

interface TasteQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const TasteQuizModal: React.FC<TasteQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onViewProduct,
}) => {
  const [step, setStep] = useState(1);
  const [flavorPreference, setFlavorPreference] = useState<string>('');
  const [texturePreference, setTexturePreference] = useState<string>('');
  const [moodPreference, setMoodPreference] = useState<string>('');
  const [recommendedCandy, setRecommendedCandy] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleCalculateMatch = (mood: string) => {
    setMoodPreference(mood);

    // Matching logic
    let match = products[0];
    if (flavorPreference === 'sour' || texturePreference === 'chewy') {
      match = products.find((p) => p.category === 'sour-crystals' || p.category === 'gummies') || products[0];
    } else if (flavorPreference === 'rich' || mood === 'evening') {
      match = products.find((p) => p.category === 'caramels' || p.category === 'chocolates') || products[1];
    } else if (texturePreference === 'crunchy' || flavorPreference === 'citrus') {
      match = products.find((p) => p.category === 'hard-candies') || products[2];
    }

    setRecommendedCandy(match);
    setStep(4); // result
  };

  const resetQuiz = () => {
    setStep(1);
    setFlavorPreference('');
    setTexturePreference('');
    setMoodPreference('');
    setRecommendedCandy(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="taste-quiz-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl max-w-lg w-full p-6 sm:p-8 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close taste finder"
          className="absolute top-4 right-4 p-2 text-[#70645B] hover:text-[#241F1C] rounded-full hover:bg-[#EFEAE2] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Steps header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#C9933B]" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C4A26]">
              {step <= 3 ? `Question ${step} of 3` : 'Sommelier Recommendation'}
            </span>
            <h2 id="taste-quiz-title" className="font-display text-xl font-bold text-[#241F1C]">
              {step === 1 && "What's your primary flavor craving?"}
              {step === 2 && 'What texture delights you most?'}
              {step === 3 && 'What is the tasting occasion?'}
              {step === 4 && 'Your Botanical Sweet Match'}
            </h2>
          </div>
        </div>

        {/* Question 1 */}
        {step === 1 && (
          <div className="space-y-3">
            {[
              { id: 'sour', title: 'Tart, Electric & Zesty', desc: 'Citric sparkle, sun-drenched lemons, sharp red berries' },
              { id: 'rich', title: 'Deep, Buttery & Decadent', desc: 'Fleur de sel caramel, toasted hazelnuts, 72% dark cocoa' },
              { id: 'botanical', title: 'Floral & Herbaceous', desc: 'Lavender blossoms, mountain thyme, damask rosewater' },
              { id: 'citrus', title: 'Bright & Crisp Fruit', desc: 'Blood orange zest, crisp apple, wild strawberries' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setFlavorPreference(opt.id);
                  setStep(2);
                }}
                className="w-full text-left p-4 rounded-xl border border-[#D9CFC4] hover:border-[#8C4A26] bg-white hover:bg-[#FAF7F2] transition-all group"
              >
                <p className="text-sm font-bold text-[#241F1C] group-hover:text-[#8C4A26] transition-colors">
                  {opt.title}
                </p>
                <p className="text-xs text-[#70645B] mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Question 2 */}
        {step === 2 && (
          <div className="space-y-3">
            {[
              { id: 'chewy', title: 'Soft, Silken Fruit Chew', desc: 'Tender pectin fruit pastes dusted in fine cane crystals' },
              { id: 'melty', title: 'Slow-Melting Velvet', desc: 'Long lingering rich caramel or velvety hazelnut praline' },
              { id: 'crunchy', title: 'Snap & Glassy Crunch', desc: 'Hard kettle-dropped barley sugar with crystalline mouthfeel' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setTexturePreference(opt.id);
                  setStep(3);
                }}
                className="w-full text-left p-4 rounded-xl border border-[#D9CFC4] hover:border-[#8C4A26] bg-white hover:bg-[#FAF7F2] transition-all group"
              >
                <p className="text-sm font-bold text-[#241F1C] group-hover:text-[#8C4A26] transition-colors">
                  {opt.title}
                </p>
                <p className="text-xs text-[#70645B] mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Question 3 */}
        {step === 3 && (
          <div className="space-y-3">
            {[
              { id: 'midday', title: 'Afternoon Pick-Me-Up', desc: 'Paired with Earl Grey tea, matcha, or sparkling water' },
              { id: 'evening', title: 'Evening Indulgence', desc: 'A quiet mindful ritual after dinner with coffee or wine' },
              { id: 'celebration', title: 'Sharing or Gifting', desc: 'A crowd-pleasing heirloom treat to delight loved ones' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleCalculateMatch(opt.id)}
                className="w-full text-left p-4 rounded-xl border border-[#D9CFC4] hover:border-[#8C4A26] bg-white hover:bg-[#FAF7F2] transition-all group"
              >
                <p className="text-sm font-bold text-[#241F1C] group-hover:text-[#8C4A26] transition-colors">
                  {opt.title}
                </p>
                <p className="text-xs text-[#70645B] mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && recommendedCandy && (
          <div className="space-y-5">
            <div className="p-4 bg-white border border-[#E8DFD5] rounded-xl flex gap-4 items-center">
              <img
                src={recommendedCandy.image}
                alt={recommendedCandy.name}
                className="w-20 h-20 rounded-xl object-cover border border-[#E8DFD5] shrink-0"
              />
              <div>
                <span className="text-[11px] font-bold text-[#8C4A26] uppercase tracking-wider">
                  {recommendedCandy.categoryLabel}
                </span>
                <h3 className="font-display font-bold text-lg text-[#241F1C]">
                  {recommendedCandy.name}
                </h3>
                <p className="text-xs text-[#574D45] mt-1 line-clamp-2">
                  {recommendedCandy.shortDesc}
                </p>
                <p className="font-display font-bold text-sm text-[#8C4A26] mt-1">
                  ${recommendedCandy.price.toFixed(2)} · {recommendedCandy.weight}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#F2EDE4] rounded-lg text-xs space-y-1">
              <p className="text-[#241F1C]">
                <strong>Why this fits: </strong>
                Matches your preference for {flavorPreference} tones and {texturePreference} textures.
              </p>
              <p className="text-[#70645B]">
                <strong>Aroma note: </strong> {recommendedCandy.flavorProfile.aroma}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(recommendedCandy);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1200);
                }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  added ? 'bg-emerald-700 text-white' : 'bg-[#8C4A26] text-white hover:bg-[#723B1E]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewProduct(recommendedCandy);
                }}
                className="py-3 px-4 rounded-xl text-xs font-semibold border border-[#241F1C] text-[#241F1C] hover:bg-[#EFEAE2] transition-colors"
              >
                Full Notes
              </button>

              <button
                onClick={resetQuiz}
                title="Retake Quiz"
                className="p-3 rounded-xl border border-[#D9CFC4] text-[#70645B] hover:text-[#241F1C] hover:bg-[#EFEAE2]"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
