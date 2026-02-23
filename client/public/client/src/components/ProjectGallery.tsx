import {
  useCallback,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type MediaType = "image" | "video" | "document";

export type ProjectGalleryMedia =
  | string
  | {
      type?: MediaType;
      src: string;
      alt?: string;
      poster?: string;
      title?: string;
    };

type NormalizedMedia = {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  title: string;
  poster?: string;
};

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v"];
const POSTER_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];
const DOCUMENT_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".txt",
  ".rtf",
];

function inferTypeFromSrc(src: string): MediaType {
  const normalized = src.split("?")[0].toLowerCase();
  if (VIDEO_EXTENSIONS.some((ext) => normalized.endsWith(ext))) return "video";
  if (DOCUMENT_EXTENSIONS.some((ext) => normalized.endsWith(ext))) return "document";
  return "image";
}

function isPdfSrc(src: string): boolean {
  return src.split("?")[0].toLowerCase().endsWith(".pdf");
}

function titleFromSrc(src: string): string {
  const rawFile = src.split("/").pop()?.split("?")[0] ?? "Media";
  const decoded = decodeURIComponent(rawFile);
  const noExt = decoded.replace(/\.[^/.]+$/, "");
  const cleaned = noExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return cleaned || "Media";
}

function getPosterCandidatesFromVideoSrc(src: string): string[] {
  const [pathname, query = ""] = src.split("?");
  const base = pathname.replace(/\.[^/.]+$/, "");
  const suffix = query ? `?${query}` : "";

  // Convention for future galleries: /images/video-name.mp4 -> /images/video-name-poster.(webp|jpg|jpeg|png)
  return POSTER_EXTENSIONS.map((ext) => `${base}-poster${ext}${suffix}`);
}

function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

function normalizeItem(item: ProjectGalleryMedia, index: number): NormalizedMedia {
  if (typeof item === "string") {
    const type = inferTypeFromSrc(item);
    const title = titleFromSrc(item);
    return {
      id: `${index}-${item}`,
      type,
      src: item,
      title,
      alt: title,
    };
  }

  const type = item.type ?? inferTypeFromSrc(item.src);
  const title = item.title ?? titleFromSrc(item.src);
  return {
    id: `${index}-${item.src}`,
    type,
    src: item.src,
    title,
    alt: item.alt ?? title,
    poster: item.poster,
  };
}

type ProjectGalleryProps = {
  items: ProjectGalleryMedia[];
  fallbackPoster?: string;
};

export type ProjectGalleryHandle = {
  openBySrc: (src: string, options?: { alt?: string; poster?: string; title?: string }) => void;
};

const ProjectGallery = forwardRef<ProjectGalleryHandle, ProjectGalleryProps>(function ProjectGallery(
  { items, fallbackPoster },
  ref
) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [externalActiveItem, setExternalActiveItem] = useState<NormalizedMedia | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoVideoPosters, setAutoVideoPosters] = useState<Record<string, string | null>>({});
  const [videoThumbnails, setVideoThumbnails] = useState<Record<string, string>>({});
  const [documentThumbnails, setDocumentThumbnails] = useState<Record<string, string | null>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const groupedMedia = useMemo(() => {
    const mapped = items.map((item, index) => normalizeItem(item, index));
    const videos = mapped.filter((item) => item.type === "video");
    const images = mapped.filter((item) => item.type === "image");
    const documents = mapped.filter((item) => item.type === "document");
    return {
      videos,
      images,
      documents,
      ordered: [...videos, ...images, ...documents],
    };
  }, [items]);

  const orderedMedia = groupedMedia.ordered;
  const activeItem =
    externalActiveItem ?? (activeIndex !== null ? orderedMedia[activeIndex] : null);

  useImperativeHandle(
    ref,
    () => ({
      openBySrc: (src: string, options?: { alt?: string; poster?: string; title?: string }) => {
        if (inferTypeFromSrc(src) === "document") {
          window.open(src, "_blank", "noopener,noreferrer");
          return;
        }

        const index = orderedMedia.findIndex((item) => item.src === src);
        if (index >= 0) {
          setExternalActiveItem(null);
          setActiveIndex(index);
          return;
        }

        setActiveIndex(null);
        setExternalActiveItem({
          id: `external-${src}`,
          type: inferTypeFromSrc(src),
          src,
          alt: options?.alt ?? titleFromSrc(src),
          title: options?.title ?? titleFromSrc(src),
          poster: options?.poster,
        });
      },
    }),
    [orderedMedia]
  );

  useEffect(() => {
    let cancelled = false;

    const findPosterForVideo = async (src: string): Promise<string | null> => {
      const candidates = getPosterCandidatesFromVideoSrc(src);
      for (const candidate of candidates) {
        const exists = await checkImageExists(candidate);
        if (exists) return candidate;
      }
      return null;
    };

    const videosToCheck = orderedMedia.filter(
      (item) => item.type === "video" && !item.poster && autoVideoPosters[item.src] === undefined
    );

    if (!videosToCheck.length) return;

    const run = async () => {
      for (const item of videosToCheck) {
        const poster = await findPosterForVideo(item.src);
        if (cancelled) return;
        setAutoVideoPosters((prev) => {
          if (prev[item.src] !== undefined) return prev;
          return { ...prev, [item.src]: poster };
        });
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [orderedMedia, autoVideoPosters]);

  useEffect(() => {
    let cancelled = false;

    const createVideoThumbnail = async (src: string): Promise<string | null> => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");

        const cleanup = () => {
          video.removeAttribute("src");
          video.load();
        };

        const captureFrame = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            if (!canvas.width || !canvas.height) {
              cleanup();
              resolve(null);
              return;
            }
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              cleanup();
              resolve(null);
              return;
            }
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const data = canvas.toDataURL("image/jpeg", 0.9);
            cleanup();
            resolve(data);
          } catch {
            cleanup();
            resolve(null);
          }
        };

        video.addEventListener("loadedmetadata", () => {
          const seekTime =
            Number.isFinite(video.duration) && video.duration > 0 ? Math.min(1, video.duration / 4) : 0;

          if (seekTime <= 0) {
            captureFrame();
            return;
          }

          const fallbackTimer = window.setTimeout(() => {
            captureFrame();
          }, 1200);

          const onSeeked = () => {
            window.clearTimeout(fallbackTimer);
            captureFrame();
          };

          video.addEventListener("seeked", onSeeked, { once: true });
          try {
            video.currentTime = seekTime;
          } catch {
            window.clearTimeout(fallbackTimer);
            captureFrame();
          }
        });

        video.addEventListener("error", () => {
          cleanup();
          resolve(null);
        });
      });
    };

    const missingVideoThumbs = orderedMedia.filter((item) => {
      if (item.type !== "video" || item.poster || videoThumbnails[item.src]) return false;
      return autoVideoPosters[item.src] === null;
    });

    if (!missingVideoThumbs.length) return;

    const run = async () => {
      for (const item of missingVideoThumbs) {
        const thumb = await createVideoThumbnail(item.src);
        if (!thumb || cancelled) continue;
        setVideoThumbnails((prev) => {
          if (prev[item.src]) return prev;
          return { ...prev, [item.src]: thumb };
        });
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [orderedMedia, videoThumbnails, autoVideoPosters]);

  useEffect(() => {
    let cancelled = false;

    const pdfItemsToRender = orderedMedia.filter(
      (item) => item.type === "document" && isPdfSrc(item.src) && documentThumbnails[item.src] === undefined
    );

    if (!pdfItemsToRender.length) return;

    const run = async () => {
      const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
      if (pdfjs.GlobalWorkerOptions.workerSrc !== pdfWorkerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
      }

      for (const item of pdfItemsToRender) {
        try {
          const loadingTask = pdfjs.getDocument({
            url: item.src,
            withCredentials: false,
          });
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);

          const baseViewport = page.getViewport({ scale: 1 });
          const maxThumbWidth = 900;
          const scale = Math.max(0.5, Math.min(2, maxThumbWidth / baseViewport.width));
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Canvas context unavailable");

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;

          const preview = canvas.toDataURL("image/jpeg", 0.85);
          page.cleanup();
          await pdf.destroy();

          if (cancelled) return;
          setDocumentThumbnails((prev) => {
            if (prev[item.src] !== undefined) return prev;
            return { ...prev, [item.src]: preview };
          });
        } catch {
          if (cancelled) return;
          setDocumentThumbnails((prev) => {
            if (prev[item.src] !== undefined) return prev;
            return { ...prev, [item.src]: null };
          });
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [orderedMedia, documentThumbnails]);

  const getVideoPoster = (item: NormalizedMedia) => {
    const autoPoster = autoVideoPosters[item.src] ?? undefined;
    return item.poster || autoPoster || videoThumbnails[item.src] || fallbackPoster;
  };

  const getDocumentPreview = (item: NormalizedMedia) => {
    if (!isPdfSrc(item.src)) return null;
    return documentThumbnails[item.src] ?? null;
  };

  const canNavigate = orderedMedia.length > 1 && activeIndex !== null;

  const goToPrevious = useCallback(() => {
    if (activeIndex === null || orderedMedia.length < 2) return;
    setExternalActiveItem(null);
    setActiveIndex((activeIndex - 1 + orderedMedia.length) % orderedMedia.length);
  }, [activeIndex, orderedMedia.length]);

  const goToNext = useCallback(() => {
    if (activeIndex === null || orderedMedia.length < 2) return;
    setExternalActiveItem(null);
    setActiveIndex((activeIndex + 1) % orderedMedia.length);
  }, [activeIndex, orderedMedia.length]);

  useEffect(() => {
    if (!activeItem || activeItem.type === "document") {
      setIsPlaying(false);
    }

    if (!activeItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setExternalActiveItem(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem, goToNext, goToPrevious]);

  const closeViewer = () => {
    setActiveIndex(null);
    setExternalActiveItem(null);
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

  const openItem = (item: NormalizedMedia) => {
    if (item.type === "document") {
      window.open(item.src, "_blank", "noopener,noreferrer");
      return;
    }
    setExternalActiveItem(null);
    setActiveIndex(orderedMedia.findIndex((entry) => entry.id === item.id));
  };

  const renderMediaCard = (item: NormalizedMedia) => (
    <button
      key={item.id}
      type="button"
      onClick={() => openItem(item)}
      className="group rounded-xl overflow-hidden border border-white/10 bg-card/35 hover:border-primary/40 transition-colors text-left"
    >
      <div className="h-56 w-full overflow-hidden bg-background/20">
        {item.type === "video" ? (
          <div className="relative h-full w-full">
            {getVideoPoster(item) ? (
              <img
                src={getVideoPoster(item)}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            ) : (
              <video
                src={item.src}
                preload="metadata"
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-black/55 p-3 text-white">
                <Play className="h-5 w-5" />
              </span>
            </div>
          </div>
        ) : item.type === "image" ? (
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          getDocumentPreview(item) ? (
            <img
              src={getDocumentPreview(item) as string}
              alt={`${item.alt} first page preview`}
              className="h-full w-full object-contain bg-white/60 dark:bg-background/40 transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center gap-3 px-4 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <FileText className="h-7 w-7" />
              </span>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {item.src.split("?")[0].split(".").pop()?.toUpperCase() || "FILE"}
              </p>
            </div>
          )
        )}
      </div>
      <div className="border-t border-white/10 px-3 py-2">
        <p className="text-sm font-medium text-foreground line-clamp-2">{item.title}</p>
      </div>
    </button>
  );

  return (
    <>
      <div className="space-y-8">
        {groupedMedia.videos.length > 0 ? (
          <section className="space-y-3">
            <h3 className="text-lg font-heading font-semibold">Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupedMedia.videos.map(renderMediaCard)}
            </div>
          </section>
        ) : null}

        {groupedMedia.images.length > 0 ? (
          <section className="space-y-3">
            <h3 className="text-lg font-heading font-semibold">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupedMedia.images.map(renderMediaCard)}
            </div>
          </section>
        ) : null}

        {groupedMedia.documents.length > 0 ? (
          <section className="space-y-3">
            <h3 className="text-lg font-heading font-semibold">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupedMedia.documents.map(renderMediaCard)}
            </div>
          </section>
        ) : null}
      </div>

      {activeItem && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[100] bg-white/45 dark:bg-background/80 backdrop-blur-md select-none caret-transparent">
              <button
                type="button"
                onClick={closeViewer}
                aria-label="Close media viewer"
                className="absolute inset-0 z-[100] h-full w-full cursor-default"
              />

              <div className="absolute inset-0 bg-black/20 dark:bg-black/30 pointer-events-none" />

              {canNavigate ? (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goToPrevious();
                    }}
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[103] rounded-full p-2 text-foreground bg-background/70 hover:bg-background transition-colors"
                    aria-label="Previous media item"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[103] rounded-full p-2 text-foreground bg-background/70 hover:bg-background transition-colors"
                    aria-label="Next media item"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              ) : null}

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  closeViewer();
                }}
                className="absolute top-4 right-4 z-[103] rounded-full p-2 text-foreground bg-background/70 hover:bg-background transition-colors"
                aria-label="Close media viewer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-[102] min-h-screen flex items-center justify-center p-4 pointer-events-none">
                <div
                  className="flex flex-col items-center gap-3 pointer-events-auto"
                  onClick={(event) => event.stopPropagation()}
                >
                  {activeItem.type === "video" ? (
                    <>
                      <video
                        ref={videoRef}
                        src={activeItem.src}
                        poster={getVideoPoster(activeItem)}
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
                  ) : activeItem.type === "document" ? (
                    <div className="max-h-[88vh] max-w-[95vw] rounded-lg shadow-2xl overflow-hidden bg-background/85 border border-border/40">
                      {isPdfSrc(activeItem.src) && getDocumentPreview(activeItem) ? (
                        <img
                          src={getDocumentPreview(activeItem) as string}
                          alt={`${activeItem.alt} first page preview`}
                          className="max-h-[78vh] max-w-[95vw] h-auto w-auto object-contain bg-white/50 dark:bg-background/40"
                        />
                      ) : (
                        <div className="h-[50vh] w-[min(90vw,720px)] flex flex-col items-center justify-center gap-4 px-6 text-center">
                          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <FileText className="h-8 w-8" />
                          </span>
                          <p className="text-xl font-semibold">{activeItem.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Preview unavailable for this document type.
                          </p>
                        </div>
                      )}

                      <div className="border-t border-border/50 p-4 flex justify-center">
                        <a href={activeItem.src} target="_blank" rel="noreferrer">
                          <Button type="button" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Open Document
                          </Button>
                        </a>
                      </div>
                    </div>
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
});

export default ProjectGallery;
