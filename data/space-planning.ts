/**
 * Space-planning work — the "Space Planning" folder on `/work`. Each entry is
 * a set of drawings with its own page at `/work/space-planning/<slug>`.
 *
 * ── Adding a layout ──────────────────────────────────────────────────────
 * 1. Make a folder `public/space-planning/<slug>/` and put the drawings in it.
 * 2. Add an entry below. `sheets` lists the drawings in display order (the
 *    first is the cover on cards and the Home page). Width/height are read
 *    from the files at build time.
 * 3. Optionally set `project` to a project slug to link to its case study.
 * 4. Optionally add `sliders`: before/after pairs shown on the plan's page
 *    with a handle you drag to wipe from one drawing to the other (e.g.
 *    original → improved layout, or CAD → rendered plan). Both files in a
 *    pair must be the same size and line up exactly. Without `sliders`, the
 *    sheets are simply stacked.
 *
 * Order here = order on the page.
 */

export type PlanSlider = {
  /** Heading above the slider (e.g. "Ground Floor"). Omit for a lone slider. */
  title?: string;
  /** Short bullet notes shown beside the heading. */
  notes?: string[];
  /** Shown on the left of the handle. */
  under: { label: string; file: string };
  /** Revealed on the right of the handle. */
  over: { label: string; file: string };
};

export type SpacePlan = {
  slug: string;
  title: string;
  location?: string;
  /** One line for cards and the Home featured row. */
  teaser: string;
  /** The project description on the plan's page. */
  summary: string;
  /** File names inside `public/space-planning/<slug>/`, cover first. */
  sheets: string[];
  /** Slug of a related project, to link to its case study. */
  project?: string;
  /** Before/after sliders for the plan's page (see top of file). */
  sliders?: PlanSlider[];
};

export const spacePlans: SpacePlan[] = [
  {
    slug: "ghiraiya-layout-redesign",
    title: "Layout Redesign, Ghiraiya Residence",
    location: "Jhamsikhel, Lalitpur",
    teaser: "Three floors re-planned around aligned service ducts, with more private, client-tailored layouts.",
    summary:
      "This project showcases a comprehensive architectural layout redesign across the ground, first, and second floors. The original plan did not consider proper duct positions, meaning they were intruding into the upper or lower floors, which would have been a major challenge to manage pipes during construction. In fixing those vertical duct alignment issues across all levels, I also streamlined various other layout issues—such as reducing accessibility to more private spaces—while seamlessly incorporating specific client preferences like open closets and integrated bathrooms.",
    sheets: ["sheet-gf.webp", "sheet-ff.webp", "sheet-sf.webp"],
    project: "ghiraiya-residence-jhamsikhel",
    // The improved plan in each pair is aligned onto the original (scale + shift only).
    sliders: [
      {
        title: "Ground Floor",
        notes: ["Reduced accessibility to more private spaces.", "Provision of duct, aligning with upper floors."],
        under: { label: "Original", file: "gf-original.webp" },
        over: { label: "Improved", file: "gf-improved.webp" },
      },
      {
        title: "First Floor",
        notes: [
          "Introduction of proper ducts aligning with lower and upper floor plans.",
          "Incorporation of client's preferences with an open closet and bathroom.",
        ],
        under: { label: "Original", file: "ff-original.webp" },
        over: { label: "Improved", file: "ff-improved.webp" },
      },
      {
        title: "Second Floor",
        notes: ["Introduction of proper ducts aligning with lower floor plans."],
        under: { label: "Original", file: "sf-original.webp" },
        over: { label: "Improved", file: "sf-improved.webp" },
      },
    ],
  },
  {
    slug: "dalchowki-spa-layout",
    title: "Spa Layout, Resort Dalchowki",
    location: "Dalchowki, Lalitpur",
    teaser: "A spa planned from scratch on a wedge-shaped site, with private pocket gardens for every massage suite.",
    summary:
      "Designed from scratch for a luxury resort, this spa layout successfully transformed a challenging, highly irregular site boundary into a seamless, high-end wellness sanctuary. The planning cleverly utilizes the awkward wedge-like geometry to carve out a linear covered pathway that organizes the flow between reception, wet zones (steam, sauna, and jacuzzi), and individual/couple massage rooms. Integrating private pocket gardens into the massage suites turns the site's structural constraints into a unique biophilic feature.",
    sheets: ["rendered-hd.webp", "cad-hd.webp"],
    project: "resort-dalchowki",
    // cad-fitted-hd.webp is the CAD scaled and shifted (no rotation, shear or
    // warping, so the drawing stays square) to sit on the render, fitted on the
    // structural columns so the slider lines up.
    sliders: [
      {
        under: { label: "CAD drawing", file: "cad-fitted-hd.webp" },
        over: { label: "Rendered plan", file: "rendered-hd.webp" },
      },
    ],
  },
  {
    slug: "spa-beauty-parlor-barahi-sedi",
    title: "Spa & Beauty Parlor, Barahi Sedi",
    teaser: "A hotel spa and beauty parlor redesigned to keep quiet wellness rooms well away from busy salon zones.",
    summary:
      "This project involved a comprehensive functional redesign of an existing luxury hotel spa and beauty parlor. The redesign optimizes spatial flow, clearly segregating active service zones (salon, manicure/pedicure, and makeup stations) from tranquil wellness retreats (couple massage, salt room, singing bowl therapy, and private treatment rooms) to elevate the overall guest experience. A key acoustic and space-planning strategy was to isolate restorative, quiet zones—such as the salt room and singing bowl therapy room—far away from high-traffic, noisy areas like the reception and beauty parlor, ensuring a truly peaceful guest experience.",
    sheets: ["rendered-hd.webp", "cad-hd.webp", "old-fitted-hd.webp"],
    // old-fitted-hd.webp is the old layout (PDF) scaled and shifted onto the new
    // CAD's framing; the CAD and render were exported with the same framing.
    sliders: [
      {
        title: "The redesign",
        notes: ["Quiet wellness rooms moved away from reception and the salon."],
        under: { label: "Old layout", file: "old-fitted-hd.webp" },
        over: { label: "New layout", file: "cad-hd.webp" },
      },
      {
        title: "Drawing to render",
        under: { label: "CAD drawing", file: "cad-hd.webp" },
        over: { label: "Rendered plan", file: "rendered-hd.webp" },
      },
    ],
  },
];

export function getSpacePlan(slug: string): SpacePlan | undefined {
  return spacePlans.find((p) => p.slug === slug);
}
