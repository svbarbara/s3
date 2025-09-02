import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full h-full grid-cols-6 grid-rows-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  price,
  priceLabel,
  chipColor,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  price?: string;
  priceLabel?: string;
  chipColor?: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between rounded-xl border border-slate-300/60",
      // light styles
      "bg-white shadow-unified-sm transition-all duration-300",
      // dark styles
      "dark:bg-black dark:border-slate-800/50 dark:shadow-unified",
      className,
    )}
  >
    <GlowingEffect
      spread={60}
      glow={true}
      disabled={false}
      proximity={150}
      inactiveZone={0.05}
      borderWidth={2}
      movementDuration={0.4}
      variant="default"
    />
    <div>{background}</div>
    <div className="pointer-events-none z-20 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 dark:text-slate-300 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-slate-200">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400 dark:text-slate-400">{description}</p>
      {price && (
        <div className="mt-2 flex flex-col gap-1">
          <div className="text-2xl font-bold text-primary dark:text-accent">
            {price}
          </div>
          {priceLabel && (
            <div className="text-sm text-neutral-500 dark:text-slate-400">
              {priceLabel}
            </div>
          )}
        </div>
      )}
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <div className={cn(
        "pointer-events-auto px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
        chipColor || "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
      )}>
        {cta}
      </div>
    </div>
    <div className="pointer-events-none absolute inset-0 z-10 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-slate-800/20" />
  </div>
);

export { BentoCard, BentoGrid };