"use client"

export function MandalaLoader() {
  return (
    <div className="relative w-24 h-24 animate-mandala">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="1"
          className="text-terracotta-400"
          opacity="0.3"
        />

        {/* Middle circle */}
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ochre-500"
          opacity="0.5"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="25"
          stroke="currentColor"
          strokeWidth="2"
          className="text-forest-600"
          opacity="0.7"
        />

        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            <ellipse cx="50" cy="15" rx="8" ry="15" fill="currentColor" className="text-terracotta-500" opacity="0.6" />
          </g>
        ))}

        {/* Center dot */}
        <circle cx="50" cy="50" r="8" fill="currentColor" className="text-ochre-600" />
      </svg>
    </div>
  )
}
