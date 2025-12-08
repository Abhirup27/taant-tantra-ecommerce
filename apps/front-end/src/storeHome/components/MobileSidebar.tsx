import { Sparkles, Package, Calendar, Store, MapPin, LogIn, Languages, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
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

export function MobileSidebar({ isOpen, onClose, onLoginClick }: MobileSidebarProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  
  const menuItems = [
    { label: "New Arrivals", icon: Sparkles, href: "#" },
    { label: "Collections", icon: Package, href: "#" },
    { label: "Occasions", icon: Calendar, href: "#" },
    { label: "Browse Shop", icon: Store, href: "#" },
    { label: "Track Order", icon: MapPin, href: "#" },
  ];

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-background overflow-y-auto">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-left">
            <span style={{ color: '#EB881E' }}>Taant</span>
            <span style={{ color: '#FFB217' }}>Tantra</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-6">
          {/* Navigation Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors duration-300"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            );
          })}

          <div className="border-t border-border my-4"></div>

          {/* Language Selector - only shown on screens below 390px */}
          <div className="max-[389px]:block hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 px-4 py-3 hover:bg-muted hover:text-primary"
                >
                  <Languages className="h-5 w-5" />
                  <span>{selectedLanguage.name}</span>
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
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-foreground">Theme</span>
            <ThemeToggle />
          </div>

          <div className="border-t border-border my-4"></div>

          {/* Login Button */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 px-4 py-6 border-primary text-primary hover:bg-primary/10"
            onClick={handleLoginClick}
          >
            <LogIn className="h-5 w-5" />
            Login
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
