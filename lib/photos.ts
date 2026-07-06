/**
 * Build-time project photo discovery.
 *
 * Photos live in `public/projects/<slug>/`. This reads that folder and every
 * image's real pixel dimensions (via sharp) at build time, so project data
 * never has to hard-code image paths or width/height — you just drop files in.
 *
 * Conventions:
 *  - A file named `hero.*` becomes the cover (grid thumbnail + detail hero).
 *    With no `hero.*`, the first image (natural sort) is used as the cover.
 *  - Every other image becomes a gallery photo, ordered by filename
 *    (natural/numeric sort, so `2.webp` comes before `10.webp`).
 *
 * Server-only: uses `node:fs` and `sharp`, and only runs during static
 * generation. Do not import from a Client Component.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import type { ImageAsset } from "./assets";

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const IMAGE_RE = /\.(webp|avif|png|jpe?g)$/i;

export type ProjectPhotos = {
  /** Cover image (card thumbnail + detail hero), if the folder has any photos. */
  cover?: ImageAsset;
  /** Remaining photos for the detail-page gallery, in filename order. */
  gallery: ImageAsset[];
};

async function toAsset(slug: string, file: string): Promise<ImageAsset> {
  const { width, height } = await sharp(path.join(PROJECTS_DIR, slug, file)).metadata();
  if (!width || !height) {
    throw new Error(`Could not read dimensions for /projects/${slug}/${file}`);
  }
  return { src: `/projects/${slug}/${file}`, width, height };
}

export async function getProjectPhotos(slug: string): Promise<ProjectPhotos> {
  let files: string[];
  try {
    files = fs.readdirSync(path.join(PROJECTS_DIR, slug)).filter((f) => IMAGE_RE.test(f));
  } catch {
    return { gallery: [] }; // no folder yet → placeholders render
  }

  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const heroFile = files.find((f) => /^hero\./i.test(f)) ?? files[0];
  const galleryFiles = files.filter((f) => f !== heroFile);

  const [cover, gallery] = await Promise.all([
    heroFile ? toAsset(slug, heroFile) : Promise.resolve(undefined),
    Promise.all(galleryFiles.map((f) => toAsset(slug, f))),
  ]);

  return { cover, gallery };
}
