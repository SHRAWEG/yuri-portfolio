"use client";

import { useEffect, useState } from "react";
import { Brand } from "./brand";
import { NavLink } from "@/components/ui/nav-link";
import { ButtonLink } from "@/components/ui/button";
import type { NavLink as NavLinkType } from "@/data/site";

type SiteHeaderProps = {
  links: NavLinkType[];
  /** Inner content max-width in px (1240 Home, 1200 About, 1100 case study). */
  maxWidth: number;
  /**
   * `transparent` — Home: fixed, see-through over the hero, frosts after
   * scrolling past 140px. `frosted` — interior pages: sticky, always frosted.
   */
  variant?: "transparent" | "frosted";
};

export function SiteHeader({ links, maxWidth, variant = "frosted" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const isTransparent = variant === "transparent";

  useEffect(() => {
    if (!isTransparent) return;
    const onScroll = () => setScrolled(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparent]);

  const positionClass = isTransparent ? "fixed inset-x-0 top-0" : "sticky top-0";
  const styleClass = isTransparent
    ? `site-header ${scrolled ? "is-scrolled" : ""}`
    : "site-header site-header--frosted";

  return (
    <header
      className={`${positionClass} z-[51] ${styleClass}`.trim()}
      style={{ zIndex: isTransparent ? 51 : 40 }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex items-center justify-between gap-5"
        style={{ maxWidth, padding: "14px var(--page-gutter)" }}
      >
        <Brand />
        <div
          className="flex items-center"
          style={{ gap: "clamp(16px, 2.4vw, 34px)", fontSize: "13px", letterSpacing: ".04em" }}
        >
          {links.map((link) =>
            link.download ? (
              <ButtonLink key={link.label} href={link.href} variant="ghost" download>
                {link.label}
              </ButtonLink>
            ) : (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
