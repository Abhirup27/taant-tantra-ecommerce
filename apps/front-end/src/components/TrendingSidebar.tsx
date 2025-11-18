import { useEffect, useState, useRef } from "react";
import { TrendingUp, X } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Product } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TrendingSidebarProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

export function TrendingSidebar({ products, onViewDetails }: TrendingSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [hasLeftSection, setHasLeftSection] = useState(false);
  const [userClosed, setUserClosed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Simple visibility logic: show when products section is in viewport
  useEffect(() => {
    const productsElement = document.getElementById('products-section');
    
    if (!productsElement) {
      console.warn('TrendingSidebar: products-section element not found');
      return;
    }

    // Create intersection observer to watch products section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show sidebar when products section is intersecting with viewport
          const shouldShow = entry.isIntersecting;
          
          setIsVisible(shouldShow);
          
          if (shouldShow) {
            // User is entering the section
            // Only auto-open if they had left the section and didn't manually close it
            if (hasLeftSection && !userClosed) {
              setIsOpen(true);
            }
          } else {
            // User has left the section
            setHasLeftSection(true);
            // Reset the userClosed flag so sidebar can show again on re-entry
            setUserClosed(false);
          }
        });
      },
      {
        // Trigger when at least 20% of products section is visible
        threshold: 0.2,
        // Add some margin to trigger slightly before/after
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Start observing the products section
    observer.observe(productsElement);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [hasLeftSection, userClosed]);

  // Get top 4 trending products (highest rated), then duplicate for infinite scroll
  const trendingProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  
  // Duplicate the products for seamless infinite scrolling
  const duplicatedProducts = [...trendingProducts, ...trendingProducts];

  // Auto-scroll effect
  useEffect(() => {
    if (!isVisible || !isOpen || isAutoScrollPaused || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!scrollContainer) return;

        // Scroll down by 1 pixel
        scrollContainer.scrollTop += 1;

        // If we've scrolled past the first set of items, reset to the top
        const maxScroll = scrollContainer.scrollHeight / 2;
        if (scrollContainer.scrollTop >= maxScroll) {
          scrollContainer.scrollTop = 0;
        }
      }, 50); // Adjust speed by changing this interval
    };

    startScrolling();

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isVisible, isOpen, isAutoScrollPaused]);

  // Handle user interaction to pause auto-scroll
  const handleUserInteraction = () => {
    setIsAutoScrollPaused(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Resume auto-scroll after 3 seconds of no interaction
    scrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, 3000);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-500
        bottom-4 left-4 lg:left-6 w-56 lg:w-64
        ${isVisible && isOpen ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}
    >
      <Card className="p-3 bg-card border-border shadow-lg overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-primary" />
            <h3 className="text-xs lg:text-sm text-foreground">Trending</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 lg:h-6 lg:w-6 hover:bg-muted"
            onClick={() => {
              setIsOpen(false);
              setUserClosed(true);
            }}
            aria-label="Close trending sidebar"
          >
            <X className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
          </Button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="overflow-hidden h-48 lg:h-56"
          onMouseEnter={handleUserInteraction}
          onTouchStart={handleUserInteraction}
          onWheel={handleUserInteraction}
        >
          <div className="space-y-2">
            {duplicatedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="group cursor-pointer"
                onClick={() => onViewDetails(product)}
              >
                <div className="flex gap-2 hover:bg-muted/50 p-1.5 rounded-lg transition-colors">
                  <div className="relative w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0 rounded overflow-hidden">
                    <ImageWithFallback
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-0.5 left-0.5 text-[9px] lg:text-[10px] px-1 py-0 h-3.5 lg:h-4 bg-primary">
                      #{(index % trendingProducts.length) + 1}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] lg:text-xs text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-[10px] lg:text-xs text-primary mt-0.5">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
