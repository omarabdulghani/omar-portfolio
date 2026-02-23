import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DeviceMockupType = "ipad" | "iphone" | "desktop";
export type DeviceMockupMode = "static" | "interactive";

type DeviceMockupProps = {
  type: DeviceMockupType;
  mode: DeviceMockupMode;
  images?: string[];
  iframeSrc?: string;
  iframeTitle?: string;
  showArrows?: boolean;
  enableTilt?: boolean;
  imageFit?: "cover" | "contain";
  className?: string;
};

type DeviceStyleConfig = {
  shellClassName: string;
  frameClassName: string;
  screenClassName: string;
  notch?: "iphone" | "ipad";
  hasLaptopBase?: boolean;
};

const DEVICE_STYLES: Record<DeviceMockupType, DeviceStyleConfig> = {
  iphone: {
    shellClassName: "w-full max-w-[340px]",
    frameClassName:
      "rounded-[2.4rem] border border-white/20 bg-zinc-900 p-[10px] shadow-[0_18px_45px_rgba(2,6,23,0.35)]",
    screenClassName: "relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-black",
    notch: "iphone",
  },
  ipad: {
    shellClassName: "w-full max-w-[560px]",
    frameClassName:
      "rounded-[2rem] border border-white/20 bg-zinc-900 p-[12px] shadow-[0_18px_45px_rgba(2,6,23,0.35)]",
    screenClassName: "relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-black",
    notch: "ipad",
  },
  desktop: {
    shellClassName: "w-full max-w-[980px]",
    frameClassName:
      "rounded-[1.25rem] border border-white/20 bg-zinc-900 p-[12px] shadow-[0_18px_45px_rgba(2,6,23,0.35)]",
    screenClassName: "relative aspect-[16/10] overflow-hidden rounded-[0.9rem] bg-black",
    hasLaptopBase: true,
  },
};

export default function DeviceMockup({
  type,
  mode,
  images = [],
  iframeSrc,
  iframeTitle,
  showArrows = false,
  enableTilt = true,
  imageFit = "cover",
  className,
}: DeviceMockupProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const style = DEVICE_STYLES[type];
  const hasGalleryItems = images.length > 0;

  const scrollGallery = (direction: "prev" | "next") => {
    if (!galleryRef.current) return;
    const step = Math.max(160, Math.floor(galleryRef.current.clientWidth * 0.92));
    galleryRef.current.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "mx-auto",
        style.shellClassName,
        enableTilt &&
          "transition-transform duration-300 will-change-transform hover:[transform:perspective(1200px)_rotateX(2deg)_rotateY(-2deg)_translateY(-2px)]",
        className
      )}
    >
      <div className={style.frameClassName}>
        <div className={style.screenClassName}>
          {style.notch === "iphone" ? (
            <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-black/85 ring-1 ring-white/10" />
          ) : null}
          {style.notch === "ipad" ? (
            <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-zinc-700 ring-1 ring-white/20" />
          ) : null}

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
                    <img
                      src={src}
                      alt={`${type} mockup slide ${index + 1}`}
                      loading="lazy"
                      className={cn(
                        "h-full w-full",
                        imageFit === "contain" ? "object-contain bg-black" : "object-cover"
                      )}
                    />
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

