import { FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Marks content as sample data so nothing is mistaken for real activity. */
export function DemoBadge({ className, label = "بيانات تجريبية" }: { className?: string; label?: string }) {
  return (
    <Badge variant="demo" className={cn("gap-1", className)}>
      <FlaskConical className="size-3" />
      {label}
    </Badge>
  );
}

export function DemoBanner({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-gold/60 bg-gold-soft/60 px-4 py-3 text-sm text-gold-foreground">
      <FlaskConical className="mt-0.5 size-4 shrink-0" />
      <p>
        {children ??
          "هذه نسخة عرض: جميع المستخدمين والطلبات والتقييمات والأرقام المعروضة بيانات تجريبية، والدفع الإلكتروني غير مفعّل بعد."}
      </p>
    </div>
  );
}
