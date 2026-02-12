import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(72);
  const [location] = useLocation();
  const { theme, toggleTheme, switchable } = useTheme();
  const navRef = useRef<HTMLElement>(null);

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];
  const glassSurfaceClasses = "bg-white/45 dark:bg-background/80 backdrop-blur-md";

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
          {switchable && toggleTheme && (
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <Link href="/contact">
            <Button variant="default" size="sm" className="rounded-full px-6">
              Let's Talk
            </Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-1">
          {switchable && toggleTheme && (
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          )}
          <button
            className="text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
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
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="mt-4 rounded-full px-8 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Let's Talk
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
