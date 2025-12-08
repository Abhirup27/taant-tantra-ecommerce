interface TrianglePatternProps {
  className?: string;
  id?: string;
}

export function TrianglePattern({ className = "", id = "trianglePattern" }: TrianglePatternProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="12"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          {/* Flipped triangle pointing downward */}
          <polygon points="0,0 6,12 12,0" className="fill-[#cb4019] dark:fill-[#FFB217]" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  );
}
