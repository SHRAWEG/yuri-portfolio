/**
 * Resolves the Home "Selected work" lineup (`data/featured.ts`) into display
 * items. Server-only (reads photos).
 */
import { featured } from "@/data/featured";
import { categoryLabel, getProject, projectMeta } from "@/data/projects";
import { getSpacePlan } from "@/data/space-planning";
import { getProjectPhotos } from "@/lib/photos";
import { getPlanSheets } from "@/lib/work-folders";
import type { ImageAsset } from "@/lib/assets";

export type FeaturedItem = {
  key: string;
  href: string;
  eyebrow: string;
  title: string;
  meta: string;
  teaser: string;
  /** "photo" fills the frame; "drawing" sits uncropped on a pale mat. */
  kind: "photo" | "drawing";
  /** Main image(s): one photo, or up to two drawing sheets side by side. */
  images: ImageAsset[];
  /** A "before" photo tucked into the corner, for transformation projects. */
  before?: ImageAsset;
  cta: string;
};

/** First sentence of a paragraph. */
const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

export async function getFeaturedItems(): Promise<FeaturedItem[]> {
  const items = await Promise.all(
    featured.map(async (ref): Promise<FeaturedItem | undefined> => {
      if (ref.type === "project") {
        const project = getProject(ref.slug);
        if (!project) return undefined;
        const { cover, before } = await getProjectPhotos(project.slug);
        return {
          key: `project:${project.slug}`,
          href: `/projects/${project.slug}`,
          eyebrow: categoryLabel(project.category),
          title: project.name,
          meta: projectMeta(project),
          teaser: project.teaser ?? firstSentence(project.summary),
          kind: "photo",
          images: cover ? [cover] : [],
          before: before[0],
          cta: before.length ? "See the transformation" : "View project",
        };
      }
      const plan = getSpacePlan(ref.slug);
      if (!plan) return undefined;
      const sheets = await getPlanSheets(plan);
      // Portrait sheets pair up nicely side by side; a landscape one stands alone.
      const portrait = sheets[0] && sheets[0].height > sheets[0].width;
      return {
        key: `plan:${plan.slug}`,
        href: `/work/space-planning/${plan.slug}`,
        eyebrow: "Space Planning",
        title: plan.title,
        meta: [plan.location, `${sheets.length} sheet${sheets.length === 1 ? "" : "s"}`].filter(Boolean).join(" · "),
        teaser: plan.teaser,
        kind: "drawing",
        images: sheets.slice(0, portrait ? 2 : 1),
        cta: "View the plans",
      };
    }),
  );
  return items.filter((x): x is FeaturedItem => !!x);
}
