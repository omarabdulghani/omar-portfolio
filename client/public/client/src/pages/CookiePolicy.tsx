import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ToggleRight, Database, ExternalLink } from "lucide-react";

const lastUpdated = "March 13, 2026";

const storageItems = [
  {
    name: "portfolio_cookie_consent",
    category: "Strictly necessary",
    provider: "First-party",
    technology: "localStorage",
    purpose:
      "Stores whether you accepted or rejected optional analytics, so the website can respect your privacy choice on later visits.",
    duration: "Persistent until changed or cleared in your browser",
    consent: "No",
  },
  {
    name: "portfolio_theme_choice",
    category: "Strictly necessary / preference",
    provider: "First-party",
    technology: "localStorage",
    purpose:
      "Stores your light or dark theme preference when you manually switch the theme.",
    duration: "Persistent until changed or cleared in your browser",
    consent: "No",
  },
  {
    name: "Umami analytics",
    category: "Optional analytics",
    provider: "Umami Cloud",
    technology: "Third-party analytics script",
    purpose:
      "Measures page views, referrers, device information, countries, and custom events such as important CTA clicks after you opt in.",
    duration: "Active only after consent; retention is managed by Umami Cloud",
    consent: "Yes",
  },
];

export default function CookiePolicy() {
  return (
    <Layout>
      <section className="relative overflow-hidden pt-20 pb-12 md:pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(75,120,216,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(75,120,216,0.10),transparent_34%)]" />

        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Cookie Policy
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.8fr)] lg:items-start">
              <div>
                <h1 className="text-4xl font-heading font-bold tracking-tight md:text-6xl">
                  Clear information about the storage and analytics used on this website.
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  This Cookie Policy explains what this portfolio stores in your browser,
                  what is essential for the website to work, and what only becomes active
                  if you choose to enable analytics.
                </p>
              </div>

              <Card className="border-white/10 bg-card/70 shadow-xl backdrop-blur-sm">
                <CardContent className="space-y-4 p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                      Last updated
                    </p>
                    <p className="mt-2 text-lg font-semibold">{lastUpdated}</p>
                  </div>
                  <div className="h-px bg-border/60" />
                  <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                    <p>
                      Controller: Omar Abdulghani
                    </p>
                    <p>
                      Website: omarabdulghani.com
                    </p>
                    <p>
                      Contact:{" "}
                      <a
                        href="mailto:omarabdulgh@gmail.com"
                        className="font-medium text-primary hover:text-primary/80"
                      >
                        omarabdulgh@gmail.com
                      </a>
                    </p>
                    <p>
                      Location: Amstelveen, Netherlands
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="border-white/10 bg-card/65">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-heading font-bold">Necessary storage</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  We store your theme preference and your cookie choice so the website
                  behaves consistently and respects your settings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-card/65">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <ToggleRight className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-heading font-bold">Optional analytics</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Analytics only starts after you click “Yes, I agree” or enable it in
                  Cookie Settings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-card/65">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-heading font-bold">No ad tracking</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  This website does not currently use advertising cookies, remarketing
                  pixels, or social media tracking scripts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="mx-auto max-w-5xl space-y-8">
            <Card className="border-white/10 bg-card/70">
              <CardContent className="p-6 md:p-8">
                <div className="max-w-3xl">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    Overview
                  </Badge>
                  <h2 className="text-2xl font-heading font-bold md:text-3xl">
                    What this policy covers
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                    <p>
                      In this context, the word “cookies” is used broadly to describe
                      browser storage and similar tracking technologies. On this website,
                      the core items currently used are first-party local storage keys for
                      your preferences and an optional analytics integration with Umami
                      Cloud.
                    </p>
                    <p>
                      Although Umami is designed as a privacy-focused analytics service and
                      does not use cookies in its tracking code, this website still asks for
                      your consent before enabling it because it is an optional third-party
                      measurement service rather than a strictly necessary website function.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-card/70">
              <CardContent className="p-0">
                <div className="border-b border-border/60 px-6 py-5 md:px-8">
                  <h2 className="text-2xl font-heading font-bold md:text-3xl">
                    Storage and analytics used on this website
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                    The table below describes the browser storage and analytics tools that
                    are relevant to this portfolio as it is currently built.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-secondary/35 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 font-medium md:px-8">Name / Service</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Provider</th>
                        <th className="px-6 py-4 font-medium">Technology</th>
                        <th className="px-6 py-4 font-medium">Purpose</th>
                        <th className="px-6 py-4 font-medium">Duration</th>
                        <th className="px-6 py-4 font-medium md:px-8">Consent required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storageItems.map((item) => (
                        <tr
                          key={item.name}
                          className="border-t border-border/50 align-top text-muted-foreground"
                        >
                          <td className="px-6 py-5 font-medium text-foreground md:px-8">
                            {item.name}
                          </td>
                          <td className="px-6 py-5">{item.category}</td>
                          <td className="px-6 py-5">{item.provider}</td>
                          <td className="px-6 py-5">{item.technology}</td>
                          <td className="min-w-[280px] px-6 py-5 leading-6">
                            {item.purpose}
                          </td>
                          <td className="min-w-[220px] px-6 py-5 leading-6">
                            {item.duration}
                          </td>
                          <td className="px-6 py-5 md:px-8">{item.consent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="border-white/10 bg-card/70">
                <CardContent className="p-6 md:p-8">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    Necessary
                  </Badge>
                  <h2 className="text-2xl font-heading font-bold">Strictly necessary storage</h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                    <p>
                      This website uses a small amount of first-party browser storage to
                      remember choices you make. The two relevant items are:
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">portfolio_cookie_consent</span>:
                      stores whether you accepted or rejected optional analytics.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">portfolio_theme_choice</span>:
                      stores your selected light or dark theme after you change it manually.
                    </p>
                    <p>
                      These items are part of the website’s own functionality and are not
                      used for advertising or cross-site tracking.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-card/70">
                <CardContent className="p-6 md:p-8">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    Optional
                  </Badge>
                  <h2 className="text-2xl font-heading font-bold">Analytics after consent</h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                    <p>
                      If you enable analytics, this website loads Umami Cloud. Based on the
                      current implementation, it is used to measure:
                    </p>
                    <p>
                      page views, route visits, referrers, device/browser information,
                      countries, and important interaction events such as CV downloads,
                      navigation clicks, project opens, contact actions, and CTA clicks.
                    </p>
                    <p>
                      Analytics stays disabled until you explicitly agree. If you reject it,
                      Umami does not load and no analytics events are sent from the site.
                    </p>
                    <p>
                      This website does not currently use analytics for advertising,
                      profiling, retargeting, or cross-site behavioral tracking.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <Card className="border-white/10 bg-card/70">
                <CardContent className="p-6 md:p-8">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    Manage choices
                  </Badge>
                  <h2 className="text-2xl font-heading font-bold">How to change your preferences</h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                    <p>
                      You can manage your analytics preference through the Cookie Settings
                      controls available on the website. The settings panel allows you to:
                    </p>
                    <p>
                      enable analytics, reject analytics, or save your current preference.
                    </p>
                    <p>
                      If you change your mind later, open Cookie Settings again from the
                      footer and update your choice.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-card/70">
                <CardContent className="p-6 md:p-8">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    Contact
                  </Badge>
                  <h2 className="text-2xl font-heading font-bold">Questions?</h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                    <p>
                      If you have questions about this Cookie Policy or about how this
                      portfolio uses browser storage and optional analytics, you can contact:
                    </p>
                    <a
                      href="mailto:omarabdulgh@gmail.com"
                      className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80"
                    >
                      omarabdulgh@gmail.com
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-white/10 bg-card/70">
              <CardContent className="p-6 md:p-8">
                <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                  Updates
                </Badge>
                <h2 className="text-2xl font-heading font-bold">Changes to this policy</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                  This policy may be updated if the website introduces new storage
                  technologies, new third-party services, or changes the way analytics is
                  handled. The date at the top of this page will be updated whenever a
                  material change is made.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
