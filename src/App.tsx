import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types/candy';
import { CANDY_PRODUCTS } from './data/candies';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ProductModal } from './components/ProductModal';
import { BoxBuilderModal } from './components/BoxBuilderModal';
import { TasteQuizModal } from './components/TasteQuizModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // Cart state with initial sample or empty
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bonbonniere_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default initial cart item to welcome user
    return [
      {
        id: 'sour-botanical-gems',
        name: 'Sour Botanical Crystal Gems',
        price: 14.50,
        quantity: 1,
        image: CANDY_PRODUCTS[0].image,
        weightOrSize: '160g Tin',
      },
    ];
  });

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [isTasteQuizOpen, setIsTasteQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Discount and promo state
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bonbonniere_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          weightOrSize: product.weight,
        },
      ];
    });

    showToast(`Added ${quantity}x ${product.name} to sweet bag`);
  };

  const handleAddBoxToCart = (boxItem: CartItem) => {
    setCartItems((prev) => [boxItem, ...prev]);
    showToast(`Added Bespoke Sweet Box to your sweet bag`);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = (discountPercent: number, promoCode: string) => {
    setCheckoutDiscount(discountPercent);
    setCheckoutPromoCode(promoCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('confections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241F1C]">
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-label="Sweet bag notification"
          className="fixed bottom-6 right-6 z-50 bg-[#241F1C] text-white px-4 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-in slide-in-from-bottom duration-200"
        >
          <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium text-stone-200">{toastMessage}</span>
          <button
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-xs font-bold text-[#E8C5A8] hover:text-white underline underline-offset-2 ml-1"
          >
            View Bag
          </button>
        </aside>
      )}

      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        onOpenTasteQuiz={() => setIsTasteQuizOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToCatalog}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
          onOpenTasteQuiz={() => setIsTasteQuizOpen(true)}
        />

        {/* Catalog Section */}
        <CatalogSection
          products={CANDY_PRODUCTS}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onQuickView={(product) => setSelectedProduct(product)}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        />

        {/* Craftsmanship & Story Section */}
        <CraftsmanshipSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail / Tasting Notes Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Custom Pick & Mix Box Builder Modal */}
      <BoxBuilderModal
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        products={CANDY_PRODUCTS}
        onAddBoxToCart={handleAddBoxToCart}
      />

      {/* Flavor & Taste Finder Quiz Modal */}
      <TasteQuizModal
        isOpen={isTasteQuizOpen}
        onClose={() => setIsTasteQuizOpen(false)}
        products={CANDY_PRODUCTS}
        onAddToCart={(prod) => handleAddToCart(prod, 1)}
        onViewProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout & Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountPercent={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderCompleted={handleOrderCompleted}
      />
    </div>
  );
}
