/**
 * Read access to marketplace data. Today it reads the bundled sample data;
 * swap these functions for database queries without changing callers.
 */
import { CATEGORIES, PENDING_SERVICES, PROVIDERS, REVIEWS, SERVICES } from "./demo-data";
import type { CategorySlug, OrderStatus, Service, ServiceFilters, ServiceSort } from "./types";

export const SORT_OPTIONS: { value: ServiceSort; label: string }[] = [
  { value: "recommended", label: "الأكثر ملاءمة" },
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "price_asc", label: "السعر: من الأقل" },
  { value: "price_desc", label: "السعر: من الأعلى" },
  { value: "fastest", label: "الأسرع تسليماً" },
];

export const isCategorySlug = (v: unknown): v is CategorySlug =>
  typeof v === "string" && CATEGORIES.some((c) => c.slug === v);

export const isServiceSort = (v: unknown): v is ServiceSort =>
  typeof v === "string" && SORT_OPTIONS.some((o) => o.value === v);

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, "") // strip Arabic diacritics
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();

export function filterServices(services: Service[], filters: ServiceFilters): Service[] {
  const q = filters.q ? normalize(filters.q) : "";
  let result = services.filter((s) => s.status === "active");
  if (filters.category) result = result.filter((s) => s.category === filters.category);
  if (filters.maxPrice != null) result = result.filter((s) => s.price <= filters.maxPrice!);
  if (q) {
    result = result.filter((s) => {
      const provider = getProvider(s.providerId);
      const haystack = normalize(
        [
          s.title,
          s.summary,
          ...s.tags,
          provider?.name ?? "",
          getCategory(s.category)?.name ?? "",
        ].join(" "),
      );
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }
  const sorted = [...result];
  switch (filters.sort) {
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    case "price_asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "fastest":
      sorted.sort((a, b) => a.deliveryDays - b.deliveryDays);
      break;
    default:
      sorted.sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.ordersCount - a.ordersCount,
      );
  }
  return sorted;
}

export const getServices = (filters: ServiceFilters = {}) => filterServices(SERVICES, filters);
export const getFeaturedServices = () => SERVICES.filter((s) => s.featured).slice(0, 8);
export const getService = (id: string) => SERVICES.find((s) => s.id === id);
export const getPendingServices = () => PENDING_SERVICES;
export const getAllServices = () => SERVICES;
export const getProvider = (id: string) => PROVIDERS.find((p) => p.id === id);
export const getProviders = () => PROVIDERS;
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getCategories = () => CATEGORIES;
export const getServicesByProvider = (providerId: string) =>
  SERVICES.filter((s) => s.providerId === providerId);
export const getReviewsForService = (serviceId: string) =>
  REVIEWS.filter((r) => r.serviceId === serviceId);
export const getReviewsForProvider = (providerId: string) =>
  REVIEWS.filter((r) => r.providerId === providerId);
export const getAllReviews = () => REVIEWS;
export const countServicesInCategory = (slug: CategorySlug) =>
  SERVICES.filter((s) => s.category === slug).length;

export const ORDER_STATUS: Record<
  OrderStatus,
  { label: string; variant: "warning" | "info" | "teal" | "gold" | "success" | "muted" }
> = {
  pending: { label: "بانتظار القبول", variant: "warning" },
  in_progress: { label: "قيد التنفيذ", variant: "info" },
  delivered: { label: "تم التسليم", variant: "teal" },
  revision: { label: "طلب تعديل", variant: "gold" },
  completed: { label: "مكتمل", variant: "success" },
  cancelled: { label: "ملغي", variant: "muted" },
};

export const PROVIDER_LEVEL: Record<string, string> = {
  new: "مزوّد جديد",
  rising: "مزوّد صاعد",
  pro: "مزوّد محترف",
  elite: "نخبة رِفاد",
};
