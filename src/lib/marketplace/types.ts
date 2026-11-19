/**
 * Domain types for the RIFAD marketplace.
 * They mirror the future database tables so the demo data layer can be
 * swapped for real queries without touching UI components.
 */

export type CurrencyCode = "SAR" | "AED" | "KWD" | "QAR";
export type CountryCode = "SA" | "AE" | "KW" | "QA";
export type UserRole = "customer" | "provider" | "admin";
export type CategorySlug = "engineering" | "design" | "business" | "career" | "tech";

export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  subcategories: Subcategory[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: CategorySlug;
  year: number;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  initials: string;
  city: string;
  country: CountryCode;
  bio: string;
  skills: string[];
  languages: string[];
  rating: number;
  reviewsCount: number;
  completedOrders: number;
  responseTimeHours: number;
  memberSince: string;
  verified: boolean;
  level: "new" | "rising" | "pro" | "elite";
  portfolio: PortfolioItem[];
}

export interface ServicePackage {
  tier: "basic" | "standard" | "premium";
  name: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

export type ServiceStatus = "draft" | "pending_review" | "active" | "paused" | "rejected";

export interface Service {
  id: string;
  title: string;
  category: CategorySlug;
  subcategory: string;
  providerId: string;
  summary: string;
  description: string;
  price: number; // starting price, in the service currency
  currency: CurrencyCode;
  deliveryDays: number;
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  tags: string[];
  requirements: string[];
  packages: ServicePackage[];
  featured?: boolean;
  status: ServiceStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  serviceId: string;
  providerId: string;
  authorName: string;
  authorCountry: CountryCode;
  rating: number;
  comment: string;
  date: string;
}

export type OrderStatus =
  "pending" | "in_progress" | "delivered" | "revision" | "completed" | "cancelled";

export interface OrderFile {
  name: string;
  size: string;
  by: "customer" | "provider";
}

export interface Order {
  id: string;
  serviceId: string;
  customerId: string;
  providerId: string;
  packageTier: ServicePackage["tier"];
  amount: number;
  currency: CurrencyCode;
  status: OrderStatus;
  createdAt: string;
  dueAt: string;
  files: OrderFile[];
  notes?: string;
}

export interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  orderId?: string;
  withName: string;
  withInitials: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

export interface PlatformUser {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  country: CountryCode;
  joinedAt: string;
  status: "active" | "suspended" | "pending";
  ordersCount: number;
}

export type ServiceSort = "recommended" | "rating" | "price_asc" | "price_desc" | "fastest";

export interface ServiceFilters {
  q?: string;
  category?: CategorySlug;
  sort?: ServiceSort;
  maxPrice?: number;
}
