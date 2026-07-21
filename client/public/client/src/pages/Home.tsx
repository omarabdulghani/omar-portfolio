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
import { useLiquidGlass } from "@/hooks/useLiquidGlass";

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
      const isJobScout = p.id === "job-scout";
      const isMoonlit = p.id === "moonlit-firefly-bloom";
      const hasVideo = isPatronApp || isJobScout || isMoonlit;
      
      return {
        id: p.id,
        title: p.title,
        category: p.category,
        description: isPatronApp 
          ? "A whole new interactive music experience."
          : isJobScout
          ? "The job hunt made effortless."
          : isMoonlit
          ? "An enchanting and cozy arcade game."
          : p.description,
        type: hasVideo ? ("video" as const) : ("image" as const),
        src: isPatronApp
          ? "/images/patronapp gallery/PatronApp Promo 1.mp4"
          : isJobScout
          ? "/images/job-scout-gallery/Job_Scout_dashboard_showcase_202607201923.mp4"
          : isMoonlit
          ? "/images/moonlit-gallery/Video_promo_for_game_project_202607201943.mp4"
          : p.image, 
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
  const tagRef = useRef<HTMLDivElement>(null);
  const mobileTagRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const viewWorkBtnRef = useRef<HTMLButtonElement>(null);
  
  const { filter: tagLiquidGlassFilter, isSupported: isTagSupported } = useLiquidGlass(tagRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: mobileTagLiquidGlassFilter, isSupported: isMobileTagSupported } = useLiquidGlass(mobileTagRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: pillLiquidGlassFilter, isSupported: isPillSupported } = useLiquidGlass(pillRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: contactBtnLiquidGlassFilter, isSupported: isContactBtnSupported } = useLiquidGlass(contactBtnRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: viewWorkBtnLiquidGlassFilter, isSupported: isViewWorkBtnSupported } = useLiquidGlass(viewWorkBtnRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });

  const tagGlassClasses = isTagSupported ? "bg-transparent" : "bg-slate-950/60 backdrop-blur-md";
  const mobileTagGlassClasses = isMobileTagSupported ? "bg-transparent" : "bg-slate-950/60 backdrop-blur-md";
  const pillGlassClasses = isPillSupported ? "bg-white/5 dark:bg-black/5" : "bg-white/60 dark:bg-black/40 backdrop-blur-md";
  const contactBtnGlassClasses = isContactBtnSupported ? "bg-white/10 hover:bg-white/20" : "bg-white/10 hover:bg-white/20 backdrop-blur-md";
  const viewWorkBtnGlassClasses = isViewWorkBtnSupported ? "bg-primary/50 hover:bg-primary/60" : "bg-primary/70 hover:bg-primary/80 backdrop-blur-md";

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
      <section className="relative min-h-[85svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden -mt-[64px] md:-mt-[80px] pt-[calc(4rem+64px)] md:pt-[calc(5rem+80px)] pb-16 md:pb-32">

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
          {/* Bottom-right corner vignette — hides video watermarks */}
          <div className="absolute bottom-0 right-0 z-20 w-[40%] h-[45%] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(2,6,23,1) 0%, rgba(2,6,23,0.95) 35%, rgba(2,6,23,0.6) 55%, transparent 80%)' }} />
        </div>

        <div className="container relative z-30 flex flex-col md:grid md:grid-cols-1 md:w-2/3 lg:w-1/2 gap-12 md:items-center mx-auto md:mx-0 md:mr-auto text-center md:text-left mb-24 md:mb-0">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 w-full flex flex-col items-center md:items-start">

            <div className="mt-6 md:mt-0 w-full">
              <div className="relative md:block">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-bold leading-tight tracking-tight text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">
                  {messages.hero.title} <br />
                  <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-white/60">
                    {messages.hero.name}
                  </span>
                </h1>
              </div>

              <p className="mt-4 md:mt-6 text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-xl text-balance leading-relaxed drop-shadow-sm dark:drop-shadow-md mx-auto md:mx-0">
                A Creative Technologist blending development, AI, and design into scalable digital products.
              </p>

              <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-8 md:mt-12 justify-center md:justify-start items-center md:items-start">
                <Link href="/portfolio">
                  <Button
                    ref={viewWorkBtnRef}
                    size="lg"
                    className={`flex items-center justify-center gap-2 rounded-full px-8 text-base h-14 text-primary-foreground shadow-[0_0_20px_-5px_rgba(75,120,216,0.3)] hover:shadow-[0_0_30px_-5px_rgba(75,120,216,0.5)] transition-all duration-300 ${viewWorkBtnGlassClasses}`}
                    style={isViewWorkBtnSupported ? { backdropFilter: viewWorkBtnLiquidGlassFilter, WebkitBackdropFilter: viewWorkBtnLiquidGlassFilter } : {}}
                    onClick={() => trackEvent("cta_click", { location: "home_hero", label: "view_my_work", destination: "/portfolio" })}
                  >
                    {messages.hero.ctaViewWork} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    ref={contactBtnRef}
                    variant="ghost"
                    size="lg"
                    className={`flex items-center justify-center rounded-full px-8 text-lg h-14 text-slate-900 dark:text-white shadow-sm transition-colors ${contactBtnGlassClasses}`}
                    style={isContactBtnSupported ? { backdropFilter: contactBtnLiquidGlassFilter, WebkitBackdropFilter: contactBtnLiquidGlassFilter } : {}}
                    onClick={() => trackEvent("cta_click", { location: "home_hero", label: "contact_me", destination: "/contact" })}
                  >
                    {messages.hero.ctaContact}
                  </Button>
                </Link>
              </div>


            </div>
          </div>
        </div>

        {/* Desktop-Only Project Tag (Middle Right) */}
        <div className="absolute top-32 right-8 z-30 hidden md:flex flex-col items-end animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
          <Link href={heroSlides[currentSlide].link}>
            <div 
              ref={tagRef}
              className={`flex flex-col gap-3 rounded-2xl p-5 shadow-2xl cursor-pointer hover:border-white/20 transition-all group max-w-sm border border-transparent hover:bg-white/5 ${tagGlassClasses}`}
              style={{
                backdropFilter: tagLiquidGlassFilter || "none",
                WebkitBackdropFilter: tagLiquidGlassFilter || "none",
              }}
            >
              <div className="relative grid">
                {heroSlides.map((slide, index) => (
                  <div 
                    key={slide.id}
                    className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-y-0 blur-none z-10 relative' : 'opacity-0 -translate-y-2 blur-sm pointer-events-none z-0 invisible'}`}
                  >
                    <h3 className="text-white text-lg font-bold flex items-center gap-3">
                      {slide.title}
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-white/90 text-xs font-normal whitespace-nowrap">
                        {slide.category}
                      </Badge>
                    </h3>
                    <p className="text-white/80 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end mt-1">
                <span className="text-primary text-sm font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Project <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Global Slideshow Controls & Progress (Desktop Only) */}
        <div 
          ref={pillRef}
          className={`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-1 rounded-full p-1 pl-4 shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ${pillGlassClasses}`}
          style={isPillSupported ? { backdropFilter: pillLiquidGlassFilter, WebkitBackdropFilter: pillLiquidGlassFilter } : {}}
        >
          {/* Segmented Progress Indicators */}
          <div className="flex items-center gap-1.5 mr-2">
            {heroSlides.map((_, idx) => (
              <div key={idx} className="h-1 w-6 bg-slate-900/20 dark:bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-slate-900 dark:bg-white transition-all duration-75 ease-linear ${idx < currentSlide ? 'w-full' : idx === currentSlide ? '' : 'w-0'}`}
                  style={{ width: idx === currentSlide ? `${progress}%` : undefined }}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
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

