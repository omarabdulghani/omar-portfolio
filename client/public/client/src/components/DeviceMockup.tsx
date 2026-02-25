import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, Minimize2, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DeviceMockupType = "ipad" | "iphone" | "desktop";
export type DeviceMockupMode = "static" | "interactive";
export type DeviceMockupOrientation = "portrait" | "landscape";

type DeviceMockupProps = {
  type: DeviceMockupType;
  mode: DeviceMockupMode;
  orientation?: DeviceMockupOrientation;
  images?: string[];
  iframeSrc?: string;
  iframeTitle?: string;
  showArrows?: boolean;
  allowFullscreen?: boolean;
  enableTilt?: boolean;
  imageFit?: "cover" | "contain";
  screenAspectRatio?: number;
  hideNotch?: boolean;
  disableEmbeddedNavigation?: boolean;
  interactiveHref?: string;
  requireInteractionToggle?: boolean;
  deferIframeUntilPlay?: boolean;
  backClosesPrototype?: boolean;
  showExitNav?: boolean;
  skipBackAfterStop?: boolean;
  lockBrowserBack?: boolean;
  onBrowserBack?: () => void;
  onExitToPortfolio?: () => void;
  className?: string;
};

type DeviceStyleConfig = {
  shellClassName: string;
  frameClassName: string;
  screenClassName: string;
  notch?: "iphone" | "ipad";
  notchClassName?: string;
  hasLaptopBase?: boolean;
};

function getDeviceStyles(
  type: DeviceMockupType,
  orientation: DeviceMockupOrientation
): DeviceStyleConfig {
  if (type === "iphone") {
    const isLandscape = orientation === "landscape";
    return {
      shellClassName: cn(
        "w-full",
        isLandscape ? "max-w-[520px]" : "max-w-[clamp(200px,16vw,260px)]"
      ),
      frameClassName:
        "rounded-[2.4rem] border border-white/20 bg-zinc-900 p-[10px] shadow-[0_18px_45px_rgba(2,6,23,0.35)]",
      screenClassName: cn(
        "relative overflow-hidden rounded-[2rem] bg-black",
        isLandscape ? "aspect-[19.5/9]" : "aspect-[9/19.5]"
      ),
      notch: "iphone",
      notchClassName: isLandscape
        ? "pointer-events-none absolute right-2 top-1/2 z-20 h-20 w-5 -translate-y-1/2 rounded-full bg-black/85 ring-1 ring-white/10"
        : "pointer-events-none absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-black/85 ring-1 ring-white/10",
    };
  }

  if (type === "ipad") {
    const isLandscape = orientation === "landscape";
    return {
      shellClassName: cn("w-full", isLandscape ? "max-w-[840px]" : "max-w-[560px]"),
      frameClassName:
        "rounded-[2rem] border border-white/20 bg-zinc-900 p-[12px] shadow-[0_18px_45px_rgba(2,6,23,0.35)]",
      // iPad 9.7 screen ratio = 4:3 (2048x1536), portrait = 3:4
      screenClassName: cn(
        "relative overflow-hidden rounded-[1.5rem] bg-black",
        isLandscape ? "aspect-[4/3]" : "aspect-[3/4]"
      ),
      notch: "ipad",
      notchClassName: isLandscape
        ? "pointer-events-none absolute right-2 top-1/2 z-20 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-zinc-700 ring-1 ring-white/20"
        : "pointer-events-none absolute left-1/2 top-2 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-zinc-700 ring-1 ring-white/20",
    };
  }

  return {
    shellClassName: "w-full max-w-[980px]",
    frameClassName:
      "rounded-[1.25rem] border border-white/20 bg-zinc-900 p-[12px] shadow-[0_18px_45px_rgba(2,6,23,0.35)]",
    screenClassName: "relative aspect-[16/10] overflow-hidden rounded-[0.9rem] bg-black",
    hasLaptopBase: true,
  };
}

function getDeviceScreenRatio(
  type: DeviceMockupType,
  orientation: DeviceMockupOrientation
): number {
  if (type === "iphone") return orientation === "landscape" ? 19.5 / 9 : 9 / 19.5;
  if (type === "ipad") return orientation === "landscape" ? 4 / 3 : 3 / 4;
  return 16 / 10;
}

export default function DeviceMockup({
  type,
  mode,
  orientation,
  images = [],
  iframeSrc,
  iframeTitle,
  showArrows = false,
  allowFullscreen = true,
  enableTilt = true,
  imageFit = "cover",
  screenAspectRatio,
  hideNotch = false,
  disableEmbeddedNavigation = false,
  interactiveHref,
  requireInteractionToggle = false,
  deferIframeUntilPlay = false,
  backClosesPrototype = false,
  showExitNav = true,
  skipBackAfterStop = true,
  lockBrowserBack,
  onBrowserBack,
  onExitToPortfolio,
  className,
}: DeviceMockupProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const backGuardInitializedRef = useRef(false);
  const isHandlingBackRef = useRef(false);
  const backGuardTokenRef = useRef(`device-mockup-${Math.random().toString(36).slice(2)}`);
  const backSkipArmedRef = useRef(false);
  const backSkipInitialKeyRef = useRef<string | null>(null);
  const backSkipInProgressRef = useRef(false);
  const backSkipAttemptsRef = useRef(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [interactionEnabled, setInteractionEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExitAfterStop, setShowExitAfterStop] = useState(false);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const resolvedOrientation: DeviceMockupOrientation =
    orientation ?? (type === "desktop" ? "landscape" : "portrait");
  const style = getDeviceStyles(type, resolvedOrientation);
  const screenRatio = useMemo(
    () => getDeviceScreenRatio(type, resolvedOrientation),
    [type, resolvedOrientation]
  );
  const hasGalleryItems = images.length > 0;
  const shouldDeferIframeUntilPlay =
    mode === "interactive" && !!iframeSrc && deferIframeUntilPlay;
  const shouldBackClosePrototype =
    mode === "interactive" && !!iframeSrc && shouldDeferIframeUntilPlay && backClosesPrototype;
  const shouldSkipBackAfterStop =
    mode === "interactive" &&
    !!iframeSrc &&
    shouldDeferIframeUntilPlay &&
    skipBackAfterStop &&
    !shouldBackClosePrototype;
  const requiresInteractionToggle =
    mode === "interactive" && !!iframeSrc && requireInteractionToggle && !shouldDeferIframeUntilPlay;
  const shouldLockBrowserBack =
    mode === "interactive" &&
    !!iframeSrc &&
    (lockBrowserBack ?? true) &&
    !requiresInteractionToggle &&
    !shouldDeferIframeUntilPlay;
  const shouldShowExitNavButton = showExitNav && !!onExitToPortfolio && (isPlaying || showExitAfterStop);
  const shouldRenderTopControls = shouldDeferIframeUntilPlay && (isPlaying || shouldShowExitNavButton);
  const backSkipMaxAttempts = 25;

  const getCurrentLocationKey = () =>
    `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const getCurrentLocationWithoutHash = () =>
    `${window.location.pathname}${window.location.search}`;

  const disarmBackSkipGuard = () => {
    backSkipArmedRef.current = false;
    backSkipInitialKeyRef.current = null;
    backSkipInProgressRef.current = false;
    backSkipAttemptsRef.current = 0;
  };

  const armBackSkipGuard = () => {
    if (!shouldSkipBackAfterStop) return;
    backSkipArmedRef.current = true;
    backSkipAttemptsRef.current = 0;
    backSkipInProgressRef.current = false;
    backSkipInitialKeyRef.current = getCurrentLocationKey();
  };

  const handleStopPlaying = () => {
    if (shouldBackClosePrototype) {
      window.history.replaceState(null, "", getCurrentLocationWithoutHash());
    } else {
      armBackSkipGuard();
    }
    setIsPlaying(false);
    setShowExitAfterStop(showExitNav && !!onExitToPortfolio);
  };

  const handleStartPlaying = () => {
    setIsPlaying(true);
    setShowExitAfterStop(false);

    if (shouldBackClosePrototype && window.location.hash !== "#prototype") {
      window.location.hash = "prototype";
    }
  };

  const handleExitToPortfolio = () => {
    handleStopPlaying();
    onExitToPortfolio?.();
  };

  useEffect(() => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollTo({ left: 0, top: 0, behavior: "auto" });
  }, [images, mode, type, resolvedOrientation]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === rootRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!requiresInteractionToggle) {
      setInteractionEnabled(false);
      return;
    }

    setInteractionEnabled(false);
  }, [requiresInteractionToggle, iframeSrc]);

  useEffect(() => {
    if (!shouldDeferIframeUntilPlay) {
      setIsPlaying(false);
      setShowExitAfterStop(false);
      disarmBackSkipGuard();
      return;
    }

    setIsPlaying(false);
    setShowExitAfterStop(false);
    disarmBackSkipGuard();
  }, [shouldDeferIframeUntilPlay, iframeSrc]);

  useEffect(() => {
    if (!shouldSkipBackAfterStop) {
      disarmBackSkipGuard();
      return;
    }

    const handlePopState = () => {
      if (!backSkipArmedRef.current || backSkipInProgressRef.current) return;

      const initialKey = backSkipInitialKeyRef.current;
      if (!initialKey) {
        disarmBackSkipGuard();
        return;
      }

      const currentKey = getCurrentLocationKey();
      if (currentKey !== initialKey) {
        disarmBackSkipGuard();
        return;
      }

      if (backSkipAttemptsRef.current >= backSkipMaxAttempts) {
        disarmBackSkipGuard();
        return;
      }

      backSkipInProgressRef.current = true;

      const skipBack = () => {
        if (!backSkipArmedRef.current) {
          backSkipInProgressRef.current = false;
          return;
        }

        const expectedKey = backSkipInitialKeyRef.current;
        if (!expectedKey) {
          disarmBackSkipGuard();
          return;
        }

        const latestKey = getCurrentLocationKey();
        if (latestKey !== expectedKey) {
          disarmBackSkipGuard();
          return;
        }

        if (backSkipAttemptsRef.current >= backSkipMaxAttempts) {
          disarmBackSkipGuard();
          return;
        }

        backSkipAttemptsRef.current += 1;
        window.history.go(-1);
        window.setTimeout(skipBack, 0);
      };

      window.setTimeout(skipBack, 0);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      disarmBackSkipGuard();
    };
  }, [shouldSkipBackAfterStop]);

  useEffect(() => {
    if (!shouldBackClosePrototype || !isPlaying) return;

    const handleHashChange = () => {
      if (window.location.hash !== "#prototype") {
        window.history.replaceState(null, "", getCurrentLocationWithoutHash());
        setIsPlaying(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [shouldBackClosePrototype, isPlaying]);

  useEffect(() => {
    if (!shouldLockBrowserBack) return;

    if (!backGuardInitializedRef.current) {
      const currentState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};

      // Add one sentinel entry once so Back can be intercepted while prototype is mounted.
      if (currentState.__deviceMockupBackGuard !== backGuardTokenRef.current) {
        window.history.pushState(
          {
            ...currentState,
            __deviceMockupBackGuard: backGuardTokenRef.current,
          },
          "",
          window.location.href
        );
      }

      backGuardInitializedRef.current = true;
    }

    const resolveFallbackUrl = () => {
      try {
        if (document.referrer) {
          const referrer = new URL(document.referrer);
          const current = new URL(window.location.href);
          const samePage =
            referrer.pathname === current.pathname &&
            referrer.search === current.search &&
            referrer.hash === current.hash;

          if (referrer.origin === current.origin && !samePage) {
            return `${referrer.pathname}${referrer.search}${referrer.hash}`;
          }
        }
      } catch {
        // no-op
      }

      if (window.location.pathname.startsWith("/portfolio/")) return "/portfolio";
      return "/";
    };

    const handlePopState = () => {
      if (isHandlingBackRef.current) return;
      isHandlingBackRef.current = true;

      if (onBrowserBack) {
        onBrowserBack();
      } else {
        window.location.assign(resolveFallbackUrl());
      }

      window.setTimeout(() => {
        isHandlingBackRef.current = false;
      }, 200);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldLockBrowserBack, onBrowserBack]);

  useEffect(() => {
    if (!requiresInteractionToggle || !interactionEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInteractionEnabled(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target || !rootRef.current) return;
      if (!rootRef.current.contains(target)) {
        setInteractionEnabled(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [requiresInteractionToggle, interactionEnabled]);

  useEffect(() => {
    if (!shouldDeferIframeUntilPlay || !isPlaying) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleStopPlaying();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldDeferIframeUntilPlay, isPlaying]);

  const scrollGallery = (direction: "prev" | "next") => {
    if (!galleryRef.current) return;
    const step = galleryRef.current.clientWidth;
    galleryRef.current.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  const toggleFullscreen = async () => {
    if (!rootRef.current) return;

    if (document.fullscreenElement === rootRef.current) {
      await document.exitFullscreen().catch(() => undefined);
      return;
    }

    await rootRef.current.requestFullscreen().catch(() => undefined);
  };

  const handleImageLoad = (src: string, width: number, height: number) => {
    if (!width || !height) return;
    const ratio = width / height;
    setImageRatios((current) => {
      if (current[src] === ratio) return current;
      return { ...current, [src]: ratio };
    });
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "mx-auto",
        style.shellClassName,
        enableTilt &&
          "transition-transform duration-300 will-change-transform hover:[transform:perspective(1200px)_rotateX(2deg)_rotateY(-2deg)_translateY(-2px)]",
        className
      )}
    >
      {shouldDeferIframeUntilPlay ? (
        <div
          className={cn(
            "mb-3 flex justify-end overflow-hidden transition-all duration-200",
            shouldRenderTopControls ? "max-h-12 opacity-100" : "max-h-0 opacity-0 pointer-events-none mb-0"
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isPlaying ? "w-[78px] opacity-100" : "w-0 opacity-0"
              )}
            >
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="h-8 w-[78px] rounded-md bg-white/90 text-zinc-900 hover:bg-white"
                onClick={handleStopPlaying}
              >
                Stop
              </Button>
            </div>
            {shouldShowExitNavButton ? (
              <Button
                type="button"
                size="sm"
                className="h-8 rounded-md bg-primary px-3 text-primary-foreground hover:bg-primary/90"
                onClick={handleExitToPortfolio}
              >
                Back to Portfolio
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={style.frameClassName}>
        <div
          className={style.screenClassName}
          style={screenAspectRatio ? { aspectRatio: `${screenAspectRatio}` } : undefined}
        >
          {allowFullscreen && ((mode === "interactive" && !!iframeSrc) || (mode === "static" && hasGalleryItems)) ? (
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute right-3 top-3 z-30 h-8 w-8 rounded-md bg-white/90 text-zinc-900 hover:bg-white"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          ) : null}

          {requiresInteractionToggle ? (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className={cn(
                "absolute top-3 z-30 h-8 rounded-md bg-white/90 px-3 text-zinc-900 hover:bg-white",
                allowFullscreen ? "right-14" : "right-3"
              )}
              onClick={() => setInteractionEnabled((value) => !value)}
              aria-pressed={interactionEnabled}
            >
              {interactionEnabled ? "Exit prototype" : "Try prototype"}
            </Button>
          ) : null}

          {!hideNotch && style.notch === "iphone" ? <div className={style.notchClassName} /> : null}
          {!hideNotch && style.notch === "ipad" ? <div className={style.notchClassName} /> : null}

          {mode === "interactive" ? (
            iframeSrc ? (
              shouldDeferIframeUntilPlay && !isPlaying ? (
                <div className="flex h-full w-full items-center justify-center bg-black">
                  <div className="flex flex-col items-center gap-3">
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="h-16 w-16 rounded-full bg-white/95 text-black hover:bg-white"
                      onClick={handleStartPlaying}
                      aria-label="Play prototype"
                    >
                      <Play className="h-8 w-8 fill-current" />
                    </Button>
                    <p className="text-sm text-white/80">Play prototype</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={iframeSrc}
                  title={iframeTitle || `${type} prototype preview`}
                  loading="lazy"
                  allow="clipboard-read; clipboard-write; fullscreen"
                  allowFullScreen
                  className={cn(
                    "h-full w-full border-0 bg-black",
                    requiresInteractionToggle
                      ? interactionEnabled
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                      : disableEmbeddedNavigation
                        ? "pointer-events-none"
                        : ""
                  )}
                />
              )
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/70">
                Add `iframeSrc` to render interactive mode.
              </div>
            )
          ) : hasGalleryItems ? (
            <>
              <div
                ref={galleryRef}
                className={cn(
                  "flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                  "scroll-smooth"
                )}
              >
                {images.map((src, index) => (
                  <div key={`${src}-${index}`} className="h-full w-full shrink-0 snap-start">
                    {imageRatios[src] !== undefined && imageRatios[src] < screenRatio ? (
                      <div className="h-full w-full overflow-y-auto overflow-x-hidden touch-pan-y overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <img
                          src={src}
                          alt={`${type} mockup slide ${index + 1}`}
                          loading="lazy"
                          onLoad={(event) =>
                            handleImageLoad(
                              src,
                              event.currentTarget.naturalWidth,
                              event.currentTarget.naturalHeight
                            )
                          }
                          className="block w-full h-auto"
                        />
                      </div>
                    ) : (
                      <img
                        src={src}
                        alt={`${type} mockup slide ${index + 1}`}
                        loading="lazy"
                        onLoad={(event) =>
                          handleImageLoad(
                            src,
                            event.currentTarget.naturalWidth,
                            event.currentTarget.naturalHeight
                          )
                        }
                        className={cn(
                          "h-full w-full",
                          imageFit === "contain" ? "object-contain bg-black" : "object-cover"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {showArrows && images.length > 1 ? (
                <div className="pointer-events-none absolute inset-x-3 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="pointer-events-auto h-8 w-8 rounded-full bg-black/55 text-white hover:bg-black/70"
                    onClick={() => scrollGallery("prev")}
                    aria-label="Previous mockup image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="pointer-events-auto h-8 w-8 rounded-full bg-black/55 text-white hover:bg-black/70"
                    onClick={() => scrollGallery("next")}
                    aria-label="Next mockup image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/70">
              Add `images` to render static mode.
            </div>
          )}

          {mode === "interactive" && disableEmbeddedNavigation && interactiveHref && !requiresInteractionToggle ? (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-end justify-center p-4">
              <a
                href={interactiveHref}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto"
              >
                <Button
                  type="button"
                  size="sm"
                  className="gap-2 rounded-full bg-white/95 text-black hover:bg-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Interactive Prototype
                </Button>
              </a>
            </div>
          ) : null}
        </div>
      </div>

      {shouldDeferIframeUntilPlay && isPlaying ? (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Tip: Use Stop or Back to Portfolio to exit prototype (browser Back may navigate inside prototype).
        </p>
      ) : null}

      {style.hasLaptopBase ? (
        <>
          <div className="mx-auto h-2 w-[30%] rounded-b-full bg-zinc-700/85" />
          <div className="mx-auto -mt-1 h-2 w-[46%] rounded-full bg-zinc-800/80 blur-[0.5px]" />
        </>
      ) : null}
    </div>
  );
}
