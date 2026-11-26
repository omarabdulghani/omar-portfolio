// The app imports the ESM build path directly; it has the same API as the package root.
declare module "pdfjs-dist/build/pdf.mjs" {
  export * from "pdfjs-dist";
}
