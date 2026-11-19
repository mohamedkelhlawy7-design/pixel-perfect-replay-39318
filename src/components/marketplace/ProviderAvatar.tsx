import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-16 text-lg",
  xl: "size-24 text-2xl",
};

/** Initials avatar — sample profiles intentionally use no real photos. */
export function ProviderAvatar({
  initials,
  size = "md",
  verified,
  className,
}: {
  initials: string;
  size?: keyof typeof SIZES;
  verified?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-gradient-navy font-display font-semibold text-navy-foreground ring-2 ring-surface",
          SIZES[size],
        )}
      >
        {initials}
      </span>
      {verified && (
        <BadgeCheck
          className={cn(
            "absolute -bottom-0.5 -left-0.5 rounded-full bg-surface fill-teal text-surface",
            size === "xl" || size === "lg" ? "size-6" : "size-4",
          )}
          aria-label="موثّق"
        />
      )}
    </span>
  );
}
