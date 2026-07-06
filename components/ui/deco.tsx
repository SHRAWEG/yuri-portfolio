import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/lib/assets";

type DecoVisibility = "always" | "md" | "lg";

type DecoProps = {
  asset: ImageAsset;
  /** Absolute-positioning styles (top/left/right/bottom/width/opacity/z-index). */
  style: CSSProperties;
  /** Breakpoint gate: `md` ≥760px, `lg` ≥1080px. */
  show?: DecoVisibility;
};

const visibilityClass: Record<DecoVisibility, string> = {
  always: "",
  md: "deco--md",
  lg: "deco--lg",
};

/**
 * Decorative watercolor element. Purely presentational (aria-hidden),
 * plays the single load-time wiggle via the `.deco` class, and is
 * positioned by the caller. Width is set through `style`; height stays
 * `auto` to preserve the intrinsic aspect ratio.
 */
export function Deco({ asset, style, show = "always" }: DecoProps) {
  return (
    <Image
      src={asset.src}
      alt=""
      aria-hidden
      width={asset.width}
      height={asset.height}
      className={`deco ${visibilityClass[show]}`.trim()}
      style={{ height: "auto", ...style }}
    />
  );
}
