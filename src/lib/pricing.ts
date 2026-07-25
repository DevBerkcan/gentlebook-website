/** Zentrale monatliche Listenpreise in Euro. */
export const pricing = {
  trial: { monthly: 0 },
  starter: { monthly: 29 },
  professional: { monthly: 59 },
  business: { monthly: 99 },
} as const;

export type PlanId = keyof typeof pricing;
