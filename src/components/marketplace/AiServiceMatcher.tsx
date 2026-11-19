import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Loader as Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProvider, getService } from "@/lib/marketplace/catalog";
import { formatPrice } from "@/lib/marketplace/currency";
import { MATCH_QUERY_MAX, MATCH_QUERY_MIN, type MatchResponse } from "@/lib/marketplace/ai-match";
import { matchServices } from "@/lib/marketplace/ai-match.functions";
import { CATEGORY_IMAGES } from "@/lib/marketplace/media";
import { Rating } from "./Rating";

const EXAMPLES = [
  "أحتاج مخططات كهرباء لفيلا دورين في الرياض قبل تقديمها للبلدية",
  "أطلق متجر عطور إلكتروني وأريد شعاراً وهوية كاملة",
  "أبحث عن وظيفة في قطاع النفط وسيرتي الذاتية قديمة",
  "عندي بيانات مبيعات في Excel وأريد تقريراً شهرياً تلقائياً",
];

export function AiServiceMatcher() {
  const [need, setNeed] = useState("");
  const match = useServerFn(matchServices);
  const mutation = useMutation<MatchResponse, Error, string>({
    mutationFn: (text) => match({ data: { need: text } }),
  });

  const trimmed = need.trim();
  const tooShort = trimmed.length < MATCH_QUERY_MIN;
  const result = mutation.data;

  return (
    <section
      aria-labelledby="ai-matcher-title"
      className="relative overflow-hidden rounded-3xl bg-gradient-navy p-6 text-navy-foreground shadow-lift sm:p-8"
    >
      <div className="pattern-geo pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-teal/20 text-teal">
            <Sparkles className="size-5" />
          </span>
          <h2 id="ai-matcher-title" className="font-display text-xl font-bold sm:text-2xl">
            صف ما تحتاجه، ونقترح لك الخدمة المناسبة
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-navy-foreground/70">
          اكتب احتياجك بكلماتك، وسيقرأ المساعد الذكي الخدمات المتاحة ويرشّح لك الأنسب مع سبب
          الاختيار.
        </p>

        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!tooShort && !mutation.isPending) mutation.mutate(trimmed);
          }}
        >
          <label htmlFor="ai-need" className="sr-only">
            وصف الخدمة التي تحتاجها
          </label>
          <textarea
            id="ai-need"
            value={need}
            onChange={(e) => setNeed(e.target.value.slice(0, MATCH_QUERY_MAX))}
            rows={3}
            placeholder="مثال: أحتاج دراسة إنارة لمعرض تجاري مساحته ٤٠٠ متر مع صور محاكاة…"
            className="w-full resize-none rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-4 text-base text-navy-foreground outline-none backdrop-blur placeholder:text-navy-foreground/40 focus:border-teal focus:ring-2 focus:ring-teal/30"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setNeed(ex)}
                  className="cursor-pointer rounded-full border border-navy-foreground/15 px-3 py-1 text-xs text-navy-foreground/75 transition-colors hover:border-teal hover:text-navy-foreground"
                >
                  {ex.length > 34 ? `${ex.slice(0, 34)}…` : ex}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-navy-foreground/50">
                {trimmed.length}/{MATCH_QUERY_MAX}
              </span>
              <Button
                type="submit"
                variant="teal"
                size="lg"
                disabled={tooShort || mutation.isPending}
              >
                {mutation.isPending ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {mutation.isPending ? "نبحث لك…" : "اقترح لي خدمات"}
              </Button>
            </div>
          </div>
        </form>

        {mutation.isError && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-danger-soft px-4 py-3 text-sm text-destructive"
          >
            {mutation.error.message || "حدث خطأ غير متوقع. حاول مرة أخرى."}
          </p>
        )}
        {result && !result.ok && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-danger-soft px-4 py-3 text-sm text-destructive"
          >
            {result.error}
          </p>
        )}

        {result?.ok && (
          <div className="mt-6 animate-fade-up" aria-live="polite">
            {result.summary && (
              <p className="text-sm leading-relaxed text-navy-foreground/85">{result.summary}</p>
            )}
            {result.matches.length > 0 && (
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {result.matches.map((m) => {
                  const service = getService(m.serviceId);
                  if (!service) return null;
                  const provider = getProvider(service.providerId);
                  return (
                    <li key={m.serviceId}>
                      <Link
                        to="/services/$serviceId"
                        params={{ serviceId: service.id }}
                        className="card-interactive group flex gap-3 rounded-2xl border bg-card p-3 text-card-foreground"
                      >
                        <img
                          src={CATEGORY_IMAGES[service.category]}
                          alt=""
                          className="size-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={m.fit === "high" ? "teal" : "gold"}>
                              {m.fit === "high" ? "مطابقة عالية" : "مطابقة جزئية"}
                            </Badge>
                            <Rating value={service.rating} />
                          </div>
                          <h3 className="mt-1.5 line-clamp-1 font-display text-sm font-semibold">
                            {service.title}
                          </h3>
                          {m.reason && (
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {m.reason}
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{provider?.name}</span>
                            <span className="inline-flex items-center gap-1 font-semibold text-navy">
                              {formatPrice(service.price, service.currency)}
                              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            <p className="mt-4 text-xs text-navy-foreground/50">
              الاقتراحات مولّدة آلياً من الخدمات المعروضة؛ راجع تفاصيل كل خدمة قبل الطلب.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
