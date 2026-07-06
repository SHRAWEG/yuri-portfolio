/**
 * Project content — drives both the Home "Projects" grid and each
 * `/projects/[slug]` gallery page. Everything here is static; there is no
 * CMS or API.
 *
 * ── Adding photos ────────────────────────────────────────────────────────
 * Photos are NOT listed here. Just drop image files into
 * `public/projects/<slug>/` and they are discovered automatically at build
 * time (dimensions are read from the files — see `lib/photos.ts`):
 *   - `hero.webp`      → cover (grid thumbnail + detail hero)
 *   - anything else    → gallery, ordered by filename (`2.webp` before `10.webp`)
 * A project with no folder just renders placeholders, so you can publish the
 * text first and add photos later.
 *
 * ── Gallery layout ───────────────────────────────────────────────────────
 * `layout` controls how the gallery photos are arranged on the page:
 *   - "grid"    (default) — photos in rows that fill left→right in order and
 *                           wrap, at a uniform height; best for many photos.
 *   - "stacked"           — large, full-width photos one per row; best for a
 *                           small set (e.g. 3–5 hero-quality shots).
 * Either way, clicking a photo opens the same full-screen lightbox.
 */

export type GalleryLayout = "grid" | "stacked";

export type Project = {
  slug: string;
  name: string;
  location: string;
  year: string;
  /** One or two sentences shown under the hero on the project page. */
  summary: string;
  /** Gallery arrangement on the page. Defaults to "grid". */
  layout?: GalleryLayout;
  scope?: string[];
};

// NOTE: `year` is a placeholder ("2024") and each `summary` is draft copy —
// replace both with the real details per project.
export const projects: Project[] = [
  {
    slug: "resort-dalchowki",
    name: "Resort, Dalchowki",
    location: "Dalchowki, Lalitpur",
    year: "2026",
    summary:
      "A luxury resort framed by the mist and hills of Dalchowki, where characteristic architecture and the natural landscape intimately shaped the rustic interiors.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "restaurant-boudha",
    name: "Restaurant, Boudha",
    location: "Boudha, Kathmandu",
    year: "2025",
    summary:
      "A clean, minimalist vegetarian restaurant within Boudha’s latest Buddhist cultural center 'Licchabi House'. The design honors its context, with a monastic red palette, natural terracotta and timber to create a tranquil space that aligns with the establishment's artistic and spiritual vision.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "hotel-reception-janakpur",
    name: "Hotel Reception, Janakpur",
    location: "Janakpur",
    year: "2025",
    summary:
      "Designed to deliver an immediate, unforgettable first impression in Janakpur’s newest hospitality landmark, this reception area is an impressive welcome experience built entirely on local resourcefulness.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "gallery-cafe-boudha",
    name: "Gallery Café, Boudha",
    location: "Boudha, Kathmandu",
    year: "2026",
    summary:
      "A serene, white-walled gallery cafe in Boudha designed to step back and let Buddhist art take center stage. The ultra-minimalist interior relies on clean lines, soft architectural curves, and a subtle, playful narrative—incorporating the footprints of the four symbolic animals from the Licchavi House emblem directly into the space.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "club-nova-thamel",
    name: "Club Nova, Thamel",
    location: "Thamel, Kathmandu",
    year: "2025",
    summary:
      "A modern nightlife venue in the heart of Thamel. For this project, my role focused entirely on technical execution, translating complex spatial designs and dynamic material textures into highly precise 3D models and renderings.",
    scope: ["3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "ghiraiya-residence-jhamsikhel",
    name: "Ghiraiya Residence, Jhamsikhel",
    location: "Jhamsikhel, Lalitpur",
    year: "2026",
    summary:
      "A modern luxury common area designed to balance striking aesthetics with everyday comfort. The interior explores unique geometric shapes and innovative ways of utilizing common materials,  without compromising on daily function and practicality.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "moore-residence-jhamsikhel",
    name: "Moore Residence, Jhamsikhel",
    location: "Jhamsikhel, Lalitpur",
    year: "2024",
    summary:
      "A luxurious top-floor retreat designed for seamless indoor-outdoor entertainment. An outdoor terrace with a jacuzzi and lush lounge seating, flowing effortlessly into an adjoining interior bar lounge. Glamorous architectural curves and lighting tie both environments together into one cohesive, high-end experience.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "goyal-residence-kuleswor",
    name: "Goyal Residence, Kuleshwor",
    location: "Kuleshwor, Kathmandu",
    year: "2026",
    summary:
      "A grand, double-height residential space designed to maximize scale and volume. Utilizing premium materials and high-end execution, the room features a mezzanine balcony with a unique sunken seating area overlooking the entire main floor.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "agrawal-residence-sanepa",
    name: "Agrawal Residence, Sanepa",
    location: "Sanepa, Lalitpur",
    year: "2024",
    summary:
      "A vibrant, transitional space positioned between two bedrooms and an outdoor balcony terrace lounge. Designed as an eye-catching statement hub, the room uses playful pops of color and distinctive furniture pieces to infuse energy, warmth, and excitement into the heart of the home's daily flow.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
];

/** Card meta line, e.g. "Lalitpur · 2024". */
export function projectMeta(project: Project): string {
  return `${project.location} · ${project.year}`;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The next project in the list (wraps around), for the footer link. */
export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
