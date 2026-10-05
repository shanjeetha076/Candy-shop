export type CandyCategory = 
  | 'all'
  | 'gummies'
  | 'caramels'
  | 'hard-candies'
  | 'chocolates'
  | 'sour-crystals';

export type DietaryTag = 'Vegan' | 'Gluten-Free' | 'Gelatin-Free' | 'Nut-Free' | 'Organic';

export interface FlavorProfile {
  sweetness: number; // 1-5
  tartness: number;  // 1-5
  chewiness: number; // 1-5
  aroma: string;     // e.g. "Wild Bergamot & Citrus"
}

export interface Product {
  id: string;
  name: string;
  category: CandyCategory;
  categoryLabel: string;
  price: number;
  weight: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  flavorNotes: string[];
  flavorProfile: FlavorProfile;
  dietaryTags: DietaryTag[];
  ingredients: string[];
  pairings: string;
  origin: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  isPopular?: boolean;
}

export interface CartItem {
  id: string; // product id or box id
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weightOrSize: string;
  isCustomBox?: boolean;
  boxItems?: { name: string; quantity: number }[];
  ribbonColor?: string;
  giftNote?: string;
}

export interface CustomBoxItem {
  candies: { [candyId: string]: number };
  maxItems: 6 | 12;
  ribbonColor: string;
  giftRecipient: string;
  giftMessage: string;
}
