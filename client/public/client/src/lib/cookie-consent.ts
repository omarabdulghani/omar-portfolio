export type CookieConsentPreferences = {
  necessary: true;
  analytics: boolean;
};

type StoredCookieConsent = {
  version: 1;
  updatedAt: string;
  preferences: CookieConsentPreferences;
};

const COOKIE_CONSENT_STORAGE_KEY = "portfolio_cookie_consent";

export const defaultCookieConsentPreferences: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
};

export function getStoredCookieConsent(): StoredCookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as Partial<StoredCookieConsent>;
    const preferences = parsed.preferences;

    if (
      parsed.version !== 1 ||
      !preferences ||
      preferences.necessary !== true ||
      typeof preferences.analytics !== "boolean"
    ) {
      return null;
    }

    return {
      version: 1,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
      preferences: {
        necessary: true,
        analytics: preferences.analytics,
      },
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(preferences: CookieConsentPreferences) {
  if (typeof window === "undefined") return;

  const payload: StoredCookieConsent = {
    version: 1,
    updatedAt: new Date().toISOString(),
    preferences: {
      necessary: true,
      analytics: preferences.analytics,
    },
  };

  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(payload)
  );
}

export function hasAnalyticsConsent() {
  return getStoredCookieConsent()?.preferences.analytics === true;
}
