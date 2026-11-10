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
 *   - `before/…`       → "before" photos (optional), paired with after
 *                        photos via `beforeAfter` below
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

/**
 * ── Categories ───────────────────────────────────────────────────────────
 * Each category is a folder on `/work`, opening to `/work/<id>`. To add one,
 * add it here (this order = folder order) and tag projects with its `id`.
 * Categories with no projects are hidden. `blurb` is draft copy.
 */
export const categories = [
  {
    id: "residential",
    label: "Residential",
    blurb: "Homes shaped around the people who live in them — living rooms, lounges and the spaces in between.",
  },
  {
    id: "hospitality",
    label: "Hotels & Resorts",
    blurb: "Arrival halls, receptions and retreats designed to make a lasting first impression.",
  },
  {
    id: "food-beverage",
    label: "Restaurants & Cafés",
    blurb: "Dining rooms and cafés where the setting is part of the experience.",
  },
  {
    id: "nightlife",
    label: "Nightlife",
    blurb: "Bars and venues built for atmosphere, light and movement after dark.",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export function categoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}

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
  /** Which `/work` folder this project lives in. */
  category: CategoryId;
  /** Short teaser used on the Home featured layout (falls back to `summary`). */
  teaser?: string;
  /**
   * Before/after pairs, shown side by side on the project page. Paths are
   * relative to `public/projects/<slug>/` — keep "before" photos in a
   * `before/` subfolder so they stay out of the gallery. A pair may omit
   * `after` to show a before photo on its own.
   */
  beforeAfter?: { before: string; after?: string }[];
};

// NOTE: `year` is a placeholder ("2024") and each `summary` is draft copy —
// replace both with the real details per project.
export const projects: Project[] = [
  {
    slug: "shakya-residence-tengal",
    category: "residential",
    name: "Shakya Residence, Tengal",
    location: "Tengal, Kathmandu",
    year: "2026",
    summary:
      "Since this living room wasn't used every day, the client wanted to convert it into a bedroom while retaining seating for guests. Catering to the client's preference for ultra-luxury and white interiors, the design successfully balances a flashy aesthetic with timeless grace, creating a bright, versatile, and high-end multi-functional space.",
    teaser: "A rarely used living room, converted into a bright, ultra-luxury bedroom that still seats guests.",
    scope: ["Site Mapping", "Space Planning", "Design", "Material Selection"],
    // Pairs are a best match by window/wall position — swap `after` files if needed.
    beforeAfter: [
      { before: "before/1.webp", after: "hero.webp" },
      { before: "before/2.webp", after: "1.webp" },
      { before: "before/3.webp", after: "3.webp" },
    ],
  },
  {
    slug: "resort-dalchowki",
    category: "hospitality",
    name: "Resort, Dalchowki",
    location: "Dalchowki, Lalitpur",
    year: "2026",
    summary:
      "A luxury resort framed by the mist and hills of Dalchowki, where characteristic architecture and the natural landscape intimately shaped the rustic interiors.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "restaurant-boudha",
    category: "food-beverage",
    name: "Restaurant, Boudha",
    location: "Boudha, Kathmandu",
    year: "2025",
    summary:
      "A clean, minimalist vegetarian restaurant within Boudha’s latest Buddhist cultural center 'Licchabi House'. The design honors its context, with a monastic red palette, natural terracotta and timber to create a tranquil space that aligns with the establishment's artistic and spiritual vision.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "hotel-reception-janakpur",
    category: "hospitality",
    name: "Hotel Reception, Janakpur",
    location: "Janakpur",
    year: "2025",
    summary:
      "Designed to deliver an immediate, unforgettable first impression in Janakpur’s newest hospitality landmark, this reception area is an impressive welcome experience built entirely on local resourcefulness.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "gallery-cafe-boudha",
    category: "food-beverage",
    name: "Gallery Café, Boudha",
    location: "Boudha, Kathmandu",
    year: "2026",
    summary:
      "A serene, white-walled gallery cafe in Boudha designed to step back and let Buddhist art take center stage. The ultra-minimalist interior relies on clean lines, soft architectural curves, and a subtle, playful narrative—incorporating the footprints of the four symbolic animals from the Licchavi House emblem directly into the space.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "club-nova-thamel",
    category: "nightlife",
    name: "Club Nova, Thamel",
    location: "Thamel, Kathmandu",
    year: "2025",
    summary:
      "A modern nightlife venue in the heart of Thamel. For this project, my role focused entirely on technical execution, translating complex spatial designs and dynamic material textures into highly precise 3D models and renderings.",
    scope: ["3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "ghiraiya-residence-jhamsikhel",
    category: "residential",
    name: "Ghiraiya Residence, Jhamsikhel",
    location: "Jhamsikhel, Lalitpur",
    year: "2026",
    summary:
      "A modern luxury common area designed to balance striking aesthetics with everyday comfort. The interior explores unique geometric shapes and innovative ways of utilizing common materials,  without compromising on daily function and practicality.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "moore-residence-jhamsikhel",
    category: "residential",
    name: "Moore Residence, Jhamsikhel",
    location: "Jhamsikhel, Lalitpur",
    year: "2024",
    summary:
      "A luxurious top-floor retreat designed for seamless indoor-outdoor entertainment. An outdoor terrace with a jacuzzi and lush lounge seating, flowing effortlessly into an adjoining interior bar lounge. Glamorous architectural curves and lighting tie both environments together into one cohesive, high-end experience.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "goyal-residence-kuleswor",
    category: "residential",
    name: "Goyal Residence, Kuleshwor",
    location: "Kuleshwor, Kathmandu",
    year: "2026",
    summary:
      "A grand, double-height residential space designed to maximize scale and volume. Utilizing premium materials and high-end execution, the room features a mezzanine balcony with a unique sunken seating area overlooking the entire main floor.",
    scope: ["Concept Development", "3D Modeling", "Architectual Rendering"],
  },
  {
    slug: "agrawal-residence-sanepa",
    category: "residential",
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
