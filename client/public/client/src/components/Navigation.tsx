import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(72);
  const [location] = useLocation();
  const { theme } = useTheme();
  const { language, setLanguage, messages } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
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
  const glassSurfaceClasses = "bg-white/45 dark:bg-background/80 backdrop-blur-md";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        (scrolled || isOpen)
          ? `${glassSurfaceClasses} py-4 md:border-b md:border-transparent dark:md:border-border/40`
          : "bg-transparent dark:bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold font-heading tracking-tight hover:text-primary transition-colors">
            OMAR<span className="text-primary">.</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  location === link.href
                    ? "text-black dark:text-primary"
                    : "text-black/75 dark:text-muted-foreground"
                )}
                onClick={() => trackEvent("nav_click", { location: "header_desktop", destination: link.href })}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                    location === link.href ? "w-full" : ""
                  )}
                />
              </a>
            </Link>
          ))}
          <div ref={desktopLanguageMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-black/75 transition-colors hover:text-primary dark:text-muted-foreground dark:hover:text-primary"
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
              variant="default"
              size="sm"
              className="rounded-full px-6"
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
              className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
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
            className="text-foreground p-2"
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
          className={`fixed inset-x-0 bottom-0 z-40 md:hidden ${glassSurfaceClasses}`}
          style={{ top: "0px" }}
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
                  size="lg" 
                  className="mt-4 rounded-full px-8 text-lg"
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
