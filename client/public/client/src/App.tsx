import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";
import ErrorBoundary from "./components/ErrorBoundary";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function AnalyticsRouteTracker() {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/portfolio/:id" component={ProjectDetail} />
      <Route path="/skills" component={Skills} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" switchable>
        <CookieConsentProvider>
          <TooltipProvider>
            <Toaster />
            <AnalyticsRouteTracker />
            <Router />
          </TooltipProvider>
        </CookieConsentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
