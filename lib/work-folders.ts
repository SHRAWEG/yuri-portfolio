/**
 * The folders shown on `/work`: one per project category (that has projects),
 * plus a "Space planning" folder for layouts. Server-only (reads photos).
 */
import { categories, projects, type CategoryId, type Project } from "@/data/projects";
import { spacePlans, type SpacePlan } from "@/data/space-planning";
import { getProjectPhotos, getPublicImage } from "@/lib/photos";
import type { ImageAsset } from "@/lib/assets";

export const SPACE_PLANNING_SLUG = "space-planning";

export type WorkFolder = {
  slug: CategoryId | typeof SPACE_PLANNING_SLUG;
  label: string;
  blurb: string;
  /** e.g. "4 projects" / "3 layouts". */
  countLabel: string;
  /** Up to 3 images that peek out of the folder. */
  previews: ImageAsset[];
};

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export const SPACE_PLANNING_BLURB =
  "Before any finish or render, there’s the plan — how people arrive, move, gather and rest. These layouts show how I work out a space so it functions before it impresses.";

/** Folder slugs, for generateStaticParams. */
export function folderSlugs(): WorkFolder["slug"][] {
  const used = categories.filter((c) => projects.some((p) => p.category === c.id)).map((c) => c.id);
  return spacePlans.length > 0 ? [...used, SPACE_PLANNING_SLUG] : used;
}

export function projectsIn(category: CategoryId): Project[] {
  return projects.filter((p) => p.category === category);
}

export type LoadedPlan = { plan: SpacePlan; sheets: ImageAsset[] };

/** A plan's sheets that exist on disk, with dimensions (cover first). */
export async function getPlanSheets(plan: SpacePlan): Promise<ImageAsset[]> {
  const sheets = await Promise.all(plan.sheets.map((f) => getPublicImage(`/space-planning/${plan.slug}/${f}`)));
  return sheets.filter((x): x is ImageAsset => !!x);
}

/** Every space plan that has at least one sheet on disk. */
export async function loadSpacePlans(): Promise<LoadedPlan[]> {
  const loaded = await Promise.all(spacePlans.map(async (plan) => ({ plan, sheets: await getPlanSheets(plan) })));
  return loaded.filter((p) => p.sheets.length > 0);
}

export async function getWorkFolders(): Promise<WorkFolder[]> {
  const folders: WorkFolder[] = await Promise.all(
    categories
      .map((c) => ({ c, items: projectsIn(c.id) }))
      .filter(({ items }) => items.length > 0)
      .map(async ({ c, items }) => {
        const covers = await Promise.all(items.slice(0, 3).map((p) => getProjectPhotos(p.slug).then((x) => x.cover)));
        return {
          slug: c.id,
          label: c.label,
          blurb: c.blurb,
          countLabel: plural(items.length, "project"),
          previews: covers.filter((x): x is ImageAsset => !!x),
        } satisfies WorkFolder;
      }),
  );

  const plans = await loadSpacePlans();
  if (plans.length > 0) {
    folders.push({
      slug: SPACE_PLANNING_SLUG,
      label: "Space Planning",
      blurb: SPACE_PLANNING_BLURB,
      countLabel: plural(plans.length, "layout"),
      previews: plans.slice(0, 3).map((p) => p.sheets[0]),
    });
  }
  return folders;
}

/** A plan's slider with both drawings resolved to ImageAssets. */
export type ResolvedSlider = {
  title?: string;
  notes: string[];
  under: { label: string; image: ImageAsset };
  over: { label: string; image: ImageAsset };
};

/**
 * Resolve a plan's `sliders`. Returns undefined when there are none or a file
 * is missing, so the page falls back to plain stacked sheets.
 */
export async function getPlanSliders(plan: SpacePlan): Promise<ResolvedSlider[] | undefined> {
  if (!plan.sliders?.length) return undefined;
  const img = (file: string) => getPublicImage(`/space-planning/${plan.slug}/${file}`);
  const resolved = await Promise.all(
    plan.sliders.map(async (s) => {
      const [under, over] = await Promise.all([img(s.under.file), img(s.over.file)]);
      return under && over
        ? {
            title: s.title,
            notes: s.notes ?? [],
            under: { label: s.under.label, image: under },
            over: { label: s.over.label, image: over },
          }
        : undefined;
    }),
  );
  return resolved.every(Boolean) ? (resolved as ResolvedSlider[]) : undefined;
}
