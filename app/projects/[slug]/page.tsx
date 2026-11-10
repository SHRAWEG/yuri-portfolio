import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Deco } from "@/components/ui/deco";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { BeforeAfter } from "@/components/sections/before-after";
import { assets } from "@/lib/assets";
import { getBeforeAfter, getProjectPhotos } from "@/lib/photos";
import { footerNav, interiorNav } from "@/data/site";
import { projects, getProject, nextProject, categoryLabel } from "@/data/projects";

const BODY_WIDTH = 1100;

/** Pre-render a static page per project. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const [{ cover, gallery }, pairs] = await Promise.all([
    getProjectPhotos(project.slug),
    getBeforeAfter(project.slug, project.beforeAfter),
  ]);
  const next = nextProject(project.slug);

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
          <Link href={`/work/${project.category}`} className="navlink" style={{ color: "var(--color-accent)" }}>
            {categoryLabel(project.category)}
          </Link>
        </nav>
        <h1
          className="font-serif font-medium"
          style={{ fontSize: "clamp(40px,7vw,82px)", lineHeight: 1, letterSpacing: "-.015em", margin: "clamp(18px,3vw,30px) 0 0" }}
        >
          {project.name}
        </h1>

        {/* Meta row: location · year · scope */}
        <dl
          className="flex flex-wrap"
          style={{
            margin: "clamp(24px,3.6vw,38px) 0 0",
            paddingTop: "clamp(18px,2.4vw,26px)",
            borderTop: "1px solid rgba(35,31,38,.12)",
            gap: "clamp(28px,6vw,72px)",
          }}
        >
          <div>
            <Eyebrow as="dt" size={11} tracking=".2em" style={{ marginBottom: 8 }}>Location</Eyebrow>
            <dd style={{ margin: 0, fontSize: "clamp(15px,1.4vw,17px)" }}>{project.location}</dd>
          </div>
          <div>
            <Eyebrow as="dt" size={11} tracking=".2em" style={{ marginBottom: 8 }}>Year</Eyebrow>
            <dd style={{ margin: 0, fontSize: "clamp(15px,1.4vw,17px)" }}>{project.year}</dd>
          </div>
          {project.scope && project.scope.length > 0 && (
            <div>
              <Eyebrow as="dt" size={11} tracking=".2em" style={{ marginBottom: 8 }}>Scope</Eyebrow>
              <dd style={{ margin: 0, fontSize: "clamp(15px,1.4vw,17px)" }}>{project.scope.join(" · ")}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* =================== HERO + SUMMARY + GALLERY =================== */}
      {/* Hero, summary and gallery share one client component so the hero can
          also open in the lightbox viewer. */}
      <ProjectGallery
        cover={cover}
        gallery={gallery}
        alt={project.name}
        summary={project.summary}
        layout={project.layout}
        afterSummary={<BeforeAfter pairs={pairs} />}
      />

      {/* ========================= NEXT PROJECT ========================= */}
      <Link className="nextlink" href={`/projects/${next.slug}`} style={{ borderBottom: "1px solid rgba(35,31,38,.1)" }}>
        <div
          className="mx-auto flex flex-wrap items-center justify-between"
          style={{ maxWidth: BODY_WIDTH, padding: "clamp(40px,6vw,72px) var(--page-gutter)", gap: 24 }}
        >
          <div>
            <Eyebrow size={11} tracking=".2em" style={{ marginBottom: 10 }}>Next project</Eyebrow>
            <h2 className="font-serif font-medium" style={{ fontSize: "clamp(28px,4.5vw,48px)", margin: 0, lineHeight: 1.05 }}>{next.name}</h2>
          </div>
          <span className="narrow font-serif text-accent" style={{ fontSize: "clamp(34px,5vw,56px)", lineHeight: 1 }}>→</span>
        </div>
      </Link>

      <SiteFooter links={footerNav} maxWidth={BODY_WIDTH} />
    </PageShell>
  );
}
