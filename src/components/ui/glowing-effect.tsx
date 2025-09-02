"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      let scrollThrottle: number | null = null;
      let pointerThrottle: number | null = null;

      const handleScroll = () => {
        if (scrollThrottle) return;
        scrollThrottle = requestAnimationFrame(() => {
          handleMove();
          scrollThrottle = null;
        });
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (pointerThrottle) return;
        pointerThrottle = requestAnimationFrame(() => {
          handleMove(e);
          pointerThrottle = null;
        });
      };
      
      // Enhanced card hover detection
      const handleMouseEnter = () => {
        if (containerRef.current) {
          containerRef.current.style.setProperty("--card-hovered", "1");
        }
      };
      
      const handleMouseLeave = () => {
        if (containerRef.current) {
          containerRef.current.style.setProperty("--card-hovered", "0");
          containerRef.current.style.setProperty("--active", "0");
        }
      };

      const parentCard = containerRef.current?.closest('.group');
      
      // Only add scroll listener if the element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll, { passive: true });
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      });

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      // Use pointermove only on the parent card instead of entire document
      if (parentCard) {
        parentCard.addEventListener("pointermove", handlePointerMove, { passive: true });
        parentCard.addEventListener("mouseenter", handleMouseEnter);
        parentCard.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (scrollThrottle) {
          cancelAnimationFrame(scrollThrottle);
        }
        if (pointerThrottle) {
          cancelAnimationFrame(pointerThrottle);
        }
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
        
        if (parentCard) {
          parentCard.removeEventListener("pointermove", handlePointerMove);
          parentCard.removeEventListener("mouseenter", handleMouseEnter);
          parentCard.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--card-hovered": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "8",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #00486D 10%, #00486D00 20%),
                radial-gradient(circle at 40% 40%, #002B41 5%, #002B4100 15%),
                radial-gradient(circle at 60% 60%, #BBE0FD 10%, #BBE0FD00 20%), 
                radial-gradient(circle at 40% 60%, #0ea5e9 10%, #0ea5e900 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #00486D 0%,
                  #002B41 calc(25% / var(--repeating-conic-gradient-times)),
                  #BBE0FD calc(50% / var(--repeating-conic-gradient-times)), 
                  #0ea5e9 calc(75% / var(--repeating-conic-gradient-times)),
                  #00486D calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[calc(var(--active)*var(--card-hovered))] after:transition-all after:duration-500 after:ease-out",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };