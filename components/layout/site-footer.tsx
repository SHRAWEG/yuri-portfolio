import Image from "next/image";
import { NavLink } from "@/components/ui/nav-link";
import { assets } from "@/lib/assets";
import { site } from "@/data/site";
import type { NavLink as NavLinkType } from "@/data/site";

type SiteFooterProps = {
  links: NavLinkType[];
  maxWidth: number;
};

/**
 * Shared footer: brand lockup, nav, and the "made by hand" copyright line.
 */
export function SiteFooter({ links, maxWidth }: SiteFooterProps) {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(35,31,38,.1)",
        background: "rgba(244,240,233,.6)",
      }}
    >
      <div
        className="mx-auto flex flex-wrap items-center justify-between gap-[18px]"
        style={{ maxWidth, padding: "34px var(--page-gutter)" }}
      >
        <div className="flex items-center gap-3">
          <Image
            src={assets.greenFlower.src}
            alt=""
            aria-hidden
            width={assets.greenFlower.width}
            height={assets.greenFlower.height}
            style={{ width: 24, height: "auto" }}
          />
          <span className="font-serif font-semibold" style={{ fontSize: 19 }}>
            {site.name}
          </span>
        </div>

        <nav
          aria-label="Footer"
          className="flex gap-6"
          style={{ fontSize: 13, letterSpacing: ".04em" }}
        >
          {links.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <p
          className="font-mono text-ink-muted"
          style={{ fontSize: 11, letterSpacing: ".08em", margin: 0 }}
        >
          {site.copyright}
        </p>
      </div>
    </footer>
  );
}
