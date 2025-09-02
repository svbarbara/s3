"use client";

import * as React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type AvatarWithTooltipType = {
  src: string;
  name: string;
  status?: keyof typeof statusColors;
};

type AvatarGroupWithTooltipsProps = {
  avatars?: AvatarWithTooltipType[];
  maxDisplay?: number;
  showStatus?: boolean;
  delayDuration?: number;
  className?: string;
};

export const DEFAULT_AVATARS: AvatarWithTooltipType[] = [
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Marie Dubois",
    status: "online",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Ahmed Al-Rashid",
    status: "busy",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Sophie Martin",
    status: "away",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    name: "David Rodriguez",
    status: "online",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    name: "Lisa Chen",
    status: "offline",
  },
];

const statusColors = {
  online: "bg-green-500",
  busy: "bg-red-500",
  away: "bg-amber-500",
  offline: "bg-gray-400",
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const AvatarGroupWithTooltips = React.forwardRef<
  HTMLDivElement,
  AvatarGroupWithTooltipsProps
>((props, ref) => {
  const {
    avatars = DEFAULT_AVATARS,
    maxDisplay = 4,
    showStatus = false,
    delayDuration = 300,
    className,
  } = props;

  const displayAvatars = React.useMemo(
    () => avatars.slice(0, maxDisplay),
    [avatars, maxDisplay]
  );

  const remainingCount = avatars.length - maxDisplay;

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          className
        )}
      >
        <div className="flex items-center relative">
          {displayAvatars.map((avatar, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "relative hover:z-10 transition-all duration-300", 
                    index > 0 && "-ml-2"
                  )}
                >
                  <Avatar className="transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-unified border-2 border-background w-10 h-10">
                    <AvatarImage 
                      src={avatar.src} 
                      alt={avatar.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                      {getInitials(avatar.name)}
                    </AvatarFallback>
                  </Avatar>
                  {showStatus && avatar.status && (
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background",
                        statusColors[avatar.status]
                      )}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                <div className="text-center">
                  <div>{avatar.name}</div>
                  {showStatus && avatar.status && (
                    <div className="text-xs capitalize text-muted-foreground mt-1">
                      {avatar.status}
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}

          {remainingCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("relative hover:z-10 transition-all duration-300", "-ml-2")}>
                  <Avatar className="transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-unified border-2 border-background bg-muted w-10 h-10">
                    <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-sm">
                      +{remainingCount}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                {remainingCount} more {remainingCount === 1 ? "user" : "users"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
});

AvatarGroupWithTooltips.displayName = "AvatarGroupWithTooltips";

export { AvatarGroupWithTooltips };
export type { AvatarWithTooltipType, AvatarGroupWithTooltipsProps };