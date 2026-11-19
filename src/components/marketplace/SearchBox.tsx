import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBox({
  defaultValue = "",
  size = "lg",
  className,
}: {
  defaultValue?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(defaultValue);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/services", search: { q: q.trim() || undefined } });
      }}
      className={cn(
        "flex items-center gap-2 rounded-2xl border bg-surface p-1.5 shadow-card focus-within:ring-2 focus-within:ring-ring/40",
        className,
      )}
    >
      <Search className="ms-3 size-5 shrink-0 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ابحث عن خدمة: مخطط كهربائي، شعار، سيرة ذاتية…"
        aria-label="ابحث عن خدمة"
        className={cn(
          "min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
          size === "lg" ? "h-11 text-base" : "h-9 text-sm",
        )}
      />
      <Button type="submit" variant="teal" size={size === "lg" ? "lg" : "default"}>
        ابحث
      </Button>
    </form>
  );
}
