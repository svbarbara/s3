"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  specialMarkers?: Array<{
    lat: number;
    lng: number;
    color: string;
    label?: string;
    size?: number;
  }>;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  specialMarkers = [],
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  // Use CSS variables for theme detection instead of next-themes
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    updateTheme();
    
    // Observer pour détecter les changements de thème
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const svgMap = map.getSVG({
    radius: 0.22,
    color: isDark ? "#64748b" : "#00000040",
    shape: "circle",
    backgroundColor: isDark ? "#0f172a" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    // Use Miller Cylindrical projection to match dotted-map
    const radLat = (lat * Math.PI) / 180;
    const radLng = (lng * Math.PI) / 180;
    
    // Miller Cylindrical projection formulas
    const x = 800 * (radLng + Math.PI) / (2 * Math.PI);
    const y = 400 * (Math.PI - 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * radLat))) / (2 * Math.PI);
    
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] dark:bg-slate-900 bg-white rounded-lg relative font-sans border dark:border-slate-700 border-slate-200 shadow-unified">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? "#0f172a" : "white"} stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={isDark ? "#0f172a" : "white"} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <motion.circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="3;10;3"
                  dur="2s"
                  begin={`${1 + i * 0.1}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2s"
                  begin={`${1 + i * 0.1}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <motion.circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="3;10;3"
                  dur="2s"
                  begin={`${1.2 + i * 0.1}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2s"
                  begin={`${1.2 + i * 0.1}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}

        {/* Special Markers */}
        {specialMarkers.map((marker, i) => (
          <g key={`special-marker-${i}`}>
            <motion.circle
              cx={projectPoint(marker.lat, marker.lng).x}
              cy={projectPoint(marker.lat, marker.lng).y}
              r={marker.size || 4}
              fill={marker.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 + i * 0.2 }}
            />
            <circle
              cx={projectPoint(marker.lat, marker.lng).x}
              cy={projectPoint(marker.lat, marker.lng).y}
              r={marker.size || 4}
              fill={marker.color}
              opacity="0.8"
            >
              <animate
                attributeName="r"
                values={`${marker.size || 4};${(marker.size || 4) * 3};${marker.size || 4}`}
                dur="3s"
                begin={`${2 + i * 0.2}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0;0.8"
                dur="3s"
                begin={`${2 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Inner glowing circle */}
            <motion.circle
              cx={projectPoint(marker.lat, marker.lng).x}
              cy={projectPoint(marker.lat, marker.lng).y}
              r={(marker.size || 4) * 0.5}
              fill={isDark ? "#f1f5f9" : "white"}
              filter={isDark ? "url(#glow)" : "none"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.6, delay: 2.1 + i * 0.2 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}