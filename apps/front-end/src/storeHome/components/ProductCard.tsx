import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  fabric: string;
  imageUrl: string;
  images?: string[]; // Multiple images for product detail view
  inStock: boolean;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => onViewDetails(product)}
        />

        {discount > 0 && (
          <Badge className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-destructive text-[9px] sm:text-xs px-1 sm:px-2 h-4 sm:h-5">
            {discount}% OFF
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-background/80 hover:bg-background h-6 w-6 sm:h-9 sm:w-9"
        >
          <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-[10px] sm:text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3 lg:p-4 bg-card">
        <Badge variant="outline" className="mb-1 sm:mb-2 text-[9px] sm:text-xs px-1 sm:px-2 h-4 sm:h-5">
          {product.fabric}
        </Badge>
        <h3
          className="text-card-foreground mb-1 sm:mb-2 cursor-pointer hover:text-primary transition-colors text-xs sm:text-sm lg:text-base line-clamp-2"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 ${i < Math.floor(product.rating)
                    ? 'fill-[#FFB217] text-[#FFB217]'
                    : product.rating > i && product.rating < i + 1
                      ? 'fill-[#FFB217] text-[#FFB217]'
                      : 'fill-muted text-muted'
                  }`}
                style={
                  product.rating > i && product.rating < i + 1
                    ? {
                      clipPath: `inset(0 ${100 - (product.rating - i) * 100}% 0 0)`
                    }
                    : undefined
                }
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-xs text-muted-foreground">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
            <span className="text-card-foreground text-xs sm:text-sm lg:text-base">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="bg-primary hover:opacity-90 h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
