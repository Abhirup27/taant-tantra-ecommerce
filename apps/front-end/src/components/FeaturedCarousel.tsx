import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const carouselItems = [
  {
    id: 1,
    title: "Premium Silk Collection",
    description: "Luxurious silk sarees crafted with precision",
    image: "https://images.unsplash.com/photo-1742287721821-ddf522b3f37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHNpbGt8ZW58MXx8fHwxNzYzMzU3MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bgColor: "from-[#FFB217]/20 to-[#EB881E]/20"
  },
  {
    id: 2,
    title: "Wedding Specials",
    description: "Stunning designs for your special day",
    image: "https://images.unsplash.com/photo-1762708593304-9dd2974e1f4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHNhcmVlJTIwd2VkZGluZ3xlbnwxfHx8fDE3NjMzNjAxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bgColor: "from-[#EB881E]/20 to-[#D66813]/20"
  },
  {
    id: 3,
    title: "Banarasi Heritage",
    description: "Timeless tradition meets modern elegance",
    image: "https://images.unsplash.com/photo-1729838569152-f2cc1626fbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hcmFzaSUyMHNhcmVlJTIwZmFicmljfGVufDF8fHx8MTc2MzM2MDE3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    bgColor: "from-[#F5D018]/20 to-[#FFBE45]/20"
  },
  {
    id: 4,
    title: "Vibrant Hues",
    description: "Explore our colorful collection",
    image: "https://images.unsplash.com/photo-1580250569064-b2ac463aa820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNhcmVlJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NjMzNjAxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bgColor: "from-[#FFBE45]/20 to-[#FFB217]/20"
  },
  {
    id: 5,
    title: "Designer Exclusive",
    description: "Limited edition designer sarees",
    image: "https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNhcmVlJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjMzNTcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bgColor: "from-[#D66813]/20 to-[#EB881E]/20"
  }
];

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  return (
    <div className="relative w-full bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          {/* Carousel Container */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="min-w-full relative h-64 md:h-80 lg:h-96"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.bgColor}`}></div>
                
                {/* Mobile background image with blend */}
                <div 
                  className="absolute inset-0 md:hidden bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${item.image})`,
                    opacity: 0.3
                  }}
                ></div>
                
                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="w-full grid md:grid-cols-2 gap-8 px-6 md:px-12">
                    {/* Text Content */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl text-muted-foreground mb-6">
                        {item.description}
                      </p>
                      <div>
                        <Button 
                          className="bg-primary hover:bg-[#fd905b] transition-all duration-300"
                        >
                          Shop Now
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="hidden md:flex items-center justify-center">
                      <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-xl">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls - Bottom */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 hover:bg-background backdrop-blur-sm rounded-full"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 hover:bg-background backdrop-blur-sm rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
