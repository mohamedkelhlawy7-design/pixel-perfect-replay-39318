import { createFileRoute } from "@tanstack/react-router";
import { getServices, isCategorySlug, isServiceSort } from "@/lib/marketplace/catalog";
import type { CategorySlug, ServiceSort } from "@/lib/marketplace/types";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { SearchBox } from "@/components/marketplace/SearchBox";
import { DemoBanner } from "@/components/marketplace/DemoNotice";

type CatalogSearch = { q?: string; category?: CategorySlug; sort?: ServiceSort };

export const Route = createFileRoute("/services/")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    const out: CatalogSearch = {};
    if (typeof search.q === "string" && search.q) out.q = search.q;
    if (isCategorySlug(search.category)) out.category = search.category;
    if (isServiceSort(search.sort)) out.sort = search.sort;
    return out;
  },
  head: () => ({
    meta: [
      { title: "الخدمات | رِفاد" },
      { name: "description", content: "تصفح خدمات هندسية وتصميم وبرمجة ومسار مهني من مزوّدين مستقلين في الخليج." },
      { property: "og:title", content: "الخدمات | رِفاد" },
      { property: "og:description", content: "تصفح خدمات رِفاد الرقمية في السعودية والإمارات والكويت وقطر." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const search = Route.useSearch();
  const services = getServices(search);
  return (
    <main className="container-page py-10">
      <h1 className="font-display text-3xl font-bold">الخدمات</h1>
      <SearchBox defaultValue={search.q ?? ""} size="md" className="mt-6 max-w-2xl" />
      <div className="mt-6"><DemoBanner /></div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((s) => <ServiceCard key={s.id} service={s} />)}
      </div>
      {services.length === 0 && <p className="mt-10 text-muted-foreground">لا توجد خدمات مطابقة.</p>}
    </main>
  );
}
