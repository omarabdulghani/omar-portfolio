import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type PdfFlipbookModalProps = {
  isOpen: boolean;
  pdfUrl: string | null;
  title?: string;
  onClose: () => void;
};

type PdfFlipbookLinkProps = PropsWithChildren<{
  href: string;
  title?: string;
  className?: string;
}>;

type BookPageProps = {
  src: string;
  pageNumber: number;
};

const BookPage = forwardRef<HTMLDivElement, BookPageProps>(function BookPage(
  { src, pageNumber },
  ref
) {
  return (
    <div
      ref={ref}
      className="h-full w-full bg-white overflow-hidden border border-black/5 shadow-sm"
    >
      <img
        src={src}
        alt={`PDF page ${pageNumber}`}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
});

function isPdfUrl(url: string): boolean {
  return /\.pdf(\?|$)/i.test(url);
}

export function PdfFlipbookLink({
  href,
  title,
  className,
  children,
}: PdfFlipbookLinkProps) {
  const [open, setOpen] = useState(false);
  const shouldOpenFlipbook = isPdfUrl(href);

  return (
    <>
      <a
        href={href}
        className={className}
        onClick={(event) => {
          if (!shouldOpenFlipbook) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>

      <PdfFlipbookModal
        isOpen={open}
        pdfUrl={shouldOpenFlipbook ? href : null}
        title={title}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default function PdfFlipbookModal({
  isOpen,
  pdfUrl,
  title,
  onClose,
}: PdfFlipbookModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [bookSize, setBookSize] = useState({ width: 420, height: 560 });
  const [currentPage, setCurrentPage] = useState(1);
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen || !pdfUrl) return;

    let cancelled = false;

    const loadPdfPages = async () => {
      setLoading(true);
      setError(null);
      setPages([]);
      setCurrentPage(1);

      try {
        const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
        if (pdfjs.GlobalWorkerOptions.workerSrc !== pdfWorkerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
        }

        const task = pdfjs.getDocument({ url: pdfUrl, withCredentials: false });
        const pdf = await task.promise;
        const renderedPages: string[] = [];
        let nextSize = { width: 420, height: 560 };

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });

          if (pageNumber === 1) {
            const ratio = baseViewport.width / baseViewport.height;
            const targetHeight = 560;
            const calculatedWidth = Math.round(targetHeight * ratio);
            nextSize = {
              width: Math.min(860, Math.max(320, calculatedWidth)),
              height: targetHeight,
            };
          }

          const scale = Math.max(1.25, Math.min(2, 1400 / baseViewport.width));
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Could not render PDF page");

          await page.render({ canvasContext: context, viewport }).promise;
          renderedPages.push(canvas.toDataURL("image/jpeg", 0.9));
          page.cleanup();
        }

        await pdf.destroy();

        if (cancelled) return;
        setBookSize(nextSize);
        setPages(renderedPages);
      } catch {
        if (!cancelled) {
          setError("Could not load this PDF.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPdfPages();

    return () => {
      cancelled = true;
    };
  }, [isOpen, pdfUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        flipBookRef.current?.pageFlip()?.flipPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        flipBookRef.current?.pageFlip()?.flipNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const pageCount = pages.length;
  const modalTitle = useMemo(() => {
    if (title) return title;
    if (!pdfUrl) return "PDF";
    const fileName = decodeURIComponent(pdfUrl.split("/").pop()?.split("?")[0] ?? "PDF");
    return fileName.replace(/\.pdf$/i, "");
  }, [title, pdfUrl]);

  if (!isOpen || !pdfUrl || typeof document === "undefined") return null;

  const stopClose = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] bg-white/45 dark:bg-background/80 backdrop-blur-md">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label="Close PDF viewer"
      />

      <div className="relative z-[121] min-h-screen flex items-center justify-center p-4 md:p-6">
        <div
          className="w-full max-w-[1200px] rounded-2xl border border-white/20 bg-background/85 shadow-2xl backdrop-blur-md overflow-hidden"
          onClick={stopClose}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3 md:px-5">
            <p className="font-medium text-sm md:text-base truncate">{modalTitle}</p>
            <div className="flex items-center gap-2 shrink-0">
              <a href={pdfUrl} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open
                </Button>
              </a>
              <Button size="icon" variant="outline" onClick={onClose} aria-label="Close PDF viewer">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="px-3 py-4 md:px-5 md:py-5">
            {loading ? (
              <div className="h-[55vh] flex items-center justify-center text-muted-foreground">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Loading PDF...
              </div>
            ) : error ? (
              <div className="h-[55vh] flex flex-col items-center justify-center text-center px-6">
                <p className="font-semibold mb-2">Preview unavailable</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  <Button>Open PDF</Button>
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <HTMLFlipBook
                    ref={flipBookRef}
                    width={bookSize.width}
                    height={bookSize.height}
                    size="stretch"
                    minWidth={260}
                    maxWidth={920}
                    minHeight={360}
                    maxHeight={1240}
                    maxShadowOpacity={0.35}
                    drawShadow
                    flippingTime={650}
                    usePortrait
                    showCover={false}
                    mobileScrollSupport
                    clickEventForward
                    className="mx-auto"
                    onFlip={(event: any) => setCurrentPage((event?.data ?? 0) + 1)}
                  >
                    {pages.map((src, index) => (
                      <BookPage key={`${index + 1}-${src.slice(0, 16)}`} src={src} pageNumber={index + 1} />
                    ))}
                  </HTMLFlipBook>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => flipBookRef.current?.pageFlip()?.flipPrev()}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>
                  <p className="text-xs text-muted-foreground min-w-[90px] text-center">
                    {pageCount ? `${currentPage} / ${pageCount}` : "- / -"}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => flipBookRef.current?.pageFlip()?.flipNext()}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

