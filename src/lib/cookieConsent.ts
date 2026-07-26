export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CONSENT_STORAGE_KEY = "cookie-consent";
const PREFERENCES_STORAGE_KEY = "cookie-preferences";

export function getStoredCookiePreferences(): CookiePreferences {
  if (typeof window === "undefined") {
    return DEFAULT_COOKIE_PREFERENCES;
  }

  try {
    const saved = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!saved) {
      return DEFAULT_COOKIE_PREFERENCES;
    }

    const parsed = JSON.parse(saved) as Partial<CookiePreferences>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return DEFAULT_COOKIE_PREFERENCES;
  }
}

export function saveCookiePreferences(preferences: CookiePreferences, status: "accepted" | "declined") {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedPreferences: CookiePreferences = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
  };

  window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(normalizedPreferences));
  window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  window.dispatchEvent(new Event("cookie-consent-updated"));

  if (status === "accepted") {
    window.dispatchEvent(new Event("cookie-consent-given"));
  }
}

export function hasCookieConsent(category: "analytics" | "marketing") {
  const preferences = getStoredCookiePreferences();
  return preferences[category];
}

export function hasCookieConsentDecision() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
}
