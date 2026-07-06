import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  /** `solid` fills with ink on hover; `ghost` fills with the lilac accent. */
  variant?: "solid" | "ghost";
  /** Download a static file (opens in a new tab) instead of navigating. */
  download?: boolean;
};

/**
 * Pill outline link-button. Transparent by default, fills on hover.
 */
export function ButtonLink({ href, children, variant = "solid", download }: ButtonLinkProps) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");
  return (
    <a
      href={href}
      className={`btn btn--${variant}`}
      {...(download
        ? { download: true, target: "_blank", rel: "noopener noreferrer" }
        : isExternal
          ? { rel: "noopener noreferrer" }
          : {})}
    >
      {children}
    </a>
  );
}
