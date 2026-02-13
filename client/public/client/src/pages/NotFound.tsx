import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Mail } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <img
        src="/images/hero-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/50 backdrop-blur-[2px]" />

      <div className="relative z-10 container flex min-h-screen items-center justify-center py-20">
        <div className="w-full max-w-3xl rounded-3xl border border-border/40 bg-card/65 p-8 text-center shadow-2xl backdrop-blur-md sm:p-12">
          <div className="mb-6 text-center">
            <span className="text-3xl font-heading font-bold tracking-tight text-foreground">
              OMAR
              <span className="text-primary">.</span>
            </span>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Error 404
          </p>

          <h1 className="text-5xl font-heading font-bold sm:text-7xl">Page Not Found</h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            This page does not exist or may have been moved. Use one of the actions below
            to continue browsing the portfolio.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => setLocation("/")}
              className="rounded-full px-8"
            >
              <Home className="mr-2 h-4 w-4" />
              Back Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/contact")}
              className="rounded-full px-8"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mx-auto mt-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
