/** Zentrale monatliche Listenpreise in Euro. */
export const pricing = {
  trial: { monthly: 0 },
  starter: { monthly: 29 },
  professional: { monthly: 59 },
  business: { monthly: 99 },
} as const;

export type PlanId = keyof typeof pricing;

/** Rabatt bei jährlicher statt monatlicher Zahlung. */
export const YEARLY_DISCOUNT = 0.2;

/** Effektiver Monatspreis bei jährlicher Zahlung (0 € bleibt 0 €, z. B. Trial). */
export function yearlyPerMonth(id: PlanId) {
  return Math.round(pricing[id].monthly * (1 - YEARLY_DISCOUNT));
}
