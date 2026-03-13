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

function runWhenAnalyticsReady(callback: () => void) {
  if (typeof window === "undefined") return;

  if (typeof window.umami?.track === "function") {
    callback();
    return;
  }

  pendingCalls.push(callback);
}

export function flushAnalyticsQueue() {
  if (typeof window === "undefined") return;

  while (pendingCalls.length > 0) {
    const callback = pendingCalls.shift();
    callback?.();
  }
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
