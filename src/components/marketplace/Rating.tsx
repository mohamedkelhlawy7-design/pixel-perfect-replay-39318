import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  className,
  size = "sm",
}: {
  value: number;
  count?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", size === "md" ? "text-base" : "text-sm", className)}>
      <Star className={cn("fill-gold text-gold", size === "md" ? "size-5" : "size-4")} />
      <span className="font-semibold text-foreground">{value ? value.toFixed(1) : "جديد"}</span>
      {count != null && <span className="text-muted-foreground">({count})</span>}
    </span>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-label={`${value} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-4", i < Math.round(value) ? "fill-gold text-gold" : "text-border")} />
      ))}
    </span>
  );
}
