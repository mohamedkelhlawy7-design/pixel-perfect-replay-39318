import {
  BriefcaseBusiness,
  CodeXml,
  DraftingCompass,
  FileSpreadsheet,
  Palette,
  type LucideIcon,
} from "lucide-react";
import type { CategorySlug } from "@/lib/marketplace/types";

export const CATEGORY_ICONS: Record<CategorySlug, LucideIcon> = {
  engineering: DraftingCompass,
  design: Palette,
  business: FileSpreadsheet,
  career: BriefcaseBusiness,
  tech: CodeXml,
};

export function CategoryIcon({ slug, className }: { slug: CategorySlug; className?: string }) {
  const Icon = CATEGORY_ICONS[slug];
  return <Icon className={className} />;
}
