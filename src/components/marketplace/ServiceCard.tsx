import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { getCategory, getProvider } from "@/lib/marketplace/catalog";
import { formatPrice } from "@/lib/marketplace/currency";
import { CATEGORY_IMAGES } from "@/lib/marketplace/media";
import type { Service } from "@/lib/marketplace/types";
import { Rating } from "./Rating";
import { ProviderAvatar } from "./ProviderAvatar";
import { CategoryIcon } from "./CategoryIcon";

export function ServiceCard({ service }: { service: Service }) {
  const provider = getProvider(service.providerId);
  const category = getCategory(service.category);
  const sub = category?.subcategories.find((s) => s.slug === service.subcategory);

  return (
    <Link
      to="/services/$serviceId"
      params={{ serviceId: service.id }}
      className="card-interactive group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={CATEGORY_IMAGES[service.category]}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-fade-navy opacity-70" />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-medium text-navy backdrop-blur">
          <CategoryIcon slug={service.category} className="size-3.5 text-teal" />
          {sub?.name ?? category?.shortName}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {provider && (
          <div className="flex items-center gap-2">
            <ProviderAvatar initials={provider.initials} size="sm" verified={provider.verified} />
            <span className="truncate text-sm font-medium text-foreground">{provider.name}</span>
          </div>
        )}
        <h3 className="line-clamp-2 font-display text-[0.975rem] font-semibold leading-relaxed text-foreground group-hover:text-accent-foreground">
          {service.title}
        </h3>
        <div className="flex items-center gap-3 text-sm">
          <Rating value={service.rating} count={service.reviewsCount} />
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3.5" />
            {service.deliveryDays} أيام
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between border-t pt-3">
          <span className="text-xs text-muted-foreground">يبدأ من</span>
          <span className="font-display text-lg font-bold text-navy">{formatPrice(service.price, service.currency)}</span>
        </div>
      </div>
    </Link>
  );
}
