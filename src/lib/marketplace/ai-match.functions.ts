import { createServerFn } from "@tanstack/react-start";
import { MATCH_QUERY_MAX, MATCH_QUERY_MIN } from "./ai-match";
import { matchServicesForNeed } from "./ai-match.server";

/** Public: customers describe a need and get matching catalog services (public data only). */
export const matchServices = createServerFn({ method: "POST" })
  .inputValidator((input: { need: string }) => {
    const need = typeof input?.need === "string" ? input.need.trim() : "";
    if (need.length < MATCH_QUERY_MIN || need.length > MATCH_QUERY_MAX) {
      throw new Error(`الوصف يجب أن يكون بين ${MATCH_QUERY_MIN} و${MATCH_QUERY_MAX} حرفاً.`);
    }
    return { need };
  })
  .handler(async ({ data }) => matchServicesForNeed(data.need));
