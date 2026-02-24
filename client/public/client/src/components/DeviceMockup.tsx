import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
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
      shellClassName: cn("w-full", isLandscape ? "max-w-[560px]" : "max-w-[340px]"),
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
  className,
}: DeviceMockupProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const resolvedOrientation: DeviceMockupOrientation =
    orientation ?? (type === "desktop" ? "landscape" : "portrait");
  const style = getDeviceStyles(type, resolvedOrientation);
  const screenRatio = useMemo(
    () => getDeviceScreenRatio(type, resolvedOrientation),
    [type, resolvedOrientation]
  );
  const hasGalleryItems = images.length > 0;

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

          {style.notch === "iphone" ? <div className={style.notchClassName} /> : null}
          {style.notch === "ipad" ? <div className={style.notchClassName} /> : null}

          {mode === "interactive" ? (
            iframeSrc ? (
              <iframe
                src={iframeSrc}
                title={iframeTitle || `${type} prototype preview`}
                loading="lazy"
                allow="clipboard-read; clipboard-write; fullscreen"
                allowFullScreen
                className="h-full w-full border-0 bg-black"
              />
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
        </div>
      </div>

      {style.hasLaptopBase ? (
        <>
          <div className="mx-auto h-2 w-[30%] rounded-b-full bg-zinc-700/85" />
          <div className="mx-auto -mt-1 h-2 w-[46%] rounded-full bg-zinc-800/80 blur-[0.5px]" />
        </>
      ) : null}
    </div>
  );
}
