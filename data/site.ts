/**
 * Site-wide configuration: identity, contact points, and navigation sets.
 * Centralized so brand/nav changes happen in one place.
 */

export const site = {
  name: "Yuri Bajracharya",
  role: "Interior Architect",
  location: "Kathmandu, Nepal",
  /** The one email used everywhere (contact section, footer, mailto links). */
  email: "yuribajracharya@gmail.com",
  /** Subject line pre-filled when someone clicks "Write an email". */
  emailSubject: "Project enquiry",
  /** Instagram handle, without the "@". */
  instagram: "archililyy",
  /** CV/résumé PDF served from `public/` (user-provided). */
  cvHref: "/yuri-bajracharya-cv.pdf",
  copyright: "© 2026 · Made by hand",
} as const;

export const instagramUrl = `https://www.instagram.com/${site.instagram}/`;
export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`;

export type NavLink = { label: string; href: string; download?: boolean };

/** CV download — a static PDF served from `public/` (user-provided). */
const cvLink: NavLink = { label: "Download CV", href: site.cvHref, download: true };

/**
 * Header nav for pages that include the Contact section (Home, Work), so
 * "Contact" scrolls on the same page.
 */
export const homeNav: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "#contact" },
  cvLink,
];

/** Header nav for project pages (no Contact section → jump to Home's). */
export const interiorNav: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/#contact" },
  cvLink,
];

/** Footer nav, shared by every page. */
export const footerNav: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Space planning", href: "/work/space-planning" },
  { label: "Instagram", href: instagramUrl },
  { label: "Email", href: mailtoHref },
];
