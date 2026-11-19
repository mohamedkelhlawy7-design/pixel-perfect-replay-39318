import type { CategorySlug } from "./types";
import engineering from "@/assets/cat-engineering.webp";
import design from "@/assets/cat-design.webp";
import business from "@/assets/cat-business.webp";
import career from "@/assets/cat-career.webp";
import tech from "@/assets/cat-tech.webp";

export const CATEGORY_IMAGES: Record<CategorySlug, string> = {
  engineering,
  design,
  business,
  career,
  tech,
};
