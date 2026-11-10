import Link from "next/link";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Render as a download link (static file) that opens in a new tab. */
  download?: boolean;
};

const isExternal = (href: string) =>
  href.startsWith("mailto:") || href.startsWith("http") || href.startsWith("tel:");

/**
 * Navigation link with the animated left-to-right underline (`.navlink`).
 * Renders a plain anchor for external/mailto/download targets and `next/link`
 * otherwise (handles cross-page hash links like `/#work`).
 */
export function NavLink({ href, children, className, download }: NavLinkProps) {
  const classes = `navlink ${className ?? ""}`.trim();

  if (download || isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(download
          ? { download: true, target: "_blank", rel: "noopener noreferrer" }
          : href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
