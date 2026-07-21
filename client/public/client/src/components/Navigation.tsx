import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(72);
  const [location] = useLocation();
  const { theme } = useTheme();
  const { language, setLanguage, messages } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopLetsTalkRef = useRef<HTMLButtonElement>(null);
  const mobileLetsTalkRef = useRef<HTMLButtonElement>(null);

  const { filter: liquidGlassFilter, isSupported: isDesktopNavSupported } = useLiquidGlass(navRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: mobileLiquidGlassFilter, isSupported: isMobileMenuSupported } = useLiquidGlass(mobileMenuRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: desktopLetsTalkLiquidGlassFilter, isSupported: isDesktopLetsTalkSupported } = useLiquidGlass(desktopLetsTalkRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });
  const { filter: mobileLetsTalkLiquidGlassFilter, isSupported: isMobileLetsTalkSupported } = useLiquidGlass(mobileLetsTalkRef, { blur: 2, chromaticAberration: 2, strength: 50, depth: 6, brightness: 1.1, saturate: 1.5 });

  const desktopLanguageMenuRef = useRef<HTMLDivElement>(null);
  const mobileLanguageMenuRef = useRef<HTMLDivElement>(null);

  const languageOptions = [
    { code: "en" as const, label: "English" },
    { code: "nl" as const, label: "Nederlands" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateMenuTop = () => {
      if (navRef.current) {
        setMenuTop(navRef.current.getBoundingClientRect().height);
      }
    };

    updateMenuTop();
    window.addEventListener("resize", updateMenuTop);
    return () => window.removeEventListener("resize", updateMenuTop);
  }, [scrolled, isOpen]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        isLanguageMenuOpen &&
        !desktopLanguageMenuRef.current?.contains(event.target as Node) &&
        !mobileLanguageMenuRef.current?.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLanguageMenuOpen]);

  const navLinks = [
    { name: messages.nav.home, href: "/" },
    { name: messages.nav.about, href: "/about" },
    { name: messages.nav.portfolio, href: "/portfolio" },
    { name: messages.nav.skills, href: "/skills" },
    { name: messages.nav.contact, href: "/contact" },
  ];
  const glassSurfaceClasses = scrolled 
    ? (isDesktopNavSupported ? "bg-slate-950/60 dark:bg-slate-950/60" : "bg-slate-950/90 backdrop-blur-md") 
    : (isDesktopNavSupported ? "bg-transparent" : "bg-slate-950/40 backdrop-blur-md");
    
  const mobileGlassSurfaceClasses = isMobileMenuSupported 
    ? "bg-slate-950/60 dark:bg-slate-950/60" 
    : "bg-slate-950/90 backdrop-blur-md";

  const desktopLetsTalkGlassClasses = isDesktopLetsTalkSupported ? "bg-primary/50 hover:bg-primary/60" : "bg-primary/70 hover:bg-primary/80 backdrop-blur-md";
  const mobileLetsTalkGlassClasses = isMobileLetsTalkSupported ? "bg-primary/50 hover:bg-primary/60" : "bg-primary/70 hover:bg-primary/80 backdrop-blur-md";

  const languageButtonLabel = language.toUpperCase();

  const handleLanguageSelect = (nextLanguage: "en" | "nl") => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[90%] max-w-7xl z-50 transition-all duration-300 rounded-full border border-white/10 dark:border-white/5",
          scrolled ? `py-2 shadow-lg ${glassSurfaceClasses}` : `py-4 ${glassSurfaceClasses}`
        )}
        style={{
          backdropFilter: liquidGlassFilter || "none",
          WebkitBackdropFilter: liquidGlassFilter || "none",
        }}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <a className="group relative flex items-center">
              {/* <span className="text-2xl font-bold font-heading tracking-tight text-white hover:text-primary transition-colors">OMAR<span className="text-primary">.</span></span> */}
            <img 
              src="/logo/vectorised-760f92c0.svg" 
              alt="OMAR Logo" 
              className="h-5 md:h-6 w-auto" 
            />
            <img 
              src="/logo/on%20hover.svg" 
              alt="OMAR Logo Hover" 
              className="absolute left-0 top-0 h-5 md:h-6 w-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
            />
          </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full",
                    location === link.href
                      ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                  onClick={() => trackEvent("nav_click", { location: "header_desktop", destination: link.href })}
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <div ref={desktopLanguageMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen((open) => !open)}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
              >
                <span>{languageButtonLabel}</span>
                <ChevronDown
                  size={16}
                  className={cn("transition-transform duration-200", isLanguageMenuOpen && "rotate-180")}
                />
              </button>
              {isLanguageMenuOpen && (
                <div
                  className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[150px] rounded-2xl border border-transparent bg-white p-1.5 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)] backdrop-blur-md space-y-1.5 dark:border-border/40 dark:bg-background"
                >
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => handleLanguageSelect(option.code)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                        language === option.code
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary/70"
                      )}
                    >
                      <span>{option.label}</span>
                      <span className="text-xs font-semibold uppercase tracking-wide">{option.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact">
              <Button
                ref={desktopLetsTalkRef}
                variant="ghost"
                size="sm"
                className={`rounded-full px-6 text-primary-foreground shadow-[0_0_20px_-5px_rgba(75,120,216,0.3)] hover:shadow-[0_0_30px_-5px_rgba(75,120,216,0.5)] transition-all duration-300 ${desktopLetsTalkGlassClasses}`}
                style={isDesktopLetsTalkSupported ? { backdropFilter: desktopLetsTalkLiquidGlassFilter, WebkitBackdropFilter: desktopLetsTalkLiquidGlassFilter } : {}}
                onClick={() => trackEvent("cta_click", { location: "header_desktop", label: "lets_talk", destination: "/contact" })}
              >
                {messages.nav.letsTalk}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-1">
            <div ref={mobileLanguageMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen((open) => !open)}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white hover:bg-white/10"
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
              >
                <span>{languageButtonLabel}</span>
                <ChevronDown
                  size={16}
                  className={cn("transition-transform duration-200", isLanguageMenuOpen && "rotate-180")}
                />
              </button>
              {isLanguageMenuOpen && (
                <div
                  className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[150px] rounded-2xl border border-transparent bg-white p-1.5 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)] backdrop-blur-md space-y-1.5 dark:border-border/40 dark:bg-background"
                >
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => handleLanguageSelect(option.code)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                        language === option.code
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary/70"
                      )}
                    >
                      <span>{option.label}</span>
                      <span className="text-xs font-semibold uppercase tracking-wide">{option.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="text-white p-2 transition-colors hover:text-primary"
              onClick={() => {
                if (!isOpen) {
                  trackEvent("mobile_menu_open", { location });
                }
                setIsLanguageMenuOpen(false);
                setIsOpen(!isOpen);
              }}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && typeof document !== "undefined" &&
        createPortal(
          <div
            ref={mobileMenuRef}
            className={`fixed inset-x-0 bottom-0 z-40 md:hidden ${mobileGlassSurfaceClasses}`}
            style={{
              top: "0px",
              backdropFilter: mobileLiquidGlassFilter || "none",
              WebkitBackdropFilter: mobileLiquidGlassFilter || "none",
            }}
            onWheel={() => setIsOpen(false)}
            onTouchMove={() => setIsOpen(false)}
          >
            <div className="h-full overflow-y-auto">
              <div
                className="container min-h-full flex flex-col items-center justify-center gap-8"
                style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
              >
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <a
                      className={cn(
                        "text-2xl font-heading font-bold transition-colors hover:text-primary",
                        location === link.href ? "text-primary" : "text-foreground"
                      )}
                      onClick={() => {
                        trackEvent("nav_click", { location: "header_mobile", destination: link.href });
                        setIsOpen(false);
                      }}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
                <Link href="/contact">
                  <Button
                    ref={mobileLetsTalkRef}
                    variant="ghost"
                    size="lg"
                    className={`mt-4 rounded-full px-8 text-lg text-primary-foreground shadow-[0_0_20px_-5px_rgba(75,120,216,0.3)] hover:shadow-[0_0_30px_-5px_rgba(75,120,216,0.5)] transition-all duration-300 ${mobileLetsTalkGlassClasses}`}
                    style={isMobileLetsTalkSupported ? { backdropFilter: mobileLetsTalkLiquidGlassFilter, WebkitBackdropFilter: mobileLetsTalkLiquidGlassFilter } : {}}
                    onClick={() => {
                      trackEvent("cta_click", { location: "header_mobile", label: "lets_talk", destination: "/contact" });
                      setIsOpen(false);
                    }}
                  >
                    {messages.nav.letsTalk}
                  </Button>
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
