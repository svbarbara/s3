import React from "react";

interface SimpleAwardBadgeProps {
  text?: string;
  size?: "default" | "small";
}

export const SimpleAwardBadge = ({ text = "Product of the Day #1", size = "default" }: SimpleAwardBadgeProps) => {
  const width = size === "small" ? "w-[160px]" : "w-[260px]";
  
  return (
    <div className={`${width} h-auto cursor-pointer`}>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-3 px-6 rounded-lg shadow-lg border border-yellow-300">
        <div className="text-xs font-semibold uppercase tracking-wide mb-1">
          PRODUCT HUNT
        </div>
        <div className="text-sm font-bold">
          {text}
        </div>
        <div className="text-xs mt-1">
          🏆 Award Winner
        </div>
      </div>
    </div>
  );
};