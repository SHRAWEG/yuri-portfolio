import Link from "next/link";
import Image from "next/image";
import type { LoadedPlan } from "@/lib/work-folders";

/**
 * Grid of space-planning sets for the Space Planning folder. Each card shows
 * the cover sheet uncropped on a pale mat (drawings read best on light
 * ground) and links to the plan's own page.
 */
export function SpacePlanning({ plans }: { plans: LoadedPlan[] }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
        gap: "clamp(28px,3vw,40px) clamp(20px,2.4vw,32px)",
      }}
    >
      {plans.map(({ plan, sheets }) => (
        <Link key={plan.slug} href={`/work/space-planning/${plan.slug}`} className="plan-card block no-underline">
          <div
            className="plan-mat flex items-center justify-center"
            style={{
              aspectRatio: "4/3",
              padding: "clamp(14px,2vw,22px)",
              background: "#fbf9f5",
              border: "1px solid rgba(35,31,38,.1)",
              borderRadius: 20,
            }}
          >
            <Image
              src={sheets[0].src}
              alt={`Space plan — ${plan.title}`}
              width={sheets[0].width}
              height={sheets[0].height}
              sizes="(max-width: 760px) 100vw, 520px"
              quality={92}
              className="h-full w-full"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div style={{ marginTop: 14 }}>
            <h3
              className="font-serif font-medium text-ink"
              style={{ fontSize: "clamp(20px,2.2vw,25px)", margin: 0, lineHeight: 1.15 }}
            >
              {plan.title}
              <span className="parrow font-sans text-accent" style={{ marginLeft: 6, fontSize: ".62em" }}>
                →
              </span>
            </h3>
            <p className="font-mono text-ink-muted" style={{ fontSize: 11, letterSpacing: ".08em", margin: "6px 0 0" }}>
              {[plan.location, `${sheets.length} sheet${sheets.length === 1 ? "" : "s"}`].filter(Boolean).join(" · ")}
            </p>
            <p className="text-ink-body-2" style={{ fontSize: 14, lineHeight: 1.55, margin: "8px 0 0" }}>
              {plan.teaser}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
