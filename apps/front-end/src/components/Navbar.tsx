import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Search, Heart, Menu, LogIn, Languages, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { TrianglePattern } from "./TrianglePattern";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  onSearchActiveChange?: (isActive: boolean) => void;
  onMobileMenuClick?: () => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'bh', name: 'Bhojpuri', nativeName: 'भोजपुरी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

export function Navbar({ cartCount, onCartClick, onLoginClick, onSearchActiveChange, onMobileMenuClick }: NavbarProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Notify parent when search state changes
  useEffect(() => {
    onSearchActiveChange?.(showSearch);
  }, [showSearch, onSearchActiveChange]);

  // Click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setSearchQuery("");
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showSearch]);

  return (
    <nav className="sticky top-0 z-50 bg-background transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl" style={{ color: '#EB881E' }}>
              Taant<span style={{ color: '#FFB217' }}>Tantra</span>
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden min-[810px]:flex space-x-6">
              <a href="#" className="text-foreground hover:text-[#ff8c52] transition-colors duration-300">
                New Arrivals
              </a>
              <a href="#" className="text-foreground hover:text-[#ff8c52] transition-colors duration-300">
                Collections
              </a>
              <a href="#" className="text-foreground hover:text-[#ff8c52] transition-colors duration-300">
                Occasions
              </a>
              <a href="#" className="text-foreground hover:text-[#ff8c52] transition-colors duration-300">
                Browse Shop
              </a>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Mobile: Search - First on mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile: Login Icon - Hidden below 390px */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden min-[390px]:flex hidden"
              onClick={onLoginClick}
            >
              <LogIn className="h-5 w-5" />
            </Button>

            {/* Desktop: Search */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Desktop: Heart */}
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Language Selector - hidden below 390px, shown at 390px and above */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden min-[390px]:flex">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-0.5">
                        <span>{language.name}</span>
                        <span className="text-xs text-muted-foreground">{language.nativeName}</span>
                      </div>
                      {selectedLanguage.code === language.code && (
                        <Check className="h-4 w-4 text-primary ml-2" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Desktop: Login Button - Last on desktop */}
            <Button 
              variant="outline" 
              className="hidden min-[810px]:flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
              onClick={onLoginClick}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="min-[810px]:hidden"
              onClick={onMobileMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div 
            ref={searchRef}
            className="pb-4 pt-2 px-4 animate-in slide-in-from-top-2 duration-300 bg-background"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for sarees, collections, occasions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Triangle Pattern Border */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-full">
        <TrianglePattern className="w-full" id="navbarPattern" />
      </div>
    </nav>
  );
}
