"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DEFAULT_COOKIE_PREFERENCES,
  getStoredCookiePreferences,
  saveCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookieConsent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);

  useEffect(() => {
    const saved = getStoredCookiePreferences();
    setPreferences(saved);

    if (!window.localStorage.getItem("cookie-consent")) {
      const timer = window.setTimeout(() => setIsVisible(true), 1000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleSettingsClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('[data-cc="c-settings"]')) {
        return;
      }

      event.preventDefault();
      setPreferences(getStoredCookiePreferences());
      setShowDetails(true);
      setIsVisible(true);
    };

    document.addEventListener("click", handleSettingsClick);
    return () => document.removeEventListener("click", handleSettingsClick);
  }, []);

  const saveConsent = (nextPreferences: CookiePreferences, status: "accepted" | "declined") => {
    saveCookiePreferences(nextPreferences, status);
    setPreferences(nextPreferences);
    setIsVisible(false);
    setShowDetails(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted, "accepted");
  };

  const declineOptional = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(onlyNecessary, "declined");
  };

  const saveSelection = () => {
    saveConsent(preferences, preferences.analytics || preferences.marketing ? "accepted" : "declined");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[9990] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-ink/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            {!showDetails ? (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-ink">Wir respektieren Ihre Privatsphäre</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Website-Traffic zu analysieren und
                    personalisierte Inhalte bereitzustellen. Sie können selbst entscheiden, welche Kategorien Sie
                    zulassen möchten.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted"
                  >
                    Alle akzeptieren
                  </button>
                  <button
                    type="button"
                    onClick={declineOptional}
                    className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
                  >
                    Nur notwendige
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="rounded-full px-6 py-3 text-sm font-semibold text-violet transition-colors hover:bg-violet/5"
                  >
                    Einstellungen anpassen
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-ink">Cookie-Einstellungen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    Wählen Sie aus, welche Cookie-Kategorien Sie zulassen möchten. Notwendige Cookies bleiben immer
                    aktiv.
                  </p>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-ink/[0.03] p-4">
                    <div>
                      <p className="text-sm font-semibold text-ink">Notwendig</p>
                      <p className="mt-1 text-xs leading-relaxed text-mist">
                        Erforderlich für sichere Navigation, Login-Zustände und grundlegende Funktionen.
                      </p>
                    </div>
                    <span className="rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-teal">Immer aktiv</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-ink/[0.03] p-4">
                    <div>
                      <p className="text-sm font-semibold text-ink">Analyse</p>
                      <p className="mt-1 text-xs leading-relaxed text-mist">
                        Hilft uns dabei, die Nutzung der Website zu verstehen und Inhalte zu verbessern.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))}
                      className={`flex h-6 w-12 items-center rounded-full px-1 transition-colors ${
                        preferences.analytics ? "bg-violet" : "bg-ink/15"
                      }`}
                      aria-pressed={preferences.analytics}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          preferences.analytics ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-ink/[0.03] p-4">
                    <div>
                      <p className="text-sm font-semibold text-ink">Marketing</p>
                      <p className="mt-1 text-xs leading-relaxed text-mist">
                        Wird verwendet, um relevante Inhalte und Werbung zu zeigen.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))}
                      className={`flex h-6 w-12 items-center rounded-full px-1 transition-colors ${
                        preferences.marketing ? "bg-violet" : "bg-ink/15"
                      }`}
                      aria-pressed={preferences.marketing}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          preferences.marketing ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={saveSelection}
                    className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted"
                  >
                    Auswahl speichern
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
                  >
                    Alle akzeptieren
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDetails(false)}
                    className="rounded-full px-6 py-3 text-sm font-semibold text-mist transition-colors hover:text-ink"
                  >
                    Zurück
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 border-t border-ink/10 pt-4">
              <a href="/datenschutz" className="text-xs text-mist transition-colors hover:text-violet">
                Mehr in unserer Datenschutzerklärung
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
