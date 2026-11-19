import { describe, expect, it } from "vitest";
import { MAX_MATCHES, parseMatchResult } from "@/lib/marketplace/ai-match";

const valid = new Set(["a", "b", "c", "d", "e"]);

describe("AI service matching result", () => {
  it("drops services that are not in the catalog", () => {
    const r = parseMatchResult(
      {
        summary: "ok",
        matches: [
          { serviceId: "ghost", reason: "x", fit: "high" },
          { serviceId: "a", reason: "y", fit: "high" },
        ],
      },
      valid,
    );
    expect(r?.matches.map((m) => m.serviceId)).toEqual(["a"]);
  });

  it("removes duplicates and caps suggestions at four", () => {
    const ids = ["a", "a", "b", "c", "d", "e"];
    const r = parseMatchResult(
      { summary: "", matches: ids.map((serviceId) => ({ serviceId, reason: "", fit: "medium" })) },
      valid,
    );
    expect(MAX_MATCHES).toBe(4);
    expect(r?.matches.map((m) => m.serviceId)).toEqual(["a", "b", "c", "d"]);
  });

  it("rejects a non-object answer", () => {
    expect(parseMatchResult("nope", valid)).toBeNull();
  });
});
