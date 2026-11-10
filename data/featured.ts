/**
 * Home page "Selected work" — the hand-picked lineup, in display order.
 * Mix projects (`data/projects.ts`) and space plans (`data/space-planning.ts`)
 * by slug. Keep it to 3–5.
 */
export type FeaturedRef = { type: "project"; slug: string } | { type: "plan"; slug: string };

export const featured: FeaturedRef[] = [
  { type: "project", slug: "shakya-residence-tengal" },
  { type: "project", slug: "resort-dalchowki" },
  { type: "plan", slug: "ghiraiya-layout-redesign" },
  { type: "project", slug: "club-nova-thamel" },
];
