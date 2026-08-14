/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/refs */
/* eslint-disable prefer-const */

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

interface AccordionItem {
  image: string;
  label?: string;
  link?: string;
}

interface AccordionGalleryProps {
  items?: AccordionItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: "hover" | "click";
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  height?: number | string;
  gap?: number;
  radius?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const AccordionGallery = ({
  items = [],
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = "hover",
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  grayscale = false,
  showLabels = true,
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  height = 460,
  gap = 10,
  radius = 16,
  orientation = "horizontal",
  className = "",
}: AccordionGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const isHorizontal = orientation === "horizontal";
  const count = items.length;

  const layout = useCallback(
    (active: number, animate = true) => {
      if (!count) return;

      const collapsedRatio = (1 - expandRatio) / Math.max(count - 1, 1);

      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        const isActive = i === active;
        const flex = isActive ? expandRatio : collapsedRatio;
        const scale = isActive ? 1 : 0.92;
        const brightness = isActive ? 1 : 0.55;
        const gray = grayscale && !isActive ? 1 : 0;
        const z = isActive ? 20 : 10 - Math.abs(i - active);

        const rotate =
          isHorizontal
            ? `rotateY(${(i - active) * (tilt / 2)}deg)`
            : `rotateX(${(i - active) * (tilt / 2)}deg)`;

        gsap.to(el, {
          flexGrow: flex,
          flexShrink: 1,
          flexBasis: 0,
          scale,
          filter: `brightness(${brightness}) grayscale(${gray})`,
          zIndex: z,
          duration: animate ? duration : 0,
          ease,
          delay: animate ? Math.abs(i - active) * stagger : 0,
        });

        // Parallax on image
        const img = imageRefs.current[i];
        if (img) {
          const offset = (i - active) * parallax * 30;
          gsap.to(img, {
            x: isHorizontal ? offset : 0,
            y: isHorizontal ? 0 : offset,
            scale: isActive ? 1.08 : 1.15,
            duration: animate ? duration : 0,
            ease,
          });
        }
      });
    },
    [
      count,
      expandRatio,
      duration,
      ease,
      stagger,
      grayscale,
      tilt,
      parallax,
      isHorizontal,
    ]
  );

  // Initial + active change
  useEffect(() => {
    layout(activeIndex, true);
  }, [activeIndex, layout]);

  // Resize handling
  useEffect(() => {
    const handleResize = () => layout(activeIndex, false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, layout]);

  const handleEnter = (index: number) => {
    if (trigger === "hover") setActiveIndex(index);
  };

  const handleClick = (index: number) => {
    if (trigger === "click") setActiveIndex(index);
  };

  if (!count) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        gap: `${gap}px`,
      }}
    >
      {items.map((item, i) => {
        const isActive = i === activeIndex;

        return (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative overflow-hidden cursor-pointer select-none will-change-transform"
            style={{
              borderRadius: radius,
              flex: i === defaultIndex ? expandRatio : (1 - expandRatio) / Math.max(count - 1, 1),
              minWidth: isHorizontal ? 60 : "100%",
              minHeight: isHorizontal ? "100%" : 60,
            }}
            onMouseEnter={() => handleEnter(i)}
            onClick={() => handleClick(i)}
          >
            {/* Image */}
            <img
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              src={item.image}
              alt={item.label || `Item ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to top, ${overlayColor}cc 0%, ${overlayColor}40 40%, transparent 70%)`,
                opacity: isActive ? 0.85 : 0.55,
              }}
            />

            {/* Accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-500"
              style={{
                backgroundColor: accentColor,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scaleX(1)" : "scaleX(0)",
              }}
            />

            {/* Label */}
            {showLabels && item.label && (
              <div
                className="absolute bottom-5 left-5 right-5 transition-all duration-500"
                style={{
                  opacity: isActive ? 1 : 0.7,
                  transform: isActive ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-lg md:text-xl font-semibold tracking-tight hover:underline"
                    style={{ color: textColor }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className="text-lg md:text-xl font-semibold tracking-tight"
                    style={{ color: textColor }}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionGallery;