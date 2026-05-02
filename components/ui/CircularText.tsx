"use client";

import { useEffect, useRef, useState } from "react";

interface CircularTextProps {
  text: string;
  size?: number;
  className?: string;
}

export function CircularText({ text, size = 120, className = "" }: CircularTextProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const chars = text.split("");
  const radius = size / 2 - 14;

  useEffect(() => {
    if (!svgRef.current) return;
    let angle = 0;
    let speed = 0.3;
    const targetSpeed = () => (hovered ? 1.8 : 0.3);
    const animate = () => {
      speed += (targetSpeed() - speed) * 0.06;
      angle += speed;
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${angle}deg)`;
      }
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="transition-transform duration-500 ease-out cursor-pointer"
      style={{ transform: hovered ? "scale(1.25)" : "scale(1)" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className={className}
      >
        <defs>
          <path
            id="circlePath"
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text>
          <textPath
            href="#circlePath"
            className="fill-current"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
