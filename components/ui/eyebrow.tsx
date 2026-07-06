import type { CSSProperties, ElementType, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** Font size in px (design uses 10–12). */
  size?: number;
  /** Letter-spacing (design uses .12em–.26em). */
  tracking?: string;
  /** Rendered element (defaults to `p`). Use e.g. `dt` inside a `<dl>`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * Small uppercase mono label (Space Mono) in the lilac accent — used for
 * eyebrows, section kickers, and metadata labels throughout the site.
 */
export function Eyebrow({
  children,
  size = 11,
  tracking = "0.26em",
  as: Tag = "p",
  className = "",
  style,
}: EyebrowProps) {
  return (
    <Tag
      className={`font-mono uppercase text-accent ${className}`.trim()}
      style={{ fontSize: `${size}px`, letterSpacing: tracking, margin: 0, ...style }}
    >
      {children}
    </Tag>
  );
}
