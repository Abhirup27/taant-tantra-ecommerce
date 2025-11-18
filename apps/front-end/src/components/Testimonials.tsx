import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { Card } from "./ui/card";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Kanjivaram silk saree I purchased is absolutely stunning! The quality is exceptional and the colors are even more vibrant in person.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Taant Tantra has the best collection of Banarasi sarees. The craftsmanship is incredible and customer service is top-notch!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Meera Iyer",
    location: "Chennai",
    rating: 5,
    text: "I wore their designer saree to my sister's wedding and received so many compliments. Worth every penny!",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop"
  },
  {
    id: 4,
    name: "Kavita Patel",
    location: "Ahmedabad",
    rating: 4,
    text: "Beautiful collection and fast delivery. The cotton sarees are perfect for daily wear and so comfortable!",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&h=100&fit=crop"
  },
  {
    id: 5,
    name: "Deepa Nair",
    location: "Bangalore",
    rating: 5,
    text: "The traditional prints are gorgeous and the fabric quality is amazing. Highly recommend Taant Tantra!",
    image: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=100&h=100&fit=crop"
  },
  {
    id: 6,
    name: "Radhika Joshi",
    location: "Pune",
    rating: 5,
    text: "Excellent collection! The silk sarees are of premium quality and the prices are very reasonable.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop"
  }
];

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const animate = () => {
      setOffset((prev) => {
        const newOffset = prev + scrollSpeed;
        // Reset when we've scrolled past the first set
        if (scrollRef.current) {
          const scrollWidth = scrollRef.current.scrollWidth / 2;
          if (newOffset >= scrollWidth) {
            return 0;
          }
        }
        return newOffset;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="w-full bg-background transition-colors overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h2 className="text-3xl text-foreground text-center">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          Trusted by thousands of saree lovers across India
        </p>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-6"
          style={{
            transform: `translateX(-${offset}px)`,
            width: 'max-content'
          }}
        >
          {/* Duplicate testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card 
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-80 p-6 bg-card border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'fill-[#FFB217] text-[#FFB217]'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
