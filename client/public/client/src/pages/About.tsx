import { Fragment } from "react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PdfFlipbookLink } from "@/components/PdfFlipbookModal";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Blocks,
  Briefcase,
  CheckCircle2,
  Download,
  FlaskConical,
  Globe,
  GraduationCap,
  Palette,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";

function renderWithHighlights(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).filter(Boolean).map((part, index) => {
    const isHighlight = part.startsWith("**") && part.endsWith("**");

    if (!isHighlight) {
      return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
    }

    return (
      <strong
        key={`${part}-${index}`}
        className="rounded-sm bg-primary/10 px-1 font-semibold text-foreground"
      >
        {part.slice(2, -2)}
      </strong>
    );
  });
}

export default function About() {
  const { language, messages } = useLanguage();
  const isAr = language === "ar";
  const cvResumeHref = "/ATS_CV_Omar_Abdulghani_v3.pdf";
  const heroTitleParts = messages.about.hero.titlePrefix.trim().split(" ");
  const heroTitleLeading = heroTitleParts.slice(0, -1).join(" ");
  const heroTitleJoiner = heroTitleParts[heroTitleParts.length - 1] ?? "";

  const workflowSteps = [
    { icon: Search, ...messages.about.workflow.steps.understand },
    { icon: Palette, ...messages.about.workflow.steps.design },
    { icon: Blocks, ...messages.about.workflow.steps.prototype },
    { icon: FlaskConical, ...messages.about.workflow.steps.testIterate },
    { icon: Rocket, ...messages.about.workflow.steps.deliver },
  ];

  const focusItems = [
    { icon: Sparkles, ...messages.about.overview.focusItems.brandStrategy },
    { icon: Palette, ...messages.about.overview.focusItems.uxUiDesign },
    { icon: Blocks, ...messages.about.overview.focusItems.aiPrototyping },
  ];

  const highlightItems = [
    messages.about.overview.highlights.organizations,
    messages.about.overview.highlights.interactivePrototypes,
    messages.about.overview.highlights.crossCulturalCommunication,
    messages.about.overview.highlights.multilingualPerspective,
  ];

  const storySections = [
    {
      title: messages.about.story.sections.focusToday.title,
      paragraphs: [
        messages.about.story.sections.focusToday.paragraph1,
        messages.about.story.sections.focusToday.paragraph2,
      ],
    },

    {
      title: messages.about.story.sections.creativeBusinessClientWork.title,
      paragraphs: [
        messages.about.story.sections.creativeBusinessClientWork.paragraph1,
        messages.about.story.sections.creativeBusinessClientWork.paragraph2,
      ],
    },
    {
      title: messages.about.story.sections.technologyDesign.title,
      paragraphs: [
        messages.about.story.sections.technologyDesign.paragraph1,
        messages.about.story.sections.technologyDesign.paragraph2,
      ],
    },
    {
      title: messages.about.story.sections.background.title,
      paragraphs: [
        messages.about.story.sections.background.paragraph1,
        messages.about.story.sections.background.paragraph2,
      ],
    },

  ];

  return (
    <Layout>
      <div className="relative -mt-[64px] overflow-hidden pt-[64px] md:-mt-[80px] md:pt-[80px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_80%_16%,rgba(59,130,246,0.1),transparent_22%),radial-gradient(circle_at_84%_58%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_34%)]" />

      <section className="relative pt-8 pb-8 md:pt-10 md:pb-10">
        <div className="container relative z-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.05fr_0.95fr] xl:gap-10">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {messages.about.hero.badge}
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-heading font-bold tracking-tight sm:text-5xl md:text-4xl lg:text-6xl xl:text-7xl">
                  <span className="block">{heroTitleLeading}</span>
                  <span className="block">
                    {heroTitleJoiner} <span className="text-primary">{messages.about.hero.titleHighlight}</span>
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-base lg:text-xl lg:leading-8">
                  {renderWithHighlights(messages.about.hero.description)}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/portfolio"
                  onClick={() =>
                    trackEvent("cta_click", {
                      location: "about_hero",
                      label: "view_my_work",
                      destination: "/portfolio",
                    })
                  }
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "inline-flex h-auto items-center gap-2.5 whitespace-nowrap rounded-full bg-[#101826] px-9 py-3.5 text-[15px] font-medium text-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.68)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b1220]"
                  )}
                >
                  <span>{messages.about.hero.ctaViewWork}</span>
                  <ArrowRight size={17} className={isAr ? "rotate-180" : ""} />
                </a>
                <a
                  href={cvResumeHref}
                  download
                  onClick={() =>
                    trackEvent("cv_download", {
                      location: "about_hero",
                      label: "download_cv",
                    })
                  }
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "inline-flex h-auto items-center gap-2.5 whitespace-nowrap rounded-full border border-white/70 bg-white/95 px-9 py-3.5 text-[15px] font-medium text-foreground shadow-[0_18px_40px_-30px_rgba(148,163,184,0.52)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
                  )}
                >
                  <Download size={17} />
                  {messages.about.hero.ctaDownloadCv}
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[280px] md:max-w-[300px] lg:max-w-[380px]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl -z-10" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-[0_20px_70px_-45px_rgba(59,130,246,0.3)]">
                <img
                  src="/images/about-me.jpg"
                  alt="Omar Abdulghani"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 md:pb-8">
        <div className="container">
          <div className="grid items-center gap-5 xl:grid-cols-[230px_1fr]">
            <div className="px-2">
              <h2 className="text-3xl font-heading font-bold">
                {messages.about.workflow.title}
              </h2>
              <div className="mt-4 h-1 w-14 rounded-full bg-primary" />
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_22px_70px_-42px_rgba(59,130,246,0.38)] backdrop-blur-md transition-all hover:border-slate-300 dark:hover:border-white/20 xl:px-5 xl:py-4 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5 xl:items-start xl:gap-2.5">
                {workflowSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.title}
                      className="rounded-2xl px-2 py-2 min-w-0"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-primary/5 text-primary shadow-[0_8px_20px_-16px_rgba(59,130,246,0.5)] xl:h-9 xl:w-9">
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-semibold leading-tight text-foreground xl:text-[15px]">
                            {step.title}
                          </p>
                          <p className="mt-2 text-[12px] leading-snug text-muted-foreground [text-wrap:balance]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container">
          <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl font-heading font-bold">
                {messages.about.overview.focusTitle}
              </h2>
              <div className="grid gap-4 md:grid-cols-3 flex-1">
                {focusItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Card
                      key={item.title}
                      className="relative h-full flex flex-col rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardContent className="relative z-10 space-y-4 p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-slate-900 dark:text-white group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-bold">{item.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            {renderWithHighlights(item.description)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl font-heading font-bold">
                {messages.about.overview.highlightsTitle}
              </h2>
              <Card className="relative flex-1 flex flex-col rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative z-10 flex-1 flex flex-col justify-center space-y-4 p-6 md:p-8">
                  {highlightItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-base font-medium text-foreground"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container">
          <div className="mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {messages.about.story.title}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {storySections.map((section) => (
              <Card
                key={section.title}
                className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative z-10 p-6 md:p-8">
                  <h3 className="text-2xl font-heading font-bold">{section.title}</h3>
                  <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderWithHighlights(paragraph)}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-heading font-bold">
              {messages.about.sections.educationExperience}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative z-10 p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    {messages.about.education.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title: messages.about.education.item1.title,
                      school: messages.about.education.item1.school,
                      description: messages.about.education.item1.description,
                      year: "2021 — 2025",
                      logos: [
                        "/images/inholland logo.jpg",
                        "/images/rotterdam business school logo.png"
                      ],
                    },
                    {
                      title: messages.about.education.item2.title,
                      school: messages.about.education.item2.school,
                      description: messages.about.education.item2.description,
                      year: "2018 — 2020",
                      logos: [
                        "/images/inholland logo.jpg"
                      ],
                    },
                    {
                      title: messages.about.education.item3.title,
                      school: messages.about.education.item3.school,
                      description: messages.about.education.item3.description,
                      year: "2017 — 2018",
                      logos: [],
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.05)]"
                    >
                      <div className="flex gap-4">
                        {item.logos && item.logos.length > 0 && (
                          <div className="mt-1 flex shrink-0 flex-col gap-2">
                            {item.logos.map((logo, i) => (
                              <div
                                key={i}
                                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md bg-white p-1 shadow-sm"
                              >
                                <img
                                  src={logo}
                                  alt="University Logo"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <h4 className="text-xl font-semibold">{item.title}</h4>
                            <Badge variant="secondary">{item.year}</Badge>
                          </div>
                          <p className="mt-2 font-medium text-primary">{item.school}</p>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative z-10 p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    {messages.about.experience.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title: messages.about.experience.item1.title,
                      company: messages.about.experience.item1.company,
                      description: messages.about.experience.item1.description,
                      year: "2024",
                    },
                    {
                      title: messages.about.experience.item2.title,
                      company: messages.about.experience.item2.company,
                      description: messages.about.experience.item2.description,
                      year: "2019 — 2024",
                    },
                    {
                      title: messages.about.experience.item3.title,
                      company: messages.about.experience.item3.company,
                      description: messages.about.experience.item3.description,
                      year: "2014 — 2019",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.05)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="text-xl font-semibold">{item.title}</h4>
                        <Badge variant="secondary">{item.year}</Badge>
                      </div>
                      <p className="mt-2 font-medium text-primary">{item.company}</p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground">
              <Globe size={14} />
              {messages.about.languages.badge}
            </div>
            <h2 className="mt-5 text-3xl font-heading font-bold">
              {messages.about.languages.title}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                initials: "AR",
                name: messages.about.languages.arabic.name,
                level: messages.about.languages.arabic.level,
              },
              {
                initials: "EN",
                name: messages.about.languages.english.name,
                level: messages.about.languages.english.level,
              },
              {
                initials: "NL",
                name: messages.about.languages.dutch.name,
                level: messages.about.languages.dutch.level,
              },
            ].map((language) => (
              <Card
                key={language.initials}
                className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative z-10 flex items-center gap-4 p-6 md:p-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-slate-900 dark:text-white group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                    {language.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{language.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {language.level}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </div>
    </Layout>
  );
}
