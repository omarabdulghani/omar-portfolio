import { hasAnalyticsConsent } from "./cookie-consent";

type AnalyticsValue = string | number | boolean | null;

export type AnalyticsData = Record<string, AnalyticsValue>;

type UmamiTrack = {
  (): void;
  (payload: object): void;
  (eventName: string, data?: AnalyticsData): void;
};

declare global {
  interface Window {
    umami?: {
      track: UmamiTrack;
    };
  }
}

const pendingCalls: Array<() => void> = [];
const analyticsScriptUrl = import.meta.env.VITE_ANALYTICS_SCRIPT_URL;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
let analyticsScriptPromise: Promise<void> | null = null;

function isAnalyticsReady() {
  return (
    typeof window !== "undefined" && typeof window.umami?.track === "function"
  );
}

function isAnalyticsConfigured() {
  return Boolean(analyticsScriptUrl && analyticsWebsiteId);
}

function clearAnalyticsQueue() {
  pendingCalls.length = 0;
}

function ensureAnalyticsScriptLoaded() {
  if (
    typeof window === "undefined" ||
    !isAnalyticsConfigured() ||
    !hasAnalyticsConsent()
  ) {
    return;
  }

  if (isAnalyticsReady()) {
    flushAnalyticsQueue();
    return;
  }

  if (analyticsScriptPromise) return;

  const selector = `script[data-website-id="${analyticsWebsiteId}"]`;
  const existingScript =
    document.querySelector<HTMLScriptElement>(selector);

  analyticsScriptPromise = new Promise((resolve) => {
    if (existingScript) {
      existingScript.addEventListener(
        "load",
        () => {
          flushAnalyticsQueue();
          resolve();
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.src = analyticsScriptUrl;
    script.setAttribute("data-website-id", analyticsWebsiteId);
    script.setAttribute("data-auto-track", "false");
    script.setAttribute("data-do-not-track", "true");
    script.addEventListener(
      "load",
      () => {
        flushAnalyticsQueue();
        resolve();
      },
      { once: true }
    );
    script.addEventListener(
      "error",
      () => {
        analyticsScriptPromise = null;
        clearAnalyticsQueue();
        resolve();
      },
      { once: true }
    );
    document.head.appendChild(script);
  });
}

function runWhenAnalyticsReady(callback: () => void) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  if (isAnalyticsReady()) {
    callback();
    return;
  }

  pendingCalls.push(callback);
  ensureAnalyticsScriptLoaded();
}

export function flushAnalyticsQueue() {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) {
    clearAnalyticsQueue();
    return;
  }

  while (pendingCalls.length > 0) {
    const callback = pendingCalls.shift();
    callback?.();
  }
}

export function syncAnalyticsConsent(enabled: boolean) {
  if (typeof window === "undefined") return;

  if (!enabled) {
    window.localStorage.setItem("umami.disabled", "1");
    clearAnalyticsQueue();
    return;
  }

  window.localStorage.removeItem("umami.disabled");
  ensureAnalyticsScriptLoaded();
}

export function trackPageView() {
  runWhenAnalyticsReady(() => {
    window.umami?.track();
  });
}

export function trackEvent(eventName: string, data?: AnalyticsData) {
  runWhenAnalyticsReady(() => {
    if (data && Object.keys(data).length > 0) {
      window.umami?.track(eventName, data);
      return;
    }

    window.umami?.track(eventName);
  });
}
