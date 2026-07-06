/**
 * Site-wide configuration: identity, contact points, and navigation sets.
 * Centralized so brand/nav changes happen in one place.
 */

export const site = {
  name: "Yuri Bajracharya",
  role: "Interior Architect",
  location: "Kathmandu, Nepal",
  /** Primary contact shown in the Home hero/contact section. */
  email: "yuribajracharya@gmail.com",
  /** Secondary contact used on the About page CTA + footer email link. */
  contactEmail: "hello@yuribajracharya.com",
  /** CV/résumé PDF served from `public/` (user-provided), linked from the About CTA. */
  cvHref: "/yuri-bajracharya-cv.pdf",
  copyright: "© 2026 · Made by hand",
} as const;

export type NavLink = { label: string; href: string; download?: boolean };

/** CV download — a static PDF served from `public/` (user-provided). */
const cvLink: NavLink = { label: "Download CV", href: site.cvHref, download: true };

/** Home nav — same-page anchors (Home omits an About link by design). */
export const homeNav: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
  cvLink,
];

/** Interior-page nav (case study pages). */
export const interiorNav: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

/** Home footer nav includes a direct email link. */
export const homeFooterNav: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
  { label: "Email", href: `mailto:${site.contactEmail}` },
];

/** Interior footer nav mirrors the interior header. */
export const interiorFooterNav: NavLink[] = interiorNav;
