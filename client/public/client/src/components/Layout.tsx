import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <Navigation />
      <main className="flex-grow pt-[64px] md:pt-[80px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
