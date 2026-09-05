/** Zentrale Listenpreise in Euro. Jahrespreise werden einmal jährlich abgerechnet. */
export const pricing = {
  trial: { monthly: 0, annual: 0 },
  starter: { monthly: 29, annual: 278 },
  professional: { monthly: 59, annual: 566 },
  business: { monthly: 99, annual: 950 },
} as const;

export type PlanId = keyof typeof pricing;
