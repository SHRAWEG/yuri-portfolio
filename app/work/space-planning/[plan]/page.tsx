import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Deco } from "@/components/ui/deco";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { assets } from "@/lib/assets";
import { getPlanSheets, getPlanSliders } from "@/lib/work-folders";
import { PlanSliders } from "@/components/sections/plan-sliders";
import { summaryStyle } from "@/lib/summary-style";
import { getSpacePlan, spacePlans } from "@/data/space-planning";
import { getProject } from "@/data/projects";
import { footerNav, interiorNav } from "@/data/site";

const BODY_WIDTH = 1100;
/** Drawings get more room than body text. */
const WIDE_WIDTH = 1280;

export const dynamicParams = false;

export function generateStaticParams() {
  return spacePlans.map((p) => ({ plan: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/space-planning/[plan]">): Promise<Metadata> {
  const { plan: slug } = await params;
  const plan = getSpacePlan(slug);
  return plan ? { title: plan.title, description: plan.teaser } : {};
}

export default async function SpacePlanPage({ params }: PageProps<"/work/space-planning/[plan]">) {
  const { plan: slug } = await params;
  const plan = getSpacePlan(slug);
  if (!plan) notFound();

  const [sheets, sliders] = await Promise.all([getPlanSheets(plan), getPlanSliders(plan)]);
  const related = plan.project ? getProject(plan.project) : undefined;
  const i = spacePlans.indexOf(plan);
  const next = spacePlans.length > 1 ? spacePlans[(i + 1) % spacePlans.length] : undefined;

  return (
    <PageShell>
      <SiteHeader variant="frosted" maxWidth={BODY_WIDTH} links={interiorNav} />

      {/* ===================== BREADCRUMB + TITLE ===================== */}
      <section
        className="relative mx-auto"
        style={{ maxWidth: BODY_WIDTH, padding: "clamp(34px,5vw,60px) var(--page-gutter) clamp(20px,3vw,32px)" }}
      >
        <Deco asset={assets.star} show="md" style={{ width: "clamp(30px,3.4vw,46px)", top: "8%", right: "3%", opacity: 0.55 }} />
        <nav aria-label="Breadcrumb" className="font-mono uppercase" style={{ fontSize: 12, letterSpacing: ".12em" }}>
          <Link href="/work" className="navlink" style={{ color: "var(--color-accent)" }}>
            Work
          </Link>
          <span className="text-ink-muted" style={{ margin: "0 10px" }}>/</span>
          <Link href="/work/space-planning" className="navlink" style={{ color: "var(--color-accent)" }}>
            Space Planning
          </Link>
        </nav>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: "clamp(40px,7vw,82px)", lineHeight: 1, letterSpacing: "-.015em", margin: "clamp(18px,3vw,30px) 0 0" }}
        >
          {plan.title}
        </h1>

        <dl
          className="flex flex-wrap"
          style={{
            margin: "clamp(24px,3.6vw,38px) 0 0",
            paddingTop: "clamp(18px,2.4vw,26px)",
            borderTop: "1px solid rgba(35,31,38,.12)",
            gap: "clamp(28px,6vw,72px)",
          }}
        >
          {plan.location && (
            <div>
              <Eyebrow as="dt" size={11} tracking=".2em" style={{ marginBottom: 8 }}>Location</Eyebrow>
              <dd style={{ margin: 0, fontSize: "clamp(15px,1.4vw,17px)" }}>{plan.location}</dd>
            </div>
          )}
          <div>
            <Eyebrow as="dt" size={11} tracking=".2em" style={{ marginBottom: 8 }}>Sheets</Eyebrow>
            <dd style={{ margin: 0, fontSize: "clamp(15px,1.4vw,17px)" }}>{sheets.length}</dd>
          </div>
          {related && (
            <div>
              <Eyebrow as="dt" size={11} tracking=".2em" style={{ marginBottom: 8 }}>Related project</Eyebrow>
              <dd style={{ margin: 0, fontSize: "clamp(15px,1.4vw,17px)" }}>
                <Link href={`/projects/${related.slug}`} className="navlink">
                  {related.name} →
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </section>

      {sliders ? (
        <>
          {/* Summary, then the before/after sliders. */}
          <section className="mx-auto" style={{ maxWidth: BODY_WIDTH, padding: "clamp(8px,2vw,24px) var(--page-gutter) clamp(28px,4vw,48px)" }}>
            <p
              className="font-serif italic text-ink-body [text-wrap:pretty]"
              style={{ ...summaryStyle(plan.summary), margin: "0 auto" }}
            >
              {plan.summary}
            </p>
          </section>
          <section className="mx-auto" style={{ maxWidth: WIDE_WIDTH, padding: "0 var(--page-gutter) clamp(56px,8vw,100px)" }}>
            <PlanSliders sliders={sliders} title={plan.title} />
          </section>
        </>
      ) : (
        // No sliders set: cover sheet as hero, the rest stacked.
        <ProjectGallery
          cover={sheets[0]}
          gallery={sheets.slice(1)}
          alt={plan.title}
          summary={plan.summary}
          layout="stacked"
          galleryLabel="More sheets"
        />
      )}

      {next && (
        <Link className="nextlink" href={`/work/space-planning/${next.slug}`} style={{ borderBottom: "1px solid rgba(35,31,38,.1)" }}>
          <div
            className="mx-auto flex flex-wrap items-center justify-between"
            style={{ maxWidth: BODY_WIDTH, padding: "clamp(40px,6vw,72px) var(--page-gutter)", gap: 24 }}
          >
            <div>
              <Eyebrow size={11} tracking=".2em" style={{ marginBottom: 10 }}>Next layout</Eyebrow>
              <h2 className="font-serif font-medium" style={{ fontSize: "clamp(28px,4.5vw,48px)", margin: 0, lineHeight: 1.05 }}>
                {next.title}
              </h2>
            </div>
            <span className="narrow font-serif text-accent" style={{ fontSize: "clamp(34px,5vw,56px)", lineHeight: 1 }}>→</span>
          </div>
        </Link>
      )}

      <SiteFooter links={footerNav} maxWidth={BODY_WIDTH} />
    </PageShell>
  );
}
