/**
 * Zentrale Tracking-Fassade.
 *
 * WICHTIG: Es ist aktuell KEIN Analytics-Anbieter angebunden und es wird KEIN
 * Consent-Banner geladen. `trackEvent` schreibt im Dev-Modus nur in die Konsole
 * und ist sonst ein No-op. Erst NACH Einbindung einer Consent-Lösung (z. B. Klaro,
 * Cookiebot) hier den echten Provider-Call ergänzen (Plausible, Matomo, GA4 …) —
 * und zwar nur, nachdem Consent erteilt wurde (bzw. für cookie-freie Tools wie
 * Plausible entsprechend der eigenen Datenschutzprüfung).
 *
 * Event-Katalog (Namen bewusst stabil halten, damit spätere Dashboards/Funnels
 * nicht brechen):
 * - cta_trial_clicked
 * - cta_demo_clicked
 * - pricing_viewed
 * - faq_opened
 * - industry_selected
 * - booking_demo_started
 * - booking_demo_completed
 * - signup_started
 * - signup_completed
 * - lead_form_started
 * - lead_form_completed
 */

export type TrackedEvent =
  | "cta_trial_clicked"
  | "cta_demo_clicked"
  | "pricing_viewed"
  | "faq_opened"
  | "industry_selected"
  | "booking_demo_started"
  | "booking_demo_completed"
  | "signup_started"
  | "signup_completed"
  | "lead_form_started"
  | "lead_form_completed";

export function trackEvent(event: TrackedEvent, payload?: Record<string, string | number | boolean>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload ?? {});
  }
  // TODO: Sobald eine Consent-Lösung eingebunden ist, hier den echten Provider
  // aufrufen, z. B.:
  // if (hasConsent("analytics")) window.plausible?.(event, { props: payload });
}
