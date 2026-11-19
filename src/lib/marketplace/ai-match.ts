/**
 * Client-safe helpers for AI service matching: the catalog digest sent to the
 * model, the structured-output schema, and validation of the model's answer.
 */
import { getCategory, getProvider } from "./catalog";
import type { Service } from "./types";

export const MATCH_QUERY_MIN = 10;
export const MATCH_QUERY_MAX = 600;
export const MAX_MATCHES = 4;

export interface ServiceMatch {
  serviceId: string;
  reason: string;
  fit: "high" | "medium";
}

export interface MatchResult {
  summary: string;
  matches: ServiceMatch[];
}

export type MatchResponse = ({ ok: true } & MatchResult) | { ok: false; error: string };

/** Compact, public-only description of each active service for the model. */
export function buildCatalogDigest(services: Service[]): string {
  return services
    .filter((s) => s.status === "active")
    .map((s) => {
      const category = getCategory(s.category);
      const sub = category?.subcategories.find((c) => c.slug === s.subcategory)?.name;
      const provider = getProvider(s.providerId);
      return [
        `id: ${s.id}`,
        `العنوان: ${s.title}`,
        `التصنيف: ${category?.name ?? s.category}${sub ? ` / ${sub}` : ""}`,
        `الوصف: ${s.summary}`,
        `الكلمات: ${s.tags.join("، ")}`,
        `يبدأ من: ${s.price} ${s.currency}`,
        `مدة التسليم: ${s.deliveryDays} أيام`,
        provider ? `المزوّد: ${provider.title}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
    })
    .join("\n");
}

export function matchJsonSchema(serviceIds: string[]) {
  return {
    type: "object",
    additionalProperties: false,
    required: ["summary", "matches"],
    properties: {
      summary: { type: "string" },
      matches: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["serviceId", "reason", "fit"],
          properties: {
            serviceId: { type: "string", enum: serviceIds },
            reason: { type: "string" },
            fit: { type: "string", enum: ["high", "medium"] },
          },
        },
      },
    },
  } as const;
}

/** Validates the model's JSON: drops unknown or duplicate services and caps the list. */
export function parseMatchResult(raw: unknown, validIds: ReadonlySet<string>): MatchResult | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const summary = typeof obj["summary"] === "string" ? obj["summary"].trim() : "";
  const list = Array.isArray(obj["matches"]) ? obj["matches"] : [];
  const seen = new Set<string>();
  const matches: ServiceMatch[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const m = item as Record<string, unknown>;
    const id = m["serviceId"];
    if (typeof id !== "string" || !validIds.has(id) || seen.has(id)) continue;
    seen.add(id);
    matches.push({
      serviceId: id,
      reason: typeof m["reason"] === "string" ? m["reason"].trim() : "",
      fit: m["fit"] === "high" ? "high" : "medium",
    });
    if (matches.length >= MAX_MATCHES) break;
  }
  return { summary, matches };
}
