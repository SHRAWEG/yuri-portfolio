import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { FeaturedItem } from "@/lib/featured";

const tag = "absolute font-mono uppercase";
const tagStyle = {
  fontSize: 10,
  letterSpacing: ".18em",
  padding: "5px 10px",
  borderRadius: 20,
  background: "rgba(244,240,233,.92)",
  color: "var(--color-ink)",
} as const;

/**
 * Home "Selected work": a short editorial run of hand-picked work (see
 * `data/featured.ts`). Each item gets a full-width row — a large image on one
 * side; index numeral, category, title, teaser and link on the other —
 * alternating sides down the page. Stacks on small screens.
 *
 * Photos fill a 4:3 frame. Drawings sit uncropped on a pale mat (two portrait
 * sheets side by side). A project with before/after pairs gets its "before"
 * photo tucked into the corner of the image like a pinned print.
 */
export function FeaturedProjects({ items }: { items: FeaturedItem[] }) {
  return (
    <ol className="m-0 list-none p-0" style={{ display: "grid", gap: "clamp(64px,10vw,130px)" }}>
      {items.map((item, i) => {
        const reversed = i % 2 === 1;
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              className="frow grid items-center no-underline md:grid-cols-12"
              style={{ gap: "clamp(22px,4vw,56px)" }}
            >
              {/* ============ Image ============ */}
              <div className={`relative md:col-span-7 ${reversed ? "md:order-2" : ""}`}>
                {item.kind === "photo" ? (
                  <div
                    className="fimg relative overflow-hidden"
                    style={{
                      aspectRatio: "4/3",
                      borderRadius: 24,
                      border: "1px solid rgba(35,31,38,.1)",
                      background: item.images[0]
                        ? undefined
                        : "repeating-linear-gradient(135deg,#ece6f3,#ece6f3 12px,#f2edf7 12px,#f2edf7 24px)",
                    }}
                  >
                    {item.images[0] && (
                      <Image
                        src={item.images[0].src}
                        alt={item.title}
                        width={item.images[0].width}
                        height={item.images[0].height}
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="absolute inset-0 h-full w-full"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    {item.before && (
                      <span className={tag} style={{ ...tagStyle, top: 16, [reversed ? "left" : "right"]: 16 }}>
                        After
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    className="fimg flex items-center justify-center overflow-hidden"
                    style={{
                      aspectRatio: "4/3",
                      borderRadius: 24,
                      border: "1px solid rgba(35,31,38,.1)",
                      background: "#fbf9f5",
                      padding: "clamp(14px,2.2vw,28px)",
                      gap: "clamp(10px,1.6vw,20px)",
                    }}
                  >
                    {item.images.map((sheet) => (
                      <Image
                        key={sheet.src}
                        src={sheet.src}
                        alt={`${item.title} — plan`}
                        width={sheet.width}
                        height={sheet.height}
                        sizes="(max-width: 768px) 50vw, 360px"
                        quality={92}
                        className="h-full min-w-0"
                        style={{
                          objectFit: "contain",
                          width: `${100 / item.images.length}%`,
                          boxShadow: "0 10px 26px -18px rgba(35,31,38,.5)",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Pinned "before" print, overlapping the outer bottom corner. */}
                {item.before && (
                  <div
                    className="absolute"
                    style={{
                      width: "clamp(120px,32%,240px)",
                      bottom: "clamp(-36px,-4vw,-20px)",
                      [reversed ? "right" : "left"]: "clamp(-28px,-3vw,-8px)",
                      transform: `rotate(${reversed ? 4 : -4}deg)`,
                      padding: "clamp(5px,0.7vw,8px) clamp(5px,0.7vw,8px) clamp(22px,2.6vw,30px)",
                      background: "#fbf9f5",
                      borderRadius: 4,
                      boxShadow: "0 18px 36px -18px rgba(35,31,38,.55)",
                      zIndex: 2,
                    }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: 2 }}>
                      <Image
                        src={item.before.src}
                        alt={`${item.title} — before`}
                        width={item.before.width}
                        height={item.before.height}
                        sizes="240px"
                        className="absolute inset-0 h-full w-full"
                        style={{ objectFit: "cover", filter: "saturate(.75)" }}
                      />
                    </div>
                    <span
                      className="absolute inset-x-0 text-center font-serif italic text-ink-body"
                      style={{ bottom: "clamp(2px,0.4vw,5px)", fontSize: "clamp(14px,1.4vw,17px)" }}
                    >
                      before
                    </span>
                  </div>
                )}
              </div>

              {/* ============ Text ============ */}
              <div
                className={`md:col-span-5 ${reversed ? "md:order-1 md:text-right" : ""} ${item.before ? "mt-6 md:mt-0" : ""}`}
              >
                <span
                  aria-hidden
                  className="block font-serif italic text-accent"
                  style={{ fontSize: "clamp(44px,6vw,80px)", lineHeight: 0.9, opacity: 0.85 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Eyebrow size={11} tracking=".2em" style={{ marginTop: "clamp(14px,2vw,22px)" }}>
                  {item.eyebrow}
                </Eyebrow>
                <h3
                  className="font-serif font-medium text-ink"
                  style={{
                    fontSize: "clamp(30px,4vw,50px)",
                    lineHeight: 1.04,
                    letterSpacing: "-.01em",
                    margin: "10px 0 0",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-mono text-ink-muted"
                  style={{ fontSize: 11, letterSpacing: ".08em", margin: "10px 0 0" }}
                >
                  {item.meta}
                </p>
                <p
                  className={`font-serif italic text-ink-body [text-wrap:pretty] ${reversed ? "md:ml-auto" : ""}`}
                  style={{
                    fontSize: "clamp(18px,1.9vw,22px)",
                    lineHeight: 1.5,
                    marginTop: "clamp(16px,2vw,22px)",
                    marginBottom: 0,
                    maxWidth: "34ch",
                  }}
                >
                  {item.teaser}
                </p>
                <span
                  className="inline-block font-mono uppercase text-ink"
                  style={{ fontSize: 12, letterSpacing: ".14em", marginTop: "clamp(18px,2.4vw,28px)" }}
                >
                  {item.cta} <span className="narrow text-accent">→</span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
