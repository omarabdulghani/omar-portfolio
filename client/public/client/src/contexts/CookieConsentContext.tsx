import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  defaultCookieConsentPreferences,
  getStoredCookieConsent,
  saveCookieConsent,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent";
import { syncAnalyticsConsent, trackEvent, trackPageView } from "@/lib/analytics";
import {
  Check,
  ChevronRight,
  Cookie,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CookieConsentContextValue = {
  preferences: CookieConsentPreferences;
  hasStoredConsent: boolean;
  openSettings: () => void;
};

const CookieConsentContext = createContext<
  CookieConsentContextValue | undefined
>(undefined);

function getInitialConsentState() {
  const storedConsent = getStoredCookieConsent();

  return {
    hasStoredConsent: Boolean(storedConsent),
    preferences: storedConsent?.preferences ?? defaultCookieConsentPreferences,
  };
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const initialState = useMemo(() => getInitialConsentState(), []);
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(
    initialState.preferences
  );
  const [hasStoredConsent, setHasStoredConsent] = useState(
    initialState.hasStoredConsent
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(preferences.analytics);

  useEffect(() => {
    syncAnalyticsConsent(hasStoredConsent && preferences.analytics);
  }, [hasStoredConsent, preferences.analytics]);

  const applyPreferences = (
    nextPreferences: CookieConsentPreferences,
    source: "banner_accept" | "enable_all" | "reject_all" | "save_changes"
  ) => {
    saveCookieConsent(nextPreferences);
    setPreferences(nextPreferences);
    setDraftAnalytics(nextPreferences.analytics);
    setHasStoredConsent(true);
    syncAnalyticsConsent(nextPreferences.analytics);
    setIsSettingsOpen(false);

    if (nextPreferences.analytics) {
      trackEvent("cookie_preferences_saved", {
        source,
        analytics_enabled: true,
      });
      trackPageView();
    }
  };

  const openSettings = () => {
    setDraftAnalytics(preferences.analytics);
    setIsSettingsOpen(true);
  };

  const contextValue = useMemo(
    () => ({
      preferences,
      hasStoredConsent,
      openSettings,
    }),
    [hasStoredConsent, preferences]
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}

      {!hasStoredConsent && !isSettingsOpen ? (
        <div className="fixed inset-x-4 bottom-4 z-[130]">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/20 bg-background/88 shadow-[0_18px_80px_-30px_rgba(15,23,42,0.55)] backdrop-blur-2xl dark:border-white/10 dark:bg-background/86">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,120,216,0.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(75,120,216,0.08),transparent_38%)]" />
            <div className="relative flex flex-col gap-6 px-5 py-5 md:px-7 md:py-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Cookie className="h-3.5 w-3.5" />
                  Cookie Preferences
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground md:text-2xl">
                  This site uses necessary storage and optional analytics.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-[0.96rem]">
                  Necessary storage keeps your theme and privacy choices
                  available. If you agree, we will also activate privacy-focused
                  analytics to understand which pages and actions visitors find
                  most useful.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-foreground/15 bg-white/60 px-6 text-sm font-semibold hover:bg-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
                  onClick={openSettings}
                >
                  <Settings2 className="h-4 w-4" />
                  Cookie Settings
                </Button>
                <Button
                  className="h-12 rounded-full px-7 text-sm font-semibold shadow-[0_0_24px_-12px_rgba(75,120,216,0.7)]"
                  onClick={() =>
                    applyPreferences(
                      { necessary: true, analytics: true },
                      "banner_accept"
                    )
                  }
                >
                  <Check className="h-4 w-4" />
                  Yes, I agree
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent
          className="max-h-[90vh] max-w-[min(94vw,900px)] overflow-hidden rounded-[28px] border border-white/15 bg-background/94 p-0 shadow-[0_30px_100px_-40px_rgba(15,23,42,0.75)] backdrop-blur-2xl"
          showCloseButton={false}
        >
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,120,216,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(75,120,216,0.10),transparent_35%)]" />

            <div className="relative flex max-h-[90vh] flex-col">
              <div className="border-b border-border/50 px-6 py-6 md:px-8">
                <DialogHeader className="space-y-3 text-left">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Privacy Overview
                  </div>
                  <DialogTitle className="font-heading text-2xl md:text-3xl">
                    Cookie Settings
                  </DialogTitle>
                  <DialogDescription className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-[0.96rem]">
                    This website uses a small amount of browser storage so core
                    features continue to work, and it can optionally enable
                    privacy-focused analytics. We only activate analytics after you
                    opt in.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="overflow-y-auto px-6 py-6 md:px-8">
                <div className="space-y-5">
                  <section className="rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Strictly Necessary Cookies
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                          Strictly necessary storage keeps the website working and
                          remembers choices you explicitly make, such as your
                          cookie preferences and light or dark theme selection.
                          These items are always enabled, may be anonymized where
                          possible, and are not used to track your browsing across
                          other websites.
                        </p>
                      </div>
                      <div className="flex min-w-[104px] flex-col items-end gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          Always on
                        </span>
                        <Switch
                          checked
                          disabled
                          aria-label="Strictly necessary storage is always enabled"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          3rd Party Cookies
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                          When enabled, this site loads Umami Cloud to count
                          visitors, measure page views, understand important button
                          clicks, and see general device and location patterns. This
                          helps improve the website experience and understand which
                          sections visitors find most interesting and useful.
                        </p>
                      </div>
                      <div className="flex min-w-[104px] flex-col items-end gap-2">
                        <span
                          className={cn(
                            "text-xs font-semibold uppercase tracking-[0.16em]",
                            draftAnalytics ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {draftAnalytics ? "Enabled" : "Disabled"}
                        </span>
                        <Switch
                          checked={draftAnalytics}
                          onCheckedChange={setDraftAnalytics}
                          aria-label="Enable analytics and third-party measurement"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-3xl border border-dashed border-border/60 bg-card/40 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Cookie Policy
                    </h3>
                    <a
                      href="/cookie-policy"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                    >
                      More information about our Cookie Policy
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </section>
                </div>
              </div>

              <div className="border-t border-border/50 px-6 py-5 md:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    Privacy controls for GDPR compliance
                  </div>

                  <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        applyPreferences(
                          { necessary: true, analytics: true },
                          "enable_all"
                        )
                      }
                    >
                      Enable All
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        applyPreferences(
                          { necessary: true, analytics: false },
                          "reject_all"
                        )
                      }
                    >
                      Reject All
                    </Button>
                    <Button
                      type="button"
                      className="rounded-full"
                      onClick={() =>
                        applyPreferences(
                          { necessary: true, analytics: draftAnalytics },
                          "save_changes"
                        )
                      }
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return context;
}
