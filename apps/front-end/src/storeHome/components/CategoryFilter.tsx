import { Badge } from "./ui/badge";
import { TrianglePattern } from "./TrianglePattern";
import patternBg from "../../assets/5db937b2a06f33eee00776240e830064a5f6dfa9.jpg";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isSearchActive?: boolean;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange, isSearchActive = false }: CategoryFilterProps) {
  // Adjust top position when search is active (navbar height increases by ~56px when search bar is shown)
  const topPosition = isSearchActive ? "top-[120px]" : "top-[64px]";

  return (
    <div id="category-filter" className={`relative bg-background sticky ${topPosition} z-40 transition-all duration-300 overflow-visible`}>
      {/* Pattern Background */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap mt-1.5">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap ${selectedCategory === category
                  ? "bg-primary hover:opacity-90"
                  : "hover:bg-primary/10"
                  }`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Triangle Pattern Border */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-full">
        <TrianglePattern className="w-full" id="filterPattern" />
      </div>
    </div>
  );
}
