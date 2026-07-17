import { Link } from "wouter";
import { ArrowRight, Download, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useProjects } from "@/hooks/useProjects";

export default function Home() {
  const { language, messages } = useLanguage();
  const cvResumeHref =
    language === "nl"
      ? "/Omar%20Abdulghani%20-%20CV%20Resume%20%28Dutch%29.pdf"
      : "/Omar%20Abdulghani%20-%20CV%20Resume%20%28English%29.pdf";
  const heroPortraitVideoSrc = "/hero-video-1.mp4";
  const [isMobileHeroVideoLoaded, setIsMobileHeroVideoLoaded] = useState(false);
  const [isDesktopHeroVideoLoaded, setIsDesktopHeroVideoLoaded] = useState(false);
  const [hasMobileHeroVideoError, setHasMobileHeroVideoError] = useState(false);
  const [hasDesktopHeroVideoError, setHasDesktopHeroVideoError] = useState(false);

  useEffect(() => {
    const failSafeTimer = window.setTimeout(() => {
      setIsMobileHeroVideoLoaded(true);
      setIsDesktopHeroVideoLoaded(true);
    }, 8000);

    return () => window.clearTimeout(failSafeTimer);
  }, []);

  const allProjects = useProjects();
  const featuredIds = ["job-scout", "moonlit-firefly-bloom", "patronapp"];
  const featuredProjects = featuredIds
    .map(id => allProjects.find(p => p.id === id))
    .filter(Boolean);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-[64px] md:-mt-[80px] pt-[calc(4rem+64px)] md:pt-[calc(5rem+80px)] pb-16 md:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100 dark:hidden"
            style={{ backgroundImage: "url('/images/light-mode-bg-hero 2.png')" }}
          />
          <div className="absolute inset-0 hidden dark:block bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-10 dark:opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-10 dark:opacity-100" />
        </div>

        <div className="container relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/10 border border-foreground/20 text-foreground/90 dark:bg-white/10 dark:border-white/20 dark:text-white text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/80 dark:bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground dark:bg-white"></span>
              </span>
              {messages.hero.available}
            </div>

            <div className="mt-6 md:mt-0">
            <div className="relative md:block">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-bold leading-tight tracking-tight pr-[104px] sm:pr-[132px] md:pr-[200px] lg:pr-[230px] xl:pr-0">
                {messages.hero.title} <br />
                <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/60">
                  {messages.hero.name}
                </span>
              </h1>
              <div className="absolute -top-12 sm:top-1 md:-top-8 lg:-top-10 right-0 md:right-2 lg:right-0 xl:hidden w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px] lg:max-xl:w-[355px] lg:max-xl:h-[355px] rounded-full overflow-hidden border border-white/20">
                {!isMobileHeroVideoLoaded && !hasMobileHeroVideoError && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                    <div className="relative h-7 w-7 sm:h-8 sm:w-8">
                      <span className="absolute inset-0 rounded-full border border-primary/30" />
                      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
                    </div>
                    <span className="mt-1 text-[10px] sm:text-[11px] font-medium tracking-wide text-primary/90">
                      Loading
                    </span>
                  </div>
                )}
                {hasMobileHeroVideoError && (
                  <img
                    src="/images/CV%20Resume.png"
                    alt="Omar Abdulghani"
                    className="absolute inset-0 z-10 w-full h-full object-cover object-top"
                  />
                )}
                <video
                  src={heroPortraitVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(event) => {
                    setIsMobileHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onLoadedData={(event) => {
                    setIsMobileHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onCanPlay={(event) => {
                    setIsMobileHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onCanPlayThrough={(event) => {
                    setIsMobileHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onError={() => {
                    setHasMobileHeroVideoError(true);
                    setIsMobileHeroVideoLoaded(true);
                  }}
                  className={`w-full h-full object-cover scale-[1.14] transition-opacity duration-500 ${
                    isMobileHeroVideoLoaded && !hasMobileHeroVideoError ? "opacity-90" : "opacity-0"
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 z-[6] rounded-full dark:hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_44%,rgba(255,255,255,0.06)_66%,rgba(255,255,255,0.14)_84%,rgba(255,255,255,0.22)_100%)]" />
                <div className="pointer-events-none absolute inset-0 z-[6] hidden rounded-full dark:block bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_44%,rgba(0,0,0,0.10)_66%,rgba(0,0,0,0.20)_84%,rgba(0,0,0,0.32)_100%)]" />
              </div>
            </div>
            
            <p className="mt-4 md:mt-0 text-xl md:text-2xl text-black dark:text-muted-foreground max-w-xl text-balance leading-relaxed">
              <span className="text-primary font-semibold">{messages.hero.subtitleRole}</span>{" "}
              {messages.hero.subtitleRest}{" "}
              <span className="whitespace-nowrap">{messages.hero.subtitleEnding}</span>
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8 md:mt-12">
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="flex items-center justify-center gap-2 rounded-full px-8 text-base h-14 shadow-[0_0_20px_-5px_rgba(75,120,216,0.3)] hover:shadow-[0_0_30px_-5px_rgba(75,120,216,0.5)] transition-all duration-300"
                  onClick={() => trackEvent("cta_click", { location: "home_hero", label: "view_my_work", destination: "/portfolio" })}
                >
                  {messages.hero.ctaViewWork} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-lg h-14 bg-foreground/5 border-foreground/15 text-foreground hover:bg-foreground/10 dark:bg-transparent dark:border-white/10 dark:hover:bg-white/5"
                  onClick={() => trackEvent("cta_click", { location: "home_hero", label: "contact_me", destination: "/contact" })}
                >
                  {messages.hero.ctaContact}
                </Button>
              </Link>
            </div>
            </div>
          </div>

          <div className="relative hidden xl:block animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Abstract decorative elements behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="absolute inset-0 border border-primary/20 rounded-full -rotate-6 scale-105" />
              
              {/* Photo Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                {!isDesktopHeroVideoLoaded && !hasDesktopHeroVideoError && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                    <div className="relative h-10 w-10">
                      <span className="absolute inset-0 rounded-full border border-primary/30" />
                      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
                    </div>
                    <span className="mt-2 text-xs font-medium tracking-wide text-primary/90">
                      Loading video
                    </span>
                  </div>
                )}
                {hasDesktopHeroVideoError && (
                  <img
                    src="/images/CV%20Resume.png"
                    alt="Omar Abdulghani"
                    className="absolute inset-0 z-10 w-full h-full object-cover object-top"
                  />
                )}
                <video
                  src={heroPortraitVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(event) => {
                    setIsDesktopHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onLoadedData={(event) => {
                    setIsDesktopHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onCanPlay={(event) => {
                    setIsDesktopHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onCanPlayThrough={(event) => {
                    setIsDesktopHeroVideoLoaded(true);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onError={() => {
                    setHasDesktopHeroVideoError(true);
                    setIsDesktopHeroVideoLoaded(true);
                  }}
                  className={`w-full h-full object-cover scale-[1.14] transition-opacity duration-500 ${
                    isDesktopHeroVideoLoaded && !hasDesktopHeroVideoError ? "opacity-90" : "opacity-0"
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 z-[6] rounded-full dark:hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_44%,rgba(255,255,255,0.06)_66%,rgba(255,255,255,0.14)_84%,rgba(255,255,255,0.22)_100%)]" />
                <div className="pointer-events-none absolute inset-0 z-[6] hidden rounded-full dark:block bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_44%,rgba(0,0,0,0.10)_66%,rgba(0,0,0,0.20)_84%,rgba(0,0,0,0.32)_100%)]" />
              </div>
      <section className="py-20 bg-[#faf9fc] dark:bg-white/[0.02]">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">{messages.sections.whatIDo}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold leading-tight [text-wrap:balance] mb-2">{messages.cards.conceptDevelopment.title}</h3>
              <p className="text-black dark:text-muted-foreground">{messages.cards.conceptDevelopment.body}</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h3 className="text-xl font-bold leading-tight [text-wrap:balance] mb-2">{messages.cards.uxUi.title}</h3>
              <p className="text-black dark:text-muted-foreground">{messages.cards.uxUi.body}</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              </div>
              <h3 className="text-xl font-bold leading-tight [text-wrap:balance] mb-2">{messages.cards.creativeTechnology.title}</h3>
              <p className="text-black dark:text-muted-foreground">{messages.cards.creativeTechnology.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{messages.sections.featuredProjects}</h2>
              <p className="text-muted-foreground max-w-xl md:max-w-none">
                {messages.sections.featuredProjectsDescription}
              </p>
            </div>
            <Link href="/portfolio">
              <Button
                variant="ghost"
                className="group"
                onClick={() => trackEvent("cta_click", { location: "home_featured_projects", label: "view_all_projects", destination: "/portfolio" })}
              >
                {messages.sections.viewAllProjects} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                analyticsContext="home_featured_projects"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute inset-0 bg-[url('/images/abstract-texture.png')] opacity-20 mix-blend-overlay" />
        
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{messages.sections.ctaTitle}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {messages.sections.ctaBody}
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full px-10 py-8 text-xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
              onClick={() => trackEvent("cta_click", { location: "home_cta_section", label: "lets_work_together", destination: "/contact" })}
            >
              {messages.sections.ctaButton}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

