import type { ReactNode } from "react";
import { assets } from "@/lib/assets";

type PageShellProps = {
  children: ReactNode;
  /** Paper texture. Every page uses `background` (as on Home) by default. */
  texture?: "background" | "seamless";
};

/**
 * Full-height page wrapper carrying the repeating paper texture and
 * clipping horizontal overflow from bleeding decorations.
 */
export function PageShell({ children, texture = "background" }: PageShellProps) {
  const src =
    texture === "background" ? assets.paperBackground.src : assets.paperSeamless.src;

  return (
    <div
      className="relative min-h-screen bg-paper"
      style={{
        overflowX: "clip",
        backgroundImage: `url('${src}')`,
        backgroundRepeat: "repeat",
        backgroundSize: "1600px auto",
        backgroundAttachment: "scroll",
        backgroundPosition: "top center",
      }}
    >
      {children}
    </div>
  );
}
