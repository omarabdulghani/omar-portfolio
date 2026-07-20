import { Link } from "wouter";
import { ArrowRight, Download, ExternalLink, ChevronRight, ChevronLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { useEffect, useState, useRef } from "react";
import { useProjects } from "@/hooks/useProjects";
export default function Home() {
  const { language, messages } = useLanguage();
  const cvResumeHref =
    language === "nl"
      ? "/ATS_CV_Omar_Abdulghani_NL_v2.pdf"
      : "/ATS_CV_Omar_Abdulghani_v2.pdf";

  const allProjects = useProjects();

  const featuredIds = ["job-scout", "moonlit-firefly-bloom", "patronapp"];
  const featuredProjects = featuredIds
    .map(id => allProjects.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const heroSlides = featuredIds
    .map(id => {
      const p = allProjects.find(proj => proj.id === id);
      if (!p) return null;
      
      const isPatronApp = p.id === "patronapp";
      
      return {
        id: p.id,
        title: p.title,
        category: p.category,
        type: isPatronApp ? ("video" as const) : ("image" as const),
        src: isPatronApp ? "/images/patronapp gallery/PatronApp Promo 1.mp4" : p.image, 
        link: `/portfolio/${p.id}`
      };
    })
    .filter((slide): slide is NonNullable<typeof slide> => Boolean(slide));

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 5000;
  const UPDATE_INTERVAL = 50;

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(() => { });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % heroSlides.length);
          return 0;
        }
        return prev + (UPDATE_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((current) => (current + 1) % heroSlides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  };

  const togglePause = () => setIsPaused(!isPaused);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-[64px] md:-mt-[80px] pt-[calc(4rem+64px)] md:pt-[calc(5rem+80px)] pb-16 md:pb-32">

        {/* Full-Width Background Slideshow */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-slate-950">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {slide.type === 'video' ? (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover scale-[1.02]"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover scale-[1.02]"
                />
              )}
            </div>
          ))}
          {/* Legibility Overlay Mask */}
          <div className="absolute inset-0 z-20 bg-slate-950/85 md:bg-transparent md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/80 md:to-transparent" />
        </div>

        <div className="container relative z-30 grid grid-cols-1 md:w-2/3 lg:w-1/2 gap-12 items-center mr-auto">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-900 dark:bg-white/10 dark:border-white/20 dark:text-white text-sm font-medium backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 dark:bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900 dark:bg-white"></span>
              </span>
              {messages.hero.available}
            </div>

            <div className="mt-6 md:mt-0">
              <div className="relative md:block">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-bold leading-tight tracking-tight text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">
                  {messages.hero.title} <br />
                  <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-white/60">
                    {messages.hero.name}
                  </span>
                </h1>
              </div>

              <p className="mt-4 md:mt-6 text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-xl text-balance leading-relaxed drop-shadow-sm dark:drop-shadow-md">
                <span className="text-primary font-semibold dark:text-primary-foreground">{messages.hero.subtitleRole}</span>{" "}
                {messages.hero.subtitleRest}{" "}
                <span className="whitespace-nowrap">{messages.hero.subtitleEnding}</span>
              </p>

              <div className="flex flex-wrap gap-4 mt-8 md:mt-12">
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    className="flex items-center justify-center gap-2 rounded-full px-8 text-base h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_rgba(75,120,216,0.3)] hover:shadow-[0_0_30px_-5px_rgba(75,120,216,0.5)] transition-all duration-300"
                    onClick={() => trackEvent("cta_click", { location: "home_hero", label: "view_my_work", destination: "/portfolio" })}
                  >
                    {messages.hero.ctaViewWork} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 text-lg h-14 bg-slate-900/5 border-slate-900/15 text-slate-900 hover:bg-slate-900/10 dark:bg-white/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10 backdrop-blur-sm shadow-sm"
                    onClick={() => trackEvent("cta_click", { location: "home_hero", label: "contact_me", destination: "/contact" })}
                  >
                    {messages.hero.ctaContact}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-Right Navigation & Metadata UI */}
        <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-end gap-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
          <Link href={heroSlides[currentSlide].link}>
            <div className="flex items-center gap-4 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-900/10 dark:border-white/10 rounded-full py-2 px-4 shadow-xl cursor-pointer hover:bg-white/80 dark:hover:bg-black/60 hover:border-slate-900/20 dark:hover:border-white/20 transition-all group">
              <span className="text-slate-900/60 dark:text-white/60 text-sm font-mono tracking-wider">
                [0{currentSlide + 1}/0{heroSlides.length}]
              </span>
              <span className="text-slate-900/30 dark:text-white/40 text-sm">|</span>
              <span className="text-slate-900 dark:text-white text-sm font-medium truncate max-w-[200px] group-hover:text-primary transition-colors">
                {heroSlides[currentSlide].title}
              </span>
              <Badge variant="outline" className="bg-slate-900/5 border-slate-900/10 text-slate-900/80 dark:bg-white/5 dark:border-white/10 dark:text-white/80 text-xs ml-2 group-hover:border-primary/50 transition-colors">
                {heroSlides[currentSlide].category}
              </Badge>
              <ExternalLink className="w-3 h-3 text-slate-900/50 dark:text-white/50 group-hover:text-primary ml-1" />
            </div>
          </Link>

          <div className="flex items-center gap-2 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-slate-900/10 dark:border-white/10 rounded-full p-1 shadow-xl">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-900 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/20" onClick={handlePrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-900 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/20" onClick={togglePause}>
              {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-900 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/20" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Global Progress Bar at Bottom Boundary */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900/10 dark:bg-white/10 z-30 hidden md:block">
          <div
            className="h-full bg-primary transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-[#faf9fc] dark:bg-white/[0.02]">
        <div className="container">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">{messages.sections.whatIDo}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold leading-tight [text-wrap:balance] mb-2">{messages.cards.conceptDevelopment.title}</h3>
              <p className="text-black dark:text-muted-foreground">{messages.cards.conceptDevelopment.body}</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
              </div>
              <h3 className="text-xl font-bold leading-tight [text-wrap:balance] mb-2">{messages.cards.uxUi.title}</h3>
              <p className="text-black dark:text-muted-foreground">{messages.cards.uxUi.body}</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
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

