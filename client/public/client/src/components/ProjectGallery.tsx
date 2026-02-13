import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Pause, Play, RotateCcw, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ProjectGalleryMedia =
  | string
  | {
      type?: "image" | "video";
      src: string;
      alt?: string;
      poster?: string;
    };

type NormalizedMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v"];

function inferTypeFromSrc(src: string): "image" | "video" {
  const normalized = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => normalized.endsWith(ext)) ? "video" : "image";
}

function normalizeItem(item: ProjectGalleryMedia, index: number): NormalizedMedia {
  if (typeof item === "string") {
    return {
      type: inferTypeFromSrc(item),
      src: item,
      alt: `Gallery item ${index + 1}`,
    };
  }

  return {
    type: item.type ?? inferTypeFromSrc(item.src),
    src: item.src,
    alt: item.alt ?? `Gallery item ${index + 1}`,
    poster: item.poster,
  };
}

type ProjectGalleryProps = {
  items: ProjectGalleryMedia[];
};

export default function ProjectGallery({ items }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const normalizedItems = useMemo(
    () => items.map((item, index) => normalizeItem(item, index)),
    [items]
  );

  const activeItem = activeIndex !== null ? normalizedItems[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) {
      setIsPlaying(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const closeViewer = () => {
    setActiveIndex(null);
  };

  const seekBy = (deltaSeconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const nextTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + deltaSeconds));
    video.currentTime = nextTime;
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {normalizedItems.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group rounded-xl overflow-hidden border border-white/10 bg-card/35 hover:border-primary/40 transition-colors text-left"
          >
            <div className="h-56 w-full flex items-center justify-center bg-background/20 p-2">
              {item.type === "video" ? (
                <div className="relative max-h-full max-w-full">
                  <video
                    src={item.src}
                    poster={item.poster}
                    preload="metadata"
                    muted
                    playsInline
                    className="max-h-[208px] max-w-full h-auto w-auto object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full bg-black/55 p-3 text-white">
                      <Play className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="max-h-[208px] max-w-full h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {activeItem && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] bg-white/45 dark:bg-background/80 backdrop-blur-md"
              onClick={closeViewer}
            >
              <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />

              <button
                type="button"
                onClick={closeViewer}
                className="absolute top-4 right-4 z-[101] rounded-full p-2 text-foreground bg-background/70 hover:bg-background transition-colors"
                aria-label="Close media viewer"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className="relative z-[101] min-h-screen flex items-center justify-center p-4"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex flex-col items-center gap-3">
                  {activeItem.type === "video" ? (
                    <>
                      <video
                        ref={videoRef}
                        src={activeItem.src}
                        poster={activeItem.poster}
                        controls
                        autoPlay
                        playsInline
                        className="max-h-[82vh] max-w-[95vw] h-auto w-auto object-contain rounded-lg shadow-2xl"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />

                      <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-2 py-1 backdrop-blur-sm">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => seekBy(-10)}
                          className="rounded-full"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          10s
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={togglePlayPause}
                          className="rounded-full"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="h-4 w-4 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" />
                              Play
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => seekBy(10)}
                          className="rounded-full"
                        >
                          <RotateCw className="h-4 w-4 mr-1" />
                          10s
                        </Button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={activeItem.src}
                      alt={activeItem.alt}
                      className="max-h-[88vh] max-w-[95vw] h-auto w-auto object-contain rounded-lg shadow-2xl"
                    />
                  )}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
