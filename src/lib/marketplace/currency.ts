import type { CountryCode, CurrencyCode } from "./types";

/** Gulf currencies supported by the platform. SAR is the launch default. */
export const DEFAULT_CURRENCY: CurrencyCode = "SAR";

export const CURRENCIES: Record<CurrencyCode, { symbol: string; name: string; decimals: number }> =
  {
    SAR: { symbol: "ر.س", name: "ريال سعودي", decimals: 0 },
    AED: { symbol: "د.إ", name: "درهم إماراتي", decimals: 0 },
    KWD: { symbol: "د.ك", name: "دينار كويتي", decimals: 3 },
    QAR: { symbol: "ر.ق", name: "ريال قطري", decimals: 0 },
  };

export const COUNTRIES: Record<CountryCode, { name: string; currency: CurrencyCode }> = {
  SA: { name: "السعودية", currency: "SAR" },
  AE: { name: "الإمارات", currency: "AED" },
  KW: { name: "الكويت", currency: "KWD" },
  QA: { name: "قطر", currency: "QAR" },
};

/** Formats an amount with Latin digits and the Arabic currency symbol, e.g. "1,250 ر.س". */
export function formatPrice(amount: number, currency: CurrencyCode = DEFAULT_CURRENCY): string {
  const { symbol, decimals } = CURRENCIES[currency];
  const value = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals === 0 ? 0 : decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
  return `${value} ${symbol}`;
}

/** Demo commission rate taken by the platform on each completed order (placeholder, not live). */
export const DEMO_COMMISSION_RATE = 0.15;

export function splitOrderAmount(amount: number, rate: number = DEMO_COMMISSION_RATE) {
  const commission = Math.round(amount * rate * 100) / 100;
  return { commission, providerNet: Math.round((amount - commission) * 100) / 100 };
}
