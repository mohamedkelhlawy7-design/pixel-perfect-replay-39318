import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** RIFAD mark: an eight-point star (Gulf geometry) framing a rising stroke. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-10", className)} aria-hidden="true">
      <rect width="40" height="40" rx="11" className="fill-navy" />
      <path
        d="M20 6.5l3.6 8.9 8.9 3.6-8.9 3.6L20 31.5l-3.6-8.9L7.5 19l8.9-3.6z"
        className="fill-none stroke-gold"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="19" r="3.2" className="fill-teal" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="رِفاد — الصفحة الرئيسية"
    >
      <LogoMark className="transition-transform duration-500 group-hover:rotate-45" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-bold",
            tone === "dark" ? "text-navy" : "text-navy-foreground",
          )}
        >
          رِفاد
        </span>
        <span
          className={cn(
            "mt-1 text-[0.625rem] font-semibold tracking-[0.3em]",
            tone === "dark" ? "text-muted-foreground" : "text-gold",
          )}
        >
          RIFAD
        </span>
      </span>
    </Link>
  );
}
