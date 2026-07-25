/**
 * ─────────────────────────────────────────────────────────────
 *  PREISE — PLATZHALTER / TBD
 *  Zahlen stammen aus dem bestehenden Audit-Report und sind
 *  hier ZENTRAL austauschbar. Nur diese Datei anpassen —
 *  Layout & Uebersetzungen ziehen die Werte automatisch.
 * ─────────────────────────────────────────────────────────────
 */
export const YEARLY_DISCOUNT = 0.2; // 20 % Rabatt bei jaehrlicher Zahlung

export const pricing = {
  starter: { monthly: 29 },
  professional: { monthly: 59 },
  business: { monthly: 99 },
} as const;

export type PlanId = keyof typeof pricing;

export function yearlyPerMonth(id: PlanId) {
  return Math.round(pricing[id].monthly * (1 - YEARLY_DISCOUNT));
}
