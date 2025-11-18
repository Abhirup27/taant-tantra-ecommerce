interface DecorativeBorderProps {
  children: React.ReactNode;
}

export function DecorativeBorder({ children }: DecorativeBorderProps) {
  return (
    <div className="relative">
      {/* Main content */}
      <div className="relative z-10 bg-card rounded-lg overflow-hidden">
        {children}
      </div>
      
      {/* Top border pattern */}
      <div className="absolute -top-[6px] left-0 right-0 h-[6px] md:h-[8px] lg:h-[10px] overflow-hidden pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <defs>
            <pattern id="topBorder" x="0" y="0" width="24" height="10" patternUnits="userSpaceOnUse">
              {/* Diamond/rhombus pattern */}
              <path d="M12 0 L18 5 L12 10 L6 5 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M0 0 L6 5 L0 10 L-6 5 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M24 0 L30 5 L24 10 L18 5 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topBorder)" />
        </svg>
      </div>
      
      {/* Bottom border pattern */}
      <div className="absolute -bottom-[6px] left-0 right-0 h-[6px] md:h-[8px] lg:h-[10px] overflow-hidden pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block rotate-180"
        >
          <defs>
            <pattern id="bottomBorder" x="0" y="0" width="24" height="10" patternUnits="userSpaceOnUse">
              {/* Diamond/rhombus pattern - rotated */}
              <path d="M12 0 L18 5 L12 10 L6 5 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M0 0 L6 5 L0 10 L-6 5 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M24 0 L30 5 L24 10 L18 5 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bottomBorder)" />
        </svg>
      </div>
      
      {/* Left border pattern */}
      <div className="absolute top-0 -left-[6px] bottom-0 w-[6px] md:w-[8px] lg:w-[10px] overflow-hidden pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <defs>
            <pattern id="leftBorder" x="0" y="0" width="10" height="24" patternUnits="userSpaceOnUse">
              {/* Vertical diamond/rhombus pattern */}
              <path d="M0 12 L5 18 L10 12 L5 6 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M0 0 L5 6 L10 0 L5 -6 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M0 24 L5 30 L10 24 L5 18 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leftBorder)" />
        </svg>
      </div>
      
      {/* Right border pattern */}
      <div className="absolute top-0 -right-[6px] bottom-0 w-[6px] md:w-[8px] lg:w-[10px] overflow-hidden pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block rotate-180"
        >
          <defs>
            <pattern id="rightBorder" x="0" y="0" width="10" height="24" patternUnits="userSpaceOnUse">
              {/* Vertical diamond/rhombus pattern - rotated */}
              <path d="M0 12 L5 18 L10 12 L5 6 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M0 0 L5 6 L10 0 L5 -6 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
              <path d="M0 24 L5 30 L10 24 L5 18 Z" className="fill-[#cb4019] dark:fill-[#FFB217]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rightBorder)" />
        </svg>
      </div>
      
      {/* Corner decorations - optional ornamental elements */}
      <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] pointer-events-none z-20">
        <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" className="fill-[#cb4019] dark:fill-[#FFB217]" />
          <circle cx="10" cy="10" r="4" className="fill-card" />
        </svg>
      </div>
      
      <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] pointer-events-none z-20">
        <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" className="fill-[#cb4019] dark:fill-[#FFB217]" />
          <circle cx="10" cy="10" r="4" className="fill-card" />
        </svg>
      </div>
      
      <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] pointer-events-none z-20">
        <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" className="fill-[#cb4019] dark:fill-[#FFB217]" />
          <circle cx="10" cy="10" r="4" className="fill-card" />
        </svg>
      </div>
      
      <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] pointer-events-none z-20">
        <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" className="fill-[#cb4019] dark:fill-[#FFB217]" />
          <circle cx="10" cy="10" r="4" className="fill-card" />
        </svg>
      </div>
    </div>
  );
}
