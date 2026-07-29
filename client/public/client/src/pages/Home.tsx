import { Link } from "wouter";
import { ArrowRight, Download, ExternalLink, ChevronRight, ChevronLeft, Play, Pause, Sparkles, FolderKanban, Layers, Briefcase, LayoutGrid } from "lucide-react";
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
  const isAr = language === "ar";
  const cvResumeHref =
    language === "nl"
      ? "/ATS_CV_Omar_Abdulghani_NL_v2.pdf"
      : "/ATS_CV_Omar_Abdulghani_v2.pdf";

  const allProjects = useProjects();

  const featuredIds = ["job-scout", "moonlit-firefly-bloom", "patronapp", "amstelhof-connect", "moes-tuinen", "pphe-hotel", "theraneck-ecommerce", "hallencity"];
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
      const isAmstelhof = p.id === "amstelhof-connect";
      const isMoesTuinen = p.id === "moes-tuinen";
      const isPPHE = p.id === "pphe-hotel";
      const isTheraNeck = p.id === "theraneck-ecommerce";
      const isHallenCity = p.id === "hallencity";
      const hasVideo = isPatronApp || isJobScout || isMoonlit || isAmstelhof || isMoesTuinen || isPPHE || isTheraNeck || isHallenCity;
      
      const slideData = isPPHE
        ? messages.heroSlides.slides.pphe
        : isTheraNeck
        ? messages.heroSlides.slides.theraNeck
        : isHallenCity
        ? messages.heroSlides.slides.hallenCity
        : isJobScout
        ? messages.heroSlides.slides.jobScout
        : isPatronApp
        ? messages.heroSlides.slides.patronApp
        : isMoesTuinen
        ? messages.heroSlides.slides.moesTuinen
        : isMoonlit
        ? messages.heroSlides.slides.moonlit
        : messages.heroSlides.slides.amstelhof;
      
      return {
        id: p.id,
        title: slideData?.title || p.title,
        logo: isAmstelhof 
          ? "/images/amstelhof-connect gallery/amstelhof-logo dark mode.png" 
          : isPatronApp
          ? "/images/patronapp gallery/patronaat logo.png"
          : isMoesTuinen
          ? "/images/moestuinenlogo-darkmode.png"
          : isPPHE
          ? "/images/pphe-hotel-group gallery/pphe-hotel-group-logo.png"
          : isHallenCity
          ? "/images/hallencity gallery/logo-De-Filmhallen (dark mode).png"
          : undefined,
        secondaryLogo: isPPHE
          ? "/images/pphe-hotel-group gallery/artotel-logo-png_seeklogo-342919.png"
          : undefined,
        category: slideData?.category || p.category,
        description: slideData?.description || p.description,
        type: hasVideo ? ("video" as const) : ("image" as const),
        src: isPatronApp
          ? "/images/patronapp gallery/PatronApp Promo 1.mp4"
          : isJobScout
          ? "/images/job-scout-gallery/Job_Scout_dashboard_showcase_202607201923.mp4"
          : isMoonlit
          ? "/images/moonlit-gallery/Video_promo_for_game_project_202607201943.mp4"
          : isAmstelhof
          ? "/images/amstelhof-connect gallery/Amstelhof_Connect_tablet_app_202607210249.mp4"
          : isMoesTuinen
          ? "/images/moes-tuinen gallery/MOES_Tuinen_brand_activation_video_202607210304.mp4"
          : isPPHE
          ? "/images/pphe-hotel-group gallery/pphe_video.mp4"
          : isTheraNeck
          ? "/images/theraneck-gallery/Recruiter_portfolio_video_TheraNeck_202607210414.mp4"
          : isHallenCity
          ? "/images/hallencity gallery/hallencity_video.mp4"
          : p.image, 
        link: `/portfolio/${p.id}`
      };
    })
    .filter((slide): slide is NonNullable<typeof slide> => Boolean(slide));

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const SLIDE_DURATION = 5000;
  const UPDATE_INTERVAL = 50;

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const tagRef = useRef<HTMLDivElement>(null);
  const fullPortfolioPillRef = useRef<HTMLDivElement>(null);
  const mobileFullPortfolioPillRef = useRef<HTMLDivElement>(null);
  const mobileTagRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const viewWorkBtnRef = useRef<HTMLButtonElement>(null);
  
  const { filter: tagLiquidGlassFilter, isSupported: isTagSupported } = useLiquidGlass(tagRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: fullPortfolioPillLiquidGlassFilter, isSupported: isFullPortfolioPillSupported } = useLiquidGlass(fullPortfolioPillRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: mobileFullPortfolioPillLiquidGlassFilter, isSupported: isMobileFullPortfolioPillSupported } = useLiquidGlass(mobileFullPortfolioPillRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: mobileTagLiquidGlassFilter, isSupported: isMobileTagSupported } = useLiquidGlass(mobileTagRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: pillLiquidGlassFilter, isSupported: isPillSupported } = useLiquidGlass(pillRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: contactBtnLiquidGlassFilter, isSupported: isContactBtnSupported } = useLiquidGlass(contactBtnRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: viewWorkBtnLiquidGlassFilter, isSupported: isViewWorkBtnSupported } = useLiquidGlass(viewWorkBtnRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });

  const tagGlassClasses = isTagSupported ? "bg-slate-950/40" : "bg-slate-950/80 backdrop-blur-md";
  const fullPortfolioPillGlassClasses = isFullPortfolioPillSupported ? "bg-slate-950/40" : "bg-slate-950/80 backdrop-blur-md";
  const mobileFullPortfolioPillGlassClasses = isMobileFullPortfolioPillSupported ? "bg-slate-950/40" : "bg-slate-950/80 backdrop-blur-md";
  const mobileTagGlassClasses = isMobileTagSupported ? "bg-slate-950/40" : "bg-slate-950/80 backdrop-blur-md";
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

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [heroSlides.length]);

  return (
    <Layout>
      <section 
        className="relative min-h-[100svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden -mt-[64px] md:-mt-[80px] pt-[calc(3rem+64px)] md:pt-[calc(5rem+80px)] pb-6 md:pb-32 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >

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
          <div className="absolute inset-0 z-20 bg-slate-950/45 md:bg-transparent md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/80 md:to-transparent" />
          {/* Bottom Edge Blend — seamlessly blends the video into the section below it */}
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
          
          {/* Bottom-right corner vignette — full screen element to ensure no sharp edges, completely hides watermarks */}
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(2,6,23,1) 0%, rgba(2,6,23,1) 250px, rgba(2,6,23,0.3) 500px, rgba(2,6,23,0) 800px)' }} />
        </div>

        <div className={`container relative z-30 flex flex-col md:flex-row items-start justify-between gap-12 w-full mb-4 md:mb-0 ${isAr ? "text-right md:text-right" : "text-center md:text-left"}`}>
          <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 w-full flex flex-col md:w-[50%] lg:w-[55%] ${isAr ? "items-start md:items-start text-right" : "items-center md:items-start"}`}>

            <div className={`mt-6 md:mt-0 w-full flex flex-col ${isAr ? "items-start md:items-start text-right" : "items-center md:items-start"}`}>
              <div className="relative md:block w-full">
                <h1 className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md flex flex-col w-full ${isAr ? "items-start md:items-start text-right" : "items-center md:items-start text-left"}`}>
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-white/60 drop-shadow-sm dark:drop-shadow-md">
                    {messages.hero.title}
                  </span>
                  <div 
                    aria-label="Omar Abdulghani"
                    role="img"
                    className={`h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 mt-3 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-white/60 drop-shadow-sm dark:drop-shadow-md ${isAr ? "ml-0 -mr-3 sm:-mr-4 md:-mr-4" : "-ml-2 sm:-ml-3 md:-ml-4 mr-0"}`}
                    style={{
                      width: 'auto',
                      aspectRatio: '557.45 / 154.88',
                      maskImage: 'url(/asset-3.svg)',
                      WebkitMaskImage: 'url(/asset-3.svg)',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: isAr ? 'right center' : 'left center',
                      WebkitMaskPosition: isAr ? 'right center' : 'left center'
                    }}
                  />
                </h1>
              </div>

              <p className={`mt-4 md:mt-6 text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-xl text-balance leading-relaxed drop-shadow-sm dark:drop-shadow-md w-full ${isAr ? "mr-0 ml-auto text-right md:text-right" : "mx-auto md:mx-0 text-left md:text-left"}`}>
                {messages.hero.subtitleRest}
              </p>

              <div className={`flex flex-col md:flex-row flex-wrap gap-4 mt-8 md:mt-12 w-full ${isAr ? "justify-start md:justify-start items-start md:items-start text-right" : "justify-center md:justify-start items-center md:items-start"}`}>
                <Link href="/portfolio">
                  <Button
                    ref={viewWorkBtnRef}
                    size="lg"
                    className="flex items-center justify-center gap-2.5 rounded-full px-7 text-base font-semibold h-14 text-white bg-blue-600/40 hover:bg-blue-500/55 border border-blue-400/45 shadow-[0_0_25px_-2px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_0px_rgba(59,130,246,0.7)] transition-all duration-300 group"
                    style={isViewWorkBtnSupported ? { backdropFilter: viewWorkBtnLiquidGlassFilter, WebkitBackdropFilter: viewWorkBtnLiquidGlassFilter } : {}}
                    onClick={() => trackEvent("cta_click", { location: "home_hero", label: "view_my_work", destination: "/portfolio" })}
                  >
                    <span>{messages.hero.ctaViewWork}</span>
                    <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform text-blue-100 ${isAr ? "rotate-180 group-hover:-translate-x-1 mr-1 ml-0" : "ml-1 mr-0"}`} />
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

          {/* Desktop-Only Project Tag (Right Side) */}
          <div className="hidden md:flex flex-col items-end md:w-[45%] lg:w-[40%] animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
            <Link href={heroSlides[currentSlide].link} className="w-full">
            <div 
              ref={tagRef}
              className={`flex flex-col gap-2 lg:gap-3 rounded-2xl p-3 md:p-4 lg:p-5 shadow-2xl cursor-pointer hover:border-white/20 transition-all group w-full max-w-full border border-transparent hover:bg-white/5 ${tagGlassClasses}`}
              style={{
                backdropFilter: tagLiquidGlassFilter || "none",
                WebkitBackdropFilter: tagLiquidGlassFilter || "none",
              }}
            >
              <div className="relative grid">
                {heroSlides.map((slide, index) => (
                  <div 
                    key={slide.id}
                    className={`transition-all duration-700 ease-in-out flex flex-col ${index === currentSlide ? 'opacity-100 translate-y-0 blur-none z-10 relative' : 'opacity-0 -translate-y-2 blur-sm pointer-events-none z-0 absolute inset-0'}`}
                  >
                    <div>
                      <h3 className="text-white text-sm lg:text-lg font-bold flex flex-wrap items-center gap-2 lg:gap-3">
                        {slide.title}
                        <Badge variant="outline" className="bg-white/5 border-white/10 text-white/90 text-xs font-normal whitespace-nowrap">
                          {slide.category}
                        </Badge>
                      </h3>
                      <p className="text-white/80 text-xs lg:text-sm mt-1 lg:mt-2 line-clamp-2 leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-3 lg:mt-4">
                      <div className="flex items-center">
                        {slide.logo ? (
                          <>
                            <img src={slide.logo} alt="Project Logo" className={`w-auto object-contain ${slide.id === 'hallencity' ? 'h-10 scale-110 origin-left' : 'h-6'}`} />
                            {slide.secondaryLogo && (
                              <img src={slide.secondaryLogo} alt="Secondary Logo" className="h-12 w-auto object-contain ml-4" />
                            )}
                          </>
                        ) : (
                          <span className="text-white/80 text-xs border border-white/20 rounded-full px-3 py-1 font-medium">{messages.heroSlides.independentProject}</span>
                        )}
                      </div>
                      <span className="text-white text-xs lg:text-sm font-bold uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                        {messages.heroSlides.viewProject} <ArrowRight className={`w-4 h-4 transition-transform ${isAr ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
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
      <section className="relative py-10 md:py-24 bg-[#faf9fc] dark:bg-slate-950/50 overflow-hidden">
        {/* Minimal Animated Fluid Aura Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none flex items-center justify-center opacity-60 dark:opacity-30">
          <div className="absolute w-[60vw] h-[30vw] min-w-[600px] min-h-[300px] rounded-[100%] bg-primary/20 dark:bg-primary/10 blur-[120px] animate-[spin_30s_linear_infinite]" />
          <div className="absolute w-[40vw] h-[60vw] min-w-[400px] min-h-[600px] rounded-[100%] bg-blue-500/15 dark:bg-blue-500/10 blur-[140px] animate-[spin_40s_linear_infinite_reverse] mix-blend-multiply dark:mix-blend-screen" />
        </div>
        
        <div className="container relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">{messages.sections.whatIDo}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 bg-primary/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold leading-tight [text-wrap:balance] mb-3 text-slate-900 dark:text-white transition-colors group-hover:text-primary">
                  {messages.cards.conceptDevelopment.title}
                </h3>
                <p className="text-slate-600 dark:text-white/70 leading-relaxed text-sm md:text-base font-light">
                  {messages.cards.conceptDevelopment.body}
                </p>
              </div>
            </div>

            <div className="relative p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 bg-primary/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold leading-tight [text-wrap:balance] mb-3 text-slate-900 dark:text-white transition-colors group-hover:text-primary">
                  {messages.cards.uxUi.title}
                </h3>
                <p className="text-slate-600 dark:text-white/70 leading-relaxed text-sm md:text-base font-light">
                  {messages.cards.uxUi.body}
                </p>
              </div>
            </div>

            <div className="relative p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 bg-primary/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold leading-tight [text-wrap:balance] mb-3 text-slate-900 dark:text-white transition-colors group-hover:text-primary">
                  {messages.cards.creativeTechnology.title}
                </h3>
                <p className="text-slate-600 dark:text-white/70 leading-relaxed text-sm md:text-base font-light">
                  {messages.cards.creativeTechnology.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute inset-0 bg-[url('/images/abstract-texture.png')] opacity-20 mix-blend-overlay" />

        <div className="container relative z-10 text-center">
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm md:text-base font-medium shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all hover:bg-emerald-500/20 cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              {messages.hero.available}
            </div>
          </div>
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

