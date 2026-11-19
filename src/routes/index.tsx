import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SearchBox } from "@/components/marketplace/SearchBox";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { CategoryIcon } from "@/components/marketplace/CategoryIcon";
import { DemoBadge } from "@/components/marketplace/DemoNotice";
import { Rating } from "@/components/marketplace/Rating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getCategories,
  getFeaturedServices,
  getProviders,
  countServicesInCategory,
} from "@/lib/marketplace/catalog";
import { SAMPLE_STATS } from "@/lib/marketplace/demo-data";
import type { CategorySlug } from "@/lib/marketplace/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "رِفاد | RIFAD — مهارات تصنع فرقاً" },
      { name: "description", content: "سوق خدمات رقمية يربط العملاء في الخليج بمزوّدين مستقلين محترفين." },
    ],
  }),
  component: Index,
});

const CATEGORY_CTA: Record<CategorySlug, string> = {
  engineering: "مخططات وحسابات هندسية",
  design: "هوية بصرية وتصاميم",
  business: "جداول ومستندات احترافية",
  career: "سيرة ذاتية وملف مهني",
  tech: "مواقع وأتمتة وحلول تقنية",
};

const STATS = [
  { icon: Users, value: `+${SAMPLE_STATS.providers}`, label: "مزوّد مستقل" },
  { icon: TrendingUp, value: `+${SAMPLE_STATS.completedOrders}`, label: "طلب مكتمل" },
  { icon: Rating, value: SAMPLE_STATS.satisfaction.toFixed(1), label: "متوسط التقييم" },
  { icon: ShieldCheck, value: String(SAMPLE_STATS.countries), label: "دول خليجية" },
];

function Index() {
  const categories = getCategories();
  const featured = getFeaturedServices();
  const topProviders = getProviders()
    .filter((p) => p.verified)
    .sort((a, b) => b.completedOrders - a.completedOrders)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/services"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              الخدمات
            </Link>
            <a
              href="#categories"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              التصنيفات
            </a>
            <a
              href="#providers"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              المزوّدون
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              تسجيل الدخول
            </Button>
            <Button variant="teal" size="sm" asChild>
              <Link to="/services">تصفّح الخدمات</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-navy">
          <div className="pattern-geo pointer-events-none absolute inset-0 opacity-50" />
          <div className="container-page relative py-16 text-navy-foreground sm:py-20 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="gold" className="mx-auto mb-5 gap-1.5 px-3 py-1 text-xs">
                <Sparkles className="size-3.5" />
                سوق الخليج للخدمات الرقمية
              </Badge>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                مهارات تصنع فرقاً
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
                من مخططات كهرباء إلى هوية بصرية وسيرة ذاتية — انشر طلبك أو اختر من خدمات
                مزوّدين مستقلين محترفين في السعودية والإمارات والكويت وقطر.
              </p>
              <div className="mx-auto mt-8 max-w-2xl">
                <SearchBox />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link to="/services">
                  <Button variant="heroOutline" size="lg" className="gap-2">
                    استكشف الخدمات
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
                <span className="inline-flex items-center gap-1.5 text-sm text-navy-foreground/60">
                  <DemoBadge label="بيانات تجريبية" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border/60 bg-surface">
        <div className="container-page grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-teal-soft text-teal">
                <stat.icon className="size-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container-page py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">التصنيفات</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              اختر مجال خدمتك
            </h2>
          </div>
          <Link
            to="/services"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-teal/80 sm:inline-flex"
          >
            كل الخدمات
            <ArrowLeft className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => {
            const count = countServicesInCategory(cat.slug as CategorySlug);
            return (
              <Link
                key={cat.slug}
                to="/services"
                search={{ category: cat.slug as CategorySlug }}
                className="card-interactive group flex flex-col gap-3 rounded-2xl border bg-card p-5 text-card-foreground"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-teal text-teal-foreground shadow-glow">
                  <CategoryIcon slug={cat.slug as CategorySlug} className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cat.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{count} خدمة</span>
                  <ArrowLeft className="size-3.5 text-teal transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-secondary/40 py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">الأكثر طلباً</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                خدمات مميّزة
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-teal/80 sm:inline-flex"
            >
              عرض الكل
              <ArrowLeft className="size-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why RIFAD */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">لماذا رِفاد</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
            منصة موثوقة للعملاء والمزوّدين
          </h2>
          <p className="mt-3 text-muted-foreground">
            نربط طلبك بمزوّد مؤهّل ونتأكد من جودة التسليم في كل خطوة.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "مزوّدون موثّقون",
              desc: "نتحقّق من خبرة كل مزوّد قبل قبوله، وتظهر شارة التوثيق في ملفه.",
            },
            {
              icon: Zap,
              title: "تسليم سريع",
              desc: "حدّد موعد التسليم المناسب لك، وتابع تقدّم طلبك لحظة بلحظة.",
            },
            {
              icon: Sparkles,
              title: "مساعد ذكي",
              desc: "صِف احتياجك بكلماتك ونقترح لك الخدمة الأنسب من الكتالوج.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border bg-card p-6 text-card-foreground shadow-soft"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-soft text-teal">
                <feature.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top providers */}
      <section id="providers" className="bg-secondary/40 py-16">
        <div className="container-page">
          <div className="mb-8">
            <p className="eyebrow">نخبة المزوّدين</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              مزوّدون موثّقون بأداء متميّز
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topProviders.map((provider) => (
              <div
                key={provider.id}
                className="card-interactive flex flex-col gap-3 rounded-2xl border bg-card p-5 text-card-foreground"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-navy font-display font-semibold text-navy-foreground ring-2 ring-surface">
                    {provider.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-sm font-semibold text-foreground">
                      {provider.name}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">{provider.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Rating value={provider.rating} count={provider.reviewsCount} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {provider.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="muted" className="text-[0.65rem]">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                  <span>{provider.city}</span>
                  <span>{provider.completedOrders} طلب مكتمل</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy p-8 text-center text-navy-foreground shadow-lift sm:p-12 lg:p-16">
          <div className="pattern-geo pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              هل لديك مهارة تقدّمها؟
            </h2>
            <p className="mt-3 text-navy-foreground/70">
              انضمّ إلى رِفاد ك مزوّد مستقل واصل إلى عملاء في الخليج، وابدأ بعرض خدماتك اليوم.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="gold" size="lg">
                سجّل كمزوّد
              </Button>
              <Link to="/services">
                <Button variant="heroOutline" size="lg">
                  تصفّح كعميل
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-surface">
        <div className="container-page py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Logo />
            <p className="text-center text-sm text-muted-foreground sm:text-end">
              رِفاد — سوق خدمات رقمي للخليج. هذه نسخة عرض ببيانات تجريبية.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
