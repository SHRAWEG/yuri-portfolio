import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Deco } from "@/components/ui/deco";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectCard } from "@/components/sections/project-card";
import { SpacePlanning } from "@/components/sections/space-planning";
import { ContactSection } from "@/components/sections/contact-section";
import { assets } from "@/lib/assets";
import { getProjectPhotos } from "@/lib/photos";
import {
  SPACE_PLANNING_BLURB,
  SPACE_PLANNING_SLUG,
  folderSlugs,
  loadSpacePlans,
  projectsIn,
} from "@/lib/work-folders";
import { categories, categoryLabel, type CategoryId } from "@/data/projects";
import { footerNav, homeNav } from "@/data/site";

const MAX_WIDTH = 1240;

/** One static page per folder; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return folderSlugs().map((folder) => ({ folder }));
}

function folderInfo(slug: string) {
  if (slug === SPACE_PLANNING_SLUG) {
    return { label: "Space Planning", blurb: SPACE_PLANNING_BLURB, eyebrow: "Layouts & floor plans" };
  }
  const c = categories.find((x) => x.id === slug);
  return c ? { label: c.label, blurb: c.blurb, eyebrow: "Folder" } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/work/[folder]">): Promise<Metadata> {
  const { folder } = await params;
  const info = folderInfo(folder);
  return info ? { title: info.label, description: info.blurb } : {};
}

export default async function FolderPage({ params }: PageProps<"/work/[folder]">) {
  const { folder } = await params;
  const info = folderInfo(folder);
  if (!info) notFound();

  const isPlans = folder === SPACE_PLANNING_SLUG;
  const plans = isPlans ? await loadSpacePlans() : [];
  const items = isPlans ? [] : projectsIn(folder as CategoryId);
  const covers = await Promise.all(items.map((p) => getProjectPhotos(p.slug).then((x) => x.cover)));
  const count = isPlans ? plans.length : items.length;
  const noun = isPlans ? "layout" : "project";

  const otherFolders = folderSlugs().filter((s) => s !== folder);

  return (
    <PageShell>
      <SiteHeader variant="frosted" maxWidth={MAX_WIDTH} links={homeNav} />

      {/* ========================= BREADCRUMB + TITLE ========================= */}
      <section
        className="relative mx-auto"
        style={{ maxWidth: MAX_WIDTH, padding: "clamp(34px,5vw,60px) var(--page-gutter) clamp(32px,4.5vw,56px)" }}
      >
        <Deco asset={assets.star} show="md" style={{ width: "clamp(30px,3.4vw,46px)", top: "12%", right: "4%", opacity: 0.6 }} />

        <nav aria-label="Breadcrumb" className="font-mono uppercase" style={{ fontSize: 12, letterSpacing: ".12em" }}>
          <Link href="/work" className="navlink" style={{ color: "var(--color-accent)" }}>
            Work
          </Link>
          <span className="text-ink-muted" style={{ margin: "0 10px" }}>/</span>
          <span className="text-ink-muted" aria-current="page">{info.label}</span>
        </nav>

        <div style={{ marginTop: "clamp(18px,3vw,30px)" }}>
          <h1
            className="font-serif font-medium"
            style={{ fontSize: "clamp(40px,7vw,82px)", lineHeight: 1, letterSpacing: "-.015em", margin: 0 }}
          >
            {info.label}
          </h1>
          <Eyebrow size={11} tracking=".2em" style={{ marginTop: 14 }}>
            {count} {noun}
            {count === 1 ? "" : "s"}
          </Eyebrow>
        </div>
      </section>

      {/* ============================== CONTENTS ============================== */}
      <section
        className="relative mx-auto"
        style={{ maxWidth: MAX_WIDTH, padding: "0 var(--page-gutter) clamp(56px,8vw,100px)" }}
      >
        {isPlans ? (
          <SpacePlanning plans={plans} />
        ) : (
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(28px,3vw,40px) clamp(20px,2.4vw,32px)",
            }}
          >
            {items.map((project, i) => (
              <ProjectCard key={project.slug} project={project} cover={covers[i]} />
            ))}
          </div>
        )}
      </section>

      {/* ============================ OTHER FOLDERS ============================ */}
      {otherFolders.length > 0 && (
        <nav
          aria-label="Other folders"
          style={{ borderTop: "1px solid rgba(35,31,38,.1)", borderBottom: "1px solid rgba(35,31,38,.1)" }}
        >
          <div className="mx-auto" style={{ maxWidth: MAX_WIDTH, padding: "clamp(32px,5vw,56px) var(--page-gutter)" }}>
            <Eyebrow size={11} tracking=".2em" style={{ marginBottom: 18 }}>
              Other folders
            </Eyebrow>
            <ul className="m-0 flex list-none flex-wrap p-0" style={{ gap: "14px clamp(24px,4vw,48px)" }}>
              {otherFolders.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/work/${slug}`}
                    className="navlink font-serif font-medium text-ink"
                    style={{ fontSize: "clamp(22px,2.6vw,30px)" }}
                  >
                    {slug === SPACE_PLANNING_SLUG ? "Space Planning" : categoryLabel(slug)}
                    <span className="text-accent" style={{ fontSize: ".7em", marginLeft: 8 }}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <ContactSection maxWidth={MAX_WIDTH} />

      <SiteFooter links={footerNav} maxWidth={MAX_WIDTH} />
    </PageShell>
  );
}
