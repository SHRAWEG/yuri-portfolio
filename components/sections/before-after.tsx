import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { BeforeAfterPair } from "@/lib/photos";

const BODY_WIDTH = 1100;

/**
 * Before → after pairs for transformation projects. Each pair sits side by
 * side in matching 4:3 frames (stacked on phones) with a lilac arrow badge
 * between them. The "before" is slightly desaturated so the change reads at
 * a glance.
 */
export function BeforeAfter({ pairs }: { pairs: BeforeAfterPair[] }) {
  if (pairs.length === 0) return null;

  return (
    <section
      aria-label="Before and after"
      className="mx-auto"
      style={{ maxWidth: BODY_WIDTH, padding: "clamp(8px,2vw,24px) var(--page-gutter) clamp(44px,6vw,80px)" }}
    >
      <div className="text-center" style={{ marginBottom: "clamp(26px,4vw,44px)" }}>
        <Eyebrow>The transformation</Eyebrow>
        <h2
          className="font-serif font-medium"
          style={{ fontSize: "clamp(32px,4.6vw,54px)", lineHeight: 1.05, letterSpacing: "-.01em", margin: "10px 0 0" }}
        >
          Before <span className="font-sans text-accent" style={{ fontSize: ".6em" }}>→</span> After
        </h2>
      </div>

      <div style={{ display: "grid", gap: "clamp(32px,5vw,56px)" }}>
        {pairs.map((pair, i) => (
          <div
            key={pair.before.src}
            className={`relative grid ${pair.after ? "md:grid-cols-2" : ""}`}
            style={{ gap: "clamp(14px,2vw,24px)" }}
          >
            <Frame image={pair.before} label="Before" alt={`Before — view ${i + 1}`} muted />
            {pair.after && (
              <>
                <Frame image={pair.after} label="After" alt={`After — view ${i + 1}`} />
                {/* Arrow badge on the seam (right on desktop, down on phones). */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white"
                  style={{
                    width: "clamp(38px,4vw,50px)",
                    height: "clamp(38px,4vw,50px)",
                    background: "var(--color-accent)",
                    boxShadow: "0 10px 24px -10px rgba(35,31,38,.6)",
                    marginTop: 14,
                  }}
                >
                  <span className="rotate-90 md:rotate-0" style={{ fontSize: 20, lineHeight: 1 }}>→</span>
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Frame({
  image,
  label,
  alt,
  muted,
}: {
  image: BeforeAfterPair["before"];
  label: string;
  alt: string;
  muted?: boolean;
}) {
  return (
    <figure className="m-0">
      <figcaption
        className="font-mono uppercase"
        style={{
          fontSize: 11,
          letterSpacing: ".2em",
          marginBottom: 10,
          color: muted ? "var(--color-ink-muted)" : "var(--color-accent)",
        }}
      >
        {label}
      </figcaption>
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3", borderRadius: 16, border: "1px solid rgba(35,31,38,.1)" }}
      >
        <Image
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 768px) 100vw, 540px"
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover", filter: muted ? "saturate(.8)" : undefined }}
        />
      </div>
    </figure>
  );
}
