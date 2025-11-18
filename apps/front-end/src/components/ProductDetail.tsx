import { useState, useEffect, useRef } from "react";
import { Heart, ShoppingCart, Truck, RefreshCw, Shield, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type Product } from "./ProductCard";
import { DecorativeBorder } from "./DecorativeBorder";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, isOpen, onClose, onAddToCart }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset image index when dialog opens or product changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setScrollProgress(0);
    setScrollPercentage(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [isOpen, product?.id]);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Use multiple images if available, otherwise use the main imageUrl
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.imageUrl];

  // Handle scroll for mobile sticky header effect
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const maxScroll = 300; // Distance to scroll before reaching minimum height

    // Calculate progress (0 to 1) for image shrinking
    const progress = Math.min(scrollTop / maxScroll, 1);
    setScrollProgress(progress);

    // Calculate scroll percentage for down arrow fade
    const scrollableHeight = scrollHeight - clientHeight;
    const percentage = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
    setScrollPercentage(percentage);
  };

  // Handle image navigation
  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  // Handle scroll down button click
  const handleScrollDown = () => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight;
      const clientHeight = containerRef.current.clientHeight;
      const scrollableHeight = scrollHeight - clientHeight;
      const scrollAmount = scrollableHeight * 0.15; // 15% of scrollable height

      containerRef.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Calculate dynamic styles based on scroll progress
  const minImageHeight = 80; // Minimum height in pixels (just above close button)
  const maxImageHeight = 75; // Maximum height in vh units
  const minImageHeightVh = typeof window !== 'undefined' ? (minImageHeight / window.innerHeight * 100) : 10;
  const currentImageHeight = isMobile ? maxImageHeight - (scrollProgress * (maxImageHeight - minImageHeightVh)) : maxImageHeight;
  const heartOpacity = 1 - scrollProgress;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] md:w-full md:max-w-6xl max-h-[90vh] overflow-visible p-0 [&>button]:hidden bg-transparent border-0">
        <DecorativeBorder>
          <div
            ref={containerRef}
            className="relative md:grid md:grid-cols-2 gap-0 max-h-[90vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden scroll-smooth"
            onScroll={handleScroll}
          >
            {/* Image Section - Sticky on mobile */}
            <div
              className="sticky top-0 z-10 md:relative bg-muted md:aspect-[3/4] md:max-h-[85vh] md:overflow-hidden transition-all duration-200"
              style={{
                height: isMobile ? `${currentImageHeight}vh` : 'auto',
              }}
            >
              <ImageWithFallback
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-destructive">
                  {discount}% OFF
                </Badge>
              )}

              {/* Close button - mobile only with primary color background */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 bg-primary hover:bg-primary/90 shadow-md"
              >
                <X className="h-5 w-5 text-white" />
              </Button>

              {/* Arrow Navigation Buttons */}
              {productImages.length > 1 && (
                <>
                  {/* Previous Image Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  {/* Next Image Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image controls container - bottom of image */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-200"
                style={{
                  opacity: isMobile ? Math.max(1 - scrollProgress * 1.5, 0) : 1,
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Image navigation dots */}
                  {productImages.length > 1 && (
                    <div className="flex gap-1.5">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${index === currentImageIndex
                              ? 'w-6 bg-primary'
                              : 'w-2 bg-white/50 hover:bg-white/75'
                            }`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Heart icon - mobile only - fades out on scroll */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden bg-primary hover:bg-primary/90 ml-auto transition-opacity duration-200"
                    style={{
                      opacity: isMobile ? heartOpacity : 1,
                      pointerEvents: heartOpacity < 0.1 ? 'none' : 'auto',
                    }}
                  >
                    <Heart className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 md:p-8 pt-8 md:pt-8 flex flex-col bg-card md:overflow-y-auto md:max-h-[85vh] relative">
              {/* Close button - desktop only */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hidden md:flex absolute top-4 right-4 bg-primary hover:bg-primary/90 shadow-md z-10"
              >
                <X className="h-5 w-5 text-white" />
              </Button>

              <div className="flex-1">
                <Badge variant="outline" className="mb-2">
                  {product.fabric}
                </Badge>
                <h2 className="text-3xl text-card-foreground mb-2">{product.name}</h2>
                <p className="text-muted-foreground mb-4">Category: {product.category}</p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl text-card-foreground">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="text-card-foreground">Description</h3>
                  <p className="text-muted-foreground">
                    Exquisitely crafted {product.fabric.toLowerCase()} saree perfect for special occasions.
                    Features intricate designs and premium quality fabric that drapes beautifully.
                    Comes with an unstitched blouse piece for custom tailoring.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Fabric</p>
                      <p className="text-card-foreground">{product.fabric}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Length</p>
                      <p className="text-card-foreground">6.3 meters</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Care</p>
                      <p className="text-card-foreground">Dry Clean Only</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className={product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on orders above ₹2000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="h-4 w-4" />
                    <span>Easy 7-day returns & exchanges</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>100% authentic products</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-primary hover:opacity-90"
                  size="lg"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                {/* Heart button - only visible on desktop */}
                <Button size="lg" variant="outline" className="hidden md:flex border-primary text-primary">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Scroll Down Indicator - Mobile only */}
            {isMobile && scrollPercentage < 100 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleScrollDown}
                className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 shadow-lg z-20 transition-opacity duration-300 rounded-full"
                style={{
                  opacity: Math.max(0, 1 - (scrollPercentage / 100))
                }}
              >
                <ChevronDown className="h-6 w-6 text-white animate-bounce" />
              </Button>
            )}
          </div>
        </DecorativeBorder>
      </DialogContent>
    </Dialog>
  );
}
