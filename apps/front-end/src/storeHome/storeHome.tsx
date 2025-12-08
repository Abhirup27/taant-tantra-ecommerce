import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedCarousel } from "./components/FeaturedCarousel";
import { Testimonials } from "./components/Testimonials";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductCard, type Product } from "./components/ProductCard";
import { ProductDetail } from "./components/ProductDetail";
import { Cart, type CartItem } from "./components/Cart";
import { LoginModal } from "./components/LoginModal";
import { TrendingSidebar } from "./components/TrendingSidebar";
import { MobileSidebar } from "./components/MobileSidebar";
import patternBg from "../assets/5db937b2a06f33eee00776240e830064a5f6dfa9.jpg";
import '../index.css'
// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: "Kanjivaram Silk Saree",
    price: 8999,
    originalPrice: 12999,
    category: "Silk",
    fabric: "Pure Silk",
    imageUrl: "https://images.unsplash.com/photo-1742287721821-ddf522b3f37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHNpbGt8ZW58MXx8fHwxNzYzMzU3MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1742287721821-ddf522b3f37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHNpbGt8ZW58MXx8fHwxNzYzMzU3MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1699508059832-3488136a6e84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hcmFzaSUyMHNpbGslMjBzYXJlZSUyMGJyb2NhZGV8ZW58MXx8fHwxNzYzMzczNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNhcmVlJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjMzNTcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    inStock: true,
    rating: 4.75,
  },
  {
    id: 2,
    name: "Banarasi Brocade Saree",
    price: 6499,
    originalPrice: 8999,
    category: "Silk",
    fabric: "Banarasi Silk",
    imageUrl: "https://images.unsplash.com/photo-1699508059832-3488136a6e84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hcmFzaSUyMHNpbGslMjBzYXJlZSUyMGJyb2NhZGV8ZW58MXx8fHwxNzYzMzczNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    images: [
      "https://images.unsplash.com/photo-1699508059832-3488136a6e84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hcmFzaSUyMHNpbGslMjBzYXJlZSUyMGJyb2NhZGV8ZW58MXx8fHwxNzYzMzczNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1756483482418-3f3e4c13f9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2FyZWUlMjBlbWJyb2lkZXJ5fGVufDF8fHx8MTc2MzM1NzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1692107271822-50cc09b2bf73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzYXJlZSUyMGNhc3VhbHxlbnwxfHx8fDE3NjMzMjAzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1594761253360-2a487accc7bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNhcmVlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzYzMzU3MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    inStock: true,
    rating: 4.85,
  },
  {
    id: 3,
    name: "Designer Embroidered Saree",
    price: 11999,
    originalPrice: 15999,
    category: "Designer",
    fabric: "Georgette",
    imageUrl: "https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNhcmVlJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjMzNTcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    rating: 4.65,
  },
  {
    id: 4,
    name: "Wedding Zari Work Saree",
    price: 13499,
    category: "Wedding",
    fabric: "Art Silk",
    imageUrl: "https://images.unsplash.com/photo-1756483482418-3f3e4c13f9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2FyZWUlMjBlbWJyb2lkZXJ5fGVufDF8fHx8MTc2MzM1NzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1756483482418-3f3e4c13f9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2FyZWUlMjBlbWJyb2lkZXJ5fGVufDF8fHx8MTc2MzM1NzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1742287721821-ddf522b3f37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHNpbGt8ZW58MXx8fHwxNzYzMzU3MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    inStock: true,
    rating: 4.92,
  },
  {
    id: 5,
    name: "Cotton Handloom Saree",
    price: 2499,
    originalPrice: 3499,
    category: "Cotton",
    fabric: "Pure Cotton",
    imageUrl: "https://images.unsplash.com/photo-1692107271822-50cc09b2bf73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzYXJlZSUyMGNhc3VhbHxlbnwxfHx8fDE3NjMzMjAzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    rating: 4.28,
  },
  {
    id: 6,
    name: "Traditional Printed Saree",
    price: 1999,
    category: "Casual",
    fabric: "Chiffon",
    imageUrl: "https://images.unsplash.com/photo-1594761253360-2a487accc7bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNhcmVlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzYzMzU3MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: false,
    rating: 4.15,
  },
  {
    id: 7,
    name: "Mysore Silk Saree",
    price: 7499,
    category: "Silk",
    fabric: "Mysore Silk",
    imageUrl: "https://images.unsplash.com/photo-1742287721821-ddf522b3f37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHNpbGt8ZW58MXx8fHwxNzYzMzU3MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    rating: 4.58,
  },
  {
    id: 8,
    name: "Party Wear Sequin Saree",
    price: 5999,
    originalPrice: 7999,
    category: "Party Wear",
    fabric: "Net",
    imageUrl: "https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNhcmVlJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjMzNTcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    rating: 4.42,
  },
];

const categories = ["All", "Silk", "Cotton", "Designer", "Wedding", "Party Wear", "Casual"];

export function Store() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="tailwind css-myl2ny css-exq74d">


      <div className="min-h-screen bg-background transition-colors">
        <Navbar
          cartCount={totalCartItems}
          onCartClick={() => setIsCartOpen(true)}
          onLoginClick={() => setIsLoginOpen(true)}
          onSearchActiveChange={setIsSearchActive}
          onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <Hero />
        <FeaturedCarousel />
        <Testimonials />

        {/* Trending Sidebar */}
        <TrendingSidebar
          products={products}
          onViewDetails={handleViewDetails}
        />

        {/* Wrapper for CategoryFilter and Products - constrains sticky behavior */}
        <div className="relative">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isSearchActive={isSearchActive}
          />

          {/* Products Grid */}
          <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pl-64 py-12 pb-24 lg:pb-12">
            <div className="mb-8">
              <h3 className="text-2xl text-foreground">
                {selectedCategory === "All" ? "All Sarees" : selectedCategory}
              </h3>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} products available
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative bg-[#1a1a1a] dark:bg-black text-white mt-20 transition-colors overflow-hidden">
          {/* Pattern Background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url(${patternBg})`,
              backgroundSize: 'auto 150px',
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-right md:text-left">
                <h4 className="text-xl mb-4">
                  <span style={{ color: '#EB881E' }}>Taant</span>
                  <span style={{ color: '#FFB217' }}>Tantra</span>
                </h4>
                <p className="text-gray-400">
                  Bringing you the finest collection of handcrafted Taant sarees from West Bengal.
                </p>
              </div>
              <div className="text-right md:text-left">
                <h5 className="mb-4">Shop</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Taant Sarees</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Designer Sarees</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Sale</a></li>
                </ul>
              </div>
              <div className="text-right md:text-left">
                <h5 className="mb-4">Help</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                </ul>
              </div>
              <div className="text-right md:text-left">
                <h5 className="mb-4">About</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Artisans</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Taant Tantra. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Cart Sheet */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />

        {/* Product Detail Dialog */}
        <ProductDetail
          product={selectedProduct}
          isOpen={isProductDetailOpen}
          onClose={() => setIsProductDetailOpen(false)}
          onAddToCart={handleAddToCart}
        />

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onLoginClick={() => setIsLoginOpen(true)}
        />
      </div>
    </div>

  );
}
