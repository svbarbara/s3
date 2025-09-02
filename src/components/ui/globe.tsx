"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 1.5,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 8000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [25.2048, 55.2708], size: 0.08 }, // Dubai
    { location: [48.8566, 2.3522], size: 0.06 }, // Paris
    { location: [51.5074, -0.1278], size: 0.06 }, // London
    { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
    { location: [40.7128, -74.006], size: 0.07 }, // New York City
    { location: [22.3193, 114.1694], size: 0.06 }, // Hong Kong
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(0);
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, number>) => {
      if (!pointerInteracting.current && isVisible) phiRef.current += 0.003;
      state.phi = phiRef.current + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r, isVisible],
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 300);

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [isVisible, config]);

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto aspect-[1/1] w-full h-full", className)}
    >
      {isVisible ? (
        <canvas
          className={cn(
            "w-full h-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
          )}
          ref={canvasRef}
          onPointerDown={(e) =>
            updatePointerInteraction(
              e.clientX - pointerInteractionMovement.current,
            )
          }
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full opacity-50 animate-pulse" />
      )}
    </div>
  );
}
