import { Product } from '../types/candy';

import sourGemsImg from '../assets/images/product_sour_gem_gummies_1791181736266.jpg';
import saltedCaramelsImg from '../assets/images/product_salted_caramels_1791181748411.jpg';
import swirlLollipopsImg from '../assets/images/product_swirl_lollipops_1791181759135.jpg';
import chocolateBonbonsImg from '../assets/images/product_chocolate_bonbons_1791181771050.jpg';

export const CANDY_PRODUCTS: Product[] = [
  {
    id: 'sour-botanical-gems',
    name: 'Sour Botanical Crystal Gems',
    category: 'sour-crystals',
    categoryLabel: 'Sour Crystals',
    price: 14.50,
    weight: '160g Tin',
    shortDesc: 'Jewel-cut pectin fruit gems dusted in citric cane sugar and elderflower.',
    fullDesc: 'Slow-poured into faceted jewel molds and dusted in natural citric crystals from Sicilian lemons. Flavors include wild raspberry hibiscus, golden passionfruit bergamot, and tart green apple mint.',
    image: sourGemsImg,
    flavorNotes: ['Wild Raspberry', 'Golden Passionfruit', 'Elderflower Tartness'],
    flavorProfile: {
      sweetness: 3,
      tartness: 5,
      chewiness: 4,
      aroma: 'Fresh citrus zest & wild berries'
    },
    dietaryTags: ['Vegan', 'Gluten-Free', 'Gelatin-Free'],
    ingredients: ['Organic Cane Sugar', 'Fruit Pectin', 'Cold-Pressed Citrus Oils', 'Raspberry Purée', 'Elderflower Extract', 'Citric Acid (from lemons)', 'Natural Turmeric & Beetroot Juice for color'],
    pairings: 'Iced Jasmine tea or crisp dry sparkling cider.',
    origin: 'Handmade in Normandy Atelier',
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Atelier Favorite',
    isPopular: true
  },
  {
    id: 'fleur-de-sel-caramels',
    name: 'Fleur de Sel Butter Caramels',
    category: 'caramels',
    categoryLabel: 'Artisan Caramels',
    price: 16.00,
    weight: '180g Box',
    shortDesc: 'Slow copper-kettle cooked butter caramels topped with crunchy Guérande salt.',
    fullDesc: 'Cooked in heavy unlined copper kettles over gentle flame for over four hours until deep amber. Made with grass-fed churned Normandy butter, Madagascar bourbon vanilla, and finished with delicate flaky sea salt flakes.',
    image: saltedCaramelsImg,
    flavorNotes: ['Burnt Demerara', 'Creamy Butter', 'Flaky Guérande Salt'],
    flavorProfile: {
      sweetness: 4,
      tartness: 1,
      chewiness: 5,
      aroma: 'Toasted butter & Bourbon vanilla bean'
    },
    dietaryTags: ['Gluten-Free', 'Organic'],
    ingredients: ['Heavy Cream (Normandy)', 'Demerara Cane Sugar', 'Churned Farm Butter', 'Fleur de Sel de Guérande', 'Madagascar Bourbon Vanilla Pods'],
    pairings: 'Single origin pour-over coffee or aged peaty bourbon.',
    origin: 'Brittany & Normandy Craft Kitchen',
    rating: 5.0,
    reviewsCount: 214,
    badge: 'Gold Medal 2025',
    isPopular: true
  },
  {
    id: 'artisan-swirl-lollipops',
    name: 'Heritage Ribbon Swirl Lollipops',
    category: 'hard-candies',
    categoryLabel: 'Heirloom Hard Candies',
    price: 9.50,
    weight: 'Set of 3 (90g each)',
    shortDesc: 'Hand-pulled ribbon sugar lollipops infused with real lavender and wild strawberry.',
    fullDesc: 'Crafted following 19th-century sugar-pulling traditions on marble cooling slabs. Delicate ribbons of pastel pink and cream are hand-twisted around wooden beechwood sticks, flavored with pure botanical fruit essences.',
    image: swirlLollipopsImg,
    flavorNotes: ['Wild Strawberry', 'Lavender Mist', 'Crisp Barley Sugar'],
    flavorProfile: {
      sweetness: 4,
      tartness: 2,
      chewiness: 1,
      aroma: 'Subtle Provence lavender & fresh berries'
    },
    dietaryTags: ['Vegan', 'Gluten-Free', 'Nut-Free'],
    ingredients: ['Refined Beet Sugar', 'Glucose', 'Provence Lavender Hydrosol', 'Cold-Pressed Wild Strawberry Essence', 'Natural Radish Extract for rose tint'],
    pairings: 'Afternoon Earl Grey or warm chamomile blossom tea.',
    origin: 'Provence Sugar Atelier',
    rating: 4.8,
    reviewsCount: 89,
    badge: 'Heritage Recipe',
    isPopular: false
  },
  {
    id: 'single-origin-bonbons',
    name: 'Single-Origin Praline Bonbons',
    category: 'chocolates',
    categoryLabel: 'Gourmet Chocolates',
    price: 22.00,
    weight: '12-Piece Casket (150g)',
    shortDesc: '72% Venezuelan dark chocolate shells filled with roasted Piedmont hazelnut praline.',
    fullDesc: 'Thin, snappy shells of single-terroir Venezuelan dark chocolate encasing slow-roasted Italian hazelnuts stone-ground into silk praline with a touch of smoked fleur de sel and dusted with 24k edible gold flakes.',
    image: chocolateBonbonsImg,
    flavorNotes: ['Roasted Piedmont Hazelnut', 'Deep Cocoa 72%', 'Smoked Sea Salt'],
    flavorProfile: {
      sweetness: 2,
      tartness: 1,
      chewiness: 3,
      aroma: 'Rich cocoa roast & toasted nuttiness'
    },
    dietaryTags: ['Gluten-Free', 'Organic'],
    ingredients: ['72% Venezuelan Cocoa Mass', 'Organic Cocoa Butter', 'Piedmont Hazelnuts IGP', 'Whole Cane Sugar', 'Smoked Sea Salt', 'Edible Gold Leaf'],
    pairings: 'Espresso Romano, Port wine, or deep Cabernet Sauvignon.',
    origin: 'Lyons Master Chocolatier',
    rating: 4.95,
    reviewsCount: 167,
    badge: 'Limited Harvest',
    isPopular: true
  },
  {
    id: 'blood-orange-thyme-drops',
    name: 'Blood Orange & Mountain Thyme Drops',
    category: 'hard-candies',
    categoryLabel: 'Heirloom Hard Candies',
    price: 11.00,
    weight: '140g Pocket Tin',
    shortDesc: 'Slow-simmered crystal hard drops infused with Sicilian blood orange and fresh thyme.',
    fullDesc: 'Poured into antique brass candy rollers. The bittersweet zest of sun-drenched Sicilian Moro blood oranges harmonizes gracefully with wild mountain thyme herb oil.',
    image: swirlLollipopsImg,
    flavorNotes: ['Sicilian Blood Orange', 'Herbal Thyme', 'Crystalline Sweetness'],
    flavorProfile: {
      sweetness: 3,
      tartness: 4,
      chewiness: 1,
      aroma: 'Citrus grove & wild mountain herbs'
    },
    dietaryTags: ['Vegan', 'Gluten-Free', 'Nut-Free'],
    ingredients: ['Organic Sugar', 'Tapioca Syrup', 'Cold-Pressed Blood Orange Oil', 'Mountain Thyme Infusion', 'Citric Acid', 'Carrot Root Extract'],
    pairings: 'Sparkling mineral water with mint or hot herbal tisanes.',
    origin: 'Sicily & Alps Confectioners',
    rating: 4.7,
    reviewsCount: 74,
    badge: 'Seasonal Batch',
    isPopular: false
  },
  {
    id: 'yuzu-passion-pate-de-fruit',
    name: 'Yuzu & Passionfruit Pâte de Fruits',
    category: 'gummies',
    categoryLabel: 'Artisan Gummies',
    price: 15.50,
    weight: '150g Box',
    shortDesc: 'Traditional French fruit pastes made with 80% whole fruit purée and pectin.',
    fullDesc: 'Tender squares cooked to precisely 107°C with pure Japanese yuzu citrus and Ecuadorian passionfruit. Delicate melt-in-the-mouth texture with clean bright acidity.',
    image: sourGemsImg,
    flavorNotes: ['Aromatic Japanese Yuzu', 'Tangy Passionfruit', 'Granulated Cane Crust'],
    flavorProfile: {
      sweetness: 3,
      tartness: 5,
      chewiness: 3,
      aroma: 'Pungent yuzu blossom & tropical fruit'
    },
    dietaryTags: ['Vegan', 'Gluten-Free', 'Gelatin-Free', 'Organic'],
    ingredients: ['Passionfruit Purée (50%)', 'Yuzu Juice (30%)', 'Apple Pectin', 'Organic Cane Sugar', 'Tartaric Acid'],
    pairings: 'Green Sencha tea or prosecco.',
    origin: 'Bordeaux Confectionery Studio',
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Bestseller',
    isPopular: true
  },
  {
    id: 'smoked-espresso-toffee',
    name: 'Smoked Espresso English Toffee',
    category: 'caramels',
    categoryLabel: 'Artisan Caramels',
    price: 15.00,
    weight: '170g Bag',
    shortDesc: 'Crisp butter toffee laced with Ethiopian dark roast coffee and toasted almond slivers.',
    fullDesc: 'Buttery, snap-crisp English toffee smothered in 64% dark chocolate and rolled in toasted roasted almond brittle. Cooked until deeply caramelized with a subtle woodsmoke aroma.',
    image: saltedCaramelsImg,
    flavorNotes: ['Dark Roast Espresso', 'Snap Butter Caramel', 'Toasted Almond Brittle'],
    flavorProfile: {
      sweetness: 3,
      tartness: 1,
      chewiness: 2,
      aroma: 'Freshly pulled espresso & browned butter'
    },
    dietaryTags: ['Gluten-Free'],
    ingredients: ['Grass-fed Butter', 'Brown Sugar', 'Dark Chocolate (64%)', 'Toasted Almonds', 'Ethiopian Yirgacheffe Coffee Extract', 'Sea Salt'],
    pairings: 'Cappuccino, Stout beer, or vanilla gelato.',
    origin: 'Yorkshire Heritage Recipe',
    rating: 4.85,
    reviewsCount: 96,
    badge: 'Crisp & Rich',
    isPopular: false
  },
  {
    id: 'rosewater-pistachio-rahat',
    name: 'Rosewater & Wild Pistachio Lokum',
    category: 'gummies',
    categoryLabel: 'Artisan Gummies',
    price: 17.00,
    weight: '200g Keepsake Box',
    shortDesc: 'Silken Turkish delight scented with Damask rosewater and studded with Antep pistachios.',
    fullDesc: 'Slow-simmered for two full hours in copper basins for an exceptionally silky, pillowy chew. Generously filled with whole roasted green emerald pistachios and powdered with sugar starch.',
    image: chocolateBonbonsImg,
    flavorNotes: ['Damask Rose Petals', 'Crunchy Green Pistachio', 'Delicate Powdered Cane'],
    flavorProfile: {
      sweetness: 4,
      tartness: 1,
      chewiness: 4,
      aroma: 'Fragrant Damask rose gardens'
    },
    dietaryTags: ['Vegan', 'Gluten-Free', 'Gelatin-Free'],
    ingredients: ['Cane Sugar', 'Corn Starch', 'Antep Pistachios (28%)', 'Natural Damask Rosewater', 'Lemon Juice', 'Hibiscus Extract'],
    pairings: 'Cardamom Turkish coffee or fresh mint tea.',
    origin: 'Historic Levant Recipe',
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Artisanal Gem',
    isPopular: false
  }
];

export const RIBBON_OPTIONS = [
  { id: 'burgundy', name: 'Velvet Burgundy', hex: '#631D24' },
  { id: 'honeycomb', name: 'Golden Honeycomb', hex: '#C9933B' },
  { id: 'sage', name: 'Alpine Sage', hex: '#4B6B56' },
  { id: 'rose', name: 'Dusky Rose', hex: '#C2737C' },
  { id: 'ebony', name: 'Midnight Silk', hex: '#1C1917' }
];

export const TASTING_NOTES_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Geneviève Laurent',
    role: 'Pastry Chef & Food Writer',
    location: 'Paris, France',
    rating: 5,
    date: 'February 2026',
    comment: 'The Fleur de Sel caramels have that elusive velvet chew without sticking to your palate. The Guérande salt is sharp and mineral, cutting straight through the deep Normandy butter richness.',
    productName: 'Fleur de Sel Butter Caramels'
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Sommelier',
    location: 'Edinburgh, UK',
    rating: 5,
    date: 'March 2026',
    comment: 'The Sour Botanical Gems are a masterclass in fruit acidity. Not the synthetic neon sour of commercial candy, but real, electric fruit pectin notes that evolve on your tongue.',
    productName: 'Sour Botanical Crystal Gems'
  },
  {
    id: 'rev-3',
    author: 'Clara Moreau',
    role: 'Verified Collector',
    location: 'New York, USA',
    rating: 5,
    date: 'January 2026',
    comment: 'I ordered the 12-piece Bespoke Sweet Box for our salon gathering. The wax-sealed packaging, custom velvet ribbon, and hand-written gift card made it the most admired centerpiece.',
    productName: 'Custom Sweet Box'
  }
];
