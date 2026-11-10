import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Deco } from "@/components/ui/deco";
import { ProjectsHeading } from "@/components/sections/projects-heading";
import { WorkFolder } from "@/components/sections/work-folder";
import { ContactSection } from "@/components/sections/contact-section";
import { assets } from "@/lib/assets";
import { getWorkFolders } from "@/lib/work-folders";
import { footerNav, homeNav } from "@/data/site";

const MAX_WIDTH = 1240;

export const metadata: Metadata = {
  title: "Work",
  description:
    "All projects, filed by type — residences, hotels and resorts, restaurants and cafés — plus space-planning layouts.",
};

export default async function WorkPage() {
  const folders = await getWorkFolders();

  return (
    <PageShell>
      <SiteHeader variant="frosted" maxWidth={MAX_WIDTH} links={homeNav} />

      {/* ============================ INTRO ============================ */}
      <section
        className="relative mx-auto text-center"
        style={{ maxWidth: MAX_WIDTH, padding: "clamp(48px,7vw,96px) var(--page-gutter) clamp(36px,5vw,64px)" }}
      >
        <Deco asset={assets.star} show="md" style={{ width: "clamp(30px,3.5vw,48px)", top: "14%", right: "6%", opacity: 0.7 }} />
        <Deco asset={assets.greenFlower} show="md" style={{ width: "clamp(26px,3vw,42px)", top: "58%", left: "7%", opacity: 0.9 }} />

        <ProjectsHeading as="h1" />
        <p
          className="mx-auto font-serif italic text-ink-body [text-wrap:pretty]"
          style={{ fontSize: "clamp(19px,2.3vw,25px)", lineHeight: 1.5, maxWidth: 600, margin: "clamp(18px,2.4vw,30px) auto 0" }}
        >
          Every project so far, filed by the kind of space. Open a folder to look inside.
        </p>
      </section>

      {/* =========================== FOLDERS =========================== */}
      <section
        aria-label="Project folders"
        className="relative mx-auto"
        style={{ maxWidth: MAX_WIDTH, padding: "0 var(--page-gutter) clamp(40px,6vw,80px)" }}
      >
        <Deco
          asset={assets.flowerBottomLeft}
          show="lg"
          style={{ width: "clamp(120px,13vw,210px)", bottom: "-4%", left: "-4%", opacity: 0.45 }}
        />
        <ul
          className="relative m-0 grid list-none p-0"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(40px,5vw,64px) clamp(24px,3vw,40px)",
            paddingTop: "clamp(12px,2vw,24px)",
          }}
        >
          {folders.map((folder, i) => (
            <li key={folder.slug}>
              <WorkFolder folder={folder} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <ContactSection maxWidth={MAX_WIDTH} />

      <SiteFooter links={footerNav} maxWidth={MAX_WIDTH} />
    </PageShell>
  );
}
