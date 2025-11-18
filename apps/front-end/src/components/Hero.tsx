import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import patternBg from "../assets/5db937b2a06f33eee00776240e830064a5f6dfa9.jpg";
import heroImageDark from "../assets/hero-dark-theme.png";
import heroImageLight from "../assets/hero-light-theme.png";

export function Hero() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const heroImage = theme === "light" ? heroImageLight : heroImageDark;

  return (
    <div className="relative bg-gradient-to-br from-[#FFF8E7] via-[#FFF4D6] to-[#FFEED9] dark:from-[#1a1410] dark:via-[#1f1814] dark:to-[#241c18] overflow-hidden transition-colors">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: 'auto 120px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-0 items-stretch md:min-h-[600px]">
          {/* Left side - Text content */}
          <div className="text-center md:text-left order-1 flex flex-col justify-center py-16 md:py-20 relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 relative">
              Timeless Elegance
              {/* Decorative blur around "Timeless" heading */}
              <div className="absolute -left-8 -top-8 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(235, 136, 30, 0.2)' }}></div>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              Discover exquisite handcrafted sarees from across the country. Traditional weaves meet contemporary designs. Delievered straight to your door anywhere in India.
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap [@media(max-width:387px)]:flex-col">
              <Button size="lg" className="bg-primary hover:opacity-90">
                Shop New Arrivals
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-[#fd905b] hover:text-white hover:border-[#fd905b] transition-all duration-300"
              >
                Explore Collections
              </Button>
            </div>
          </div>

          {/* Right side - Woman image */}
          <div className="hidden md:flex order-2 items-stretch">
            <div className="relative w-full flex items-center justify-center md:justify-end">
              <img
                src={heroImage}
                alt="Woman wearing elegant saree"
                className="h-full w-auto object-cover object-center absolute right-0 top-0 bottom-0 max-w-none"
              />
              {/* Decorative blur around image - positioned relative to image container */}
              <div className="absolute top-1/4 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(255, 190, 69, 0.2)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
