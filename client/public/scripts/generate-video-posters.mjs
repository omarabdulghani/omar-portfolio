import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov", ".m4v"]);
const POSTER_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];
const FORCE = process.argv.includes("--force");
const SEEK_SECONDS = Number(process.env.POSTER_SEEK_SECONDS ?? "1");

const IMAGES_ROOT = path.resolve(process.cwd(), "client/public/images");

function walkFiles(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

function runFfmpeg(inputPath, outputPath, seekSeconds) {
  const args = [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-ss",
    String(seekSeconds),
    "-i",
    inputPath,
    "-frames:v",
    "1",
    "-q:v",
    "3",
    outputPath,
  ];

  return spawnSync("ffmpeg", args, { stdio: "pipe" });
}

if (!existsSync(IMAGES_ROOT)) {
  console.error(`Images folder not found: ${IMAGES_ROOT}`);
  process.exit(1);
}

const allFiles = walkFiles(IMAGES_ROOT);
const videos = allFiles.filter((filePath) =>
  VIDEO_EXTENSIONS.has(path.extname(filePath).toLowerCase())
);

if (!videos.length) {
  console.log("No videos found in client/public/images.");
  process.exit(0);
}

let generated = 0;
let skipped = 0;
let failed = 0;

for (const videoPath of videos) {
  const extension = path.extname(videoPath);
  const baseWithoutExt = videoPath.slice(0, -extension.length);
  const desiredPoster = `${baseWithoutExt}-poster.jpg`;

  const existingPoster = POSTER_EXTENSIONS.some((posterExt) =>
    existsSync(`${baseWithoutExt}-poster${posterExt}`)
  );

  if (!FORCE && existingPoster) {
    skipped += 1;
    continue;
  }

  const attemptOne = runFfmpeg(videoPath, desiredPoster, SEEK_SECONDS);
  const firstAttemptOk = attemptOne.status === 0 && existsSync(desiredPoster);

  if (firstAttemptOk) {
    generated += 1;
    continue;
  }

  const attemptTwo = runFfmpeg(videoPath, desiredPoster, 0);
  const secondAttemptOk = attemptTwo.status === 0 && existsSync(desiredPoster);

  if (secondAttemptOk) {
    generated += 1;
    continue;
  }

  failed += 1;
  const relativePath = path.relative(IMAGES_ROOT, videoPath);
  const errorMessage =
    attemptTwo.stderr?.toString("utf8").trim() ||
    attemptOne.stderr?.toString("utf8").trim() ||
    "Unknown ffmpeg error";
  console.error(`Failed poster for ${relativePath}: ${errorMessage}`);
}

console.log(`Posters generated: ${generated}`);
console.log(`Posters skipped: ${skipped}`);
console.log(`Posters failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}

