import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Deco } from "@/components/ui/deco";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/sections/project-card";
import { assets } from "@/lib/assets";
import { getProjectPhotos } from "@/lib/photos";
import { homeNav, homeFooterNav, site } from "@/data/site";
import { projects } from "@/data/projects";

const MAX_WIDTH = 1240;

/** Shared centered italic serif paragraph used in hero + about teaser. */
const introSerif =
  "font-serif italic font-normal text-ink-body text-center [text-wrap:pretty]";
const introSerifStyle = {
  fontSize: "clamp(19px, 2.5vw, 27px)",
  lineHeight: 1.5,
} as const;

export default async function HomePage() {
  // Discover each project's cover photo (from public/projects/<slug>/) at build time.
  const covers = await Promise.all(
    projects.map((project) =>
      getProjectPhotos(project.slug).then((p) => p.cover),
    ),
  );

  return (
    <PageShell>
      <Deco
        asset={assets.flowerTopRightCropped}
        style={{
          width: "clamp(80px, 10vw, 150px)",
          top: 24,
          right: 0,
          zIndex: 50,
          opacity: 0.95,
        }}
      />

      <SiteHeader variant="transparent" maxWidth={MAX_WIDTH} links={homeNav} />

      {/* ============================= HERO ============================= */}
      <section
        aria-label="Introduction"
        className="relative mx-auto"
        style={{
          maxWidth: MAX_WIDTH,
          padding: "clamp(48px,9vw,120px) var(--page-gutter) 0",
        }}
      >
        <Deco
          asset={assets.star}
          style={{
            width: "clamp(34px,5vw,64px)",
            top: "6%",
            left: "2%",
            opacity: 0.85,
          }}
        />
        <Deco
          asset={assets.flowerBottomLeft}
          show="lg"
          style={{
            width: "clamp(120px,14vw,230px)",
            bottom: "-6%",
            left: "-3%",
            opacity: 0.55,
          }}
        />
        <Deco
          asset={assets.greenFlower}
          show="md"
          style={{
            width: "clamp(26px,3vw,42px)",
            top: "60%",
            right: "9%",
            opacity: 0.9,
          }}
        />

        <div className="relative z-2 flex flex-col items-center text-center">
          <div
            className="relative inline-block"
            style={{ width: "min(960px, 92vw)" }}
          >
            <Image
              src={assets.portfolioSwirl.src}
              alt=""
              aria-hidden
              width={assets.portfolioSwirl.width}
              height={assets.portfolioSwirl.height}
              priority
              className="pointer-events-none"
              style={{
                position: "absolute",
                left: "-19%",
                top: "2%",
                width: "105%",
                height: "auto",
                zIndex: 1,
                opacity: 0.95,
              }}
            />
            <Image
              src={assets.portfolioLettering.src}
              alt="Portfolio"
              width={assets.portfolioLettering.width}
              height={assets.portfolioLettering.height}
              priority
              className="relative block"
              style={{ zIndex: 2, width: "100%", height: "auto" }}
            />
          </div>

          <p
            className="font-overpass text-center"
            style={{
              margin: "clamp(6px,1vw,14px) 0 0",
              fontSize: "clamp(11px,1.5vw,16px)",
              letterSpacing: ".01em",
              color: "#1c1a1f",
              whiteSpace: "nowrap",
            }}
          >
            Interior Architecture-2026
          </p>

          <p
            className={introSerif}
            style={{
              ...introSerifStyle,
              maxWidth: 600,
              margin: "clamp(18px,2.4vw,30px) auto 0",
            }}
          >
            Welcome to my digital gallery. As an interior architect, I am
            dedicated to creating spaces that evoke emotion while balancing
            function and purpose. Here, you&apos;ll find a curated look at how I
            translate that philosophy into physical form.
          </p>
        </div>
      </section>

      {/* ========================= ABOUT TEASER ========================= */}
      <section
        className="relative mx-auto"
        style={{
          maxWidth: MAX_WIDTH,
          padding:
            "clamp(56px,9vw,120px) var(--page-gutter) clamp(40px,6vw,80px)",
        }}
      >
        <Deco
          asset={assets.flowerBottomLeft}
          show="lg"
          style={{
            width: "clamp(120px,15vw,240px)",
            bottom: "2%",
            right: "-2%",
            opacity: 0.5,
          }}
        />
        <Deco
          asset={assets.greenFlower}
          show="md"
          style={{
            width: "clamp(26px,3vw,42px)",
            top: "8%",
            left: "6%",
            opacity: 0.9,
          }}
        />

        <div className="relative z-2 mx-auto" style={{ maxWidth: 1040 }}>
          <Image
            src={assets.aboutMeLetteringHome.src}
            alt="About me"
            width={assets.aboutMeLetteringHome.width}
            height={assets.aboutMeLetteringHome.height}
            className="mx-auto block"
            style={{ width: "min(760px, 92%)", height: "auto" }}
          />
          <div
            className="mx-auto text-center"
            style={{ maxWidth: 600, marginTop: 48 }}
          >
            <p
              className={introSerif}
              style={{ ...introSerifStyle, margin: "0 0 20px" }}
            >
              Hi, I&apos;m Yuri Bajracharya, an interior architect based in
              Kathmandu, Nepal, with over three years of professional
              experience. For me, design is a profound interest and a daily
              passion—I find my ultimate fulfillment in optimizing spaces to
              improve daily living and bring my clients&apos; visions to life.
            </p>
          </div>
        </div>
      </section>

      {/* =========================== PROJECTS =========================== */}
      <section
        id="work"
        className="relative mx-auto scroll-mt-24"
        style={{
          maxWidth: MAX_WIDTH,
          padding: "clamp(40px,6vw,80px) var(--page-gutter)",
        }}
      >
        <Deco
          asset={assets.star}
          show="md"
          style={{
            width: "clamp(30px,3.5vw,48px)",
            top: "2%",
            right: "4%",
            opacity: 0.7,
          }}
        />

        <div
          className="relative flex flex-col items-center text-center"
          style={{ marginBottom: "clamp(26px,3.5vw,44px)" }}
        >
          <div
            className="relative inline-block"
            style={{ width: "min(600px, 74vw)" }}
          >
            <Image
              src={assets.projectsSwirl.src}
              alt=""
              aria-hidden
              width={assets.projectsSwirl.width}
              height={assets.projectsSwirl.height}
              className="pointer-events-none"
              style={{
                position: "absolute",
                left: "-5%",
                top: "-33%",
                width: "150%",
                height: "auto",
                zIndex: 1,
                opacity: 0.95,
              }}
            />
            <Image
              src={assets.projectsLettering.src}
              alt="Projects"
              width={assets.projectsLettering.width}
              height={assets.projectsLettering.height}
              className="relative block"
              style={{ zIndex: 2, width: "100%", height: "auto" }}
            />
          </div>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(20px,2.4vw,32px)",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              cover={covers[i]}
            />
          ))}
        </div>
      </section>

      {/* =========================== CONTACT =========================== */}
      <section
        id="contact"
        className="relative mx-auto overflow-hidden text-center scroll-mt-24"
        style={{
          maxWidth: MAX_WIDTH,
          padding: "clamp(56px,9vw,120px) var(--page-gutter)",
        }}
      >
        <Deco
          asset={assets.star}
          show="md"
          style={{
            width: "clamp(34px,4vw,56px)",
            bottom: "14%",
            right: "6%",
            opacity: 0.8,
          }}
        />
        <Deco
          asset={assets.greenFlower}
          style={{
            width: "clamp(24px,3vw,40px)",
            top: 99,
            left: 87,
            opacity: 0.9,
          }}
        />

        <div className="relative z-2 mx-auto" style={{ maxWidth: 680 }}>
          <h2
            className="font-serif font-medium"
            style={{
              fontSize: "clamp(36px,6.5vw,76px)",
              lineHeight: 1.02,
              margin: "0 0 20px",
              letterSpacing: "-.015em",
            }}
          >
            Let&apos;s design
            <br />
            &nbsp;something together.
          </h2>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "clamp(12px,2vw,20px)" }}>
            <ButtonLink href={`mailto:${site.email}`} variant="solid">
              {site.email}
            </ButtonLink>
            <ButtonLink href={site.cvHref} variant="ghost" download>
              Download CV
            </ButtonLink>
          </div>
          <p
            className="font-mono text-ink-muted"
            style={{ fontSize: 12, letterSpacing: ".08em", margin: "26px 0 0" }}
          >
            {site.location}
          </p>
        </div>
      </section>

      <SiteFooter links={homeFooterNav} maxWidth={MAX_WIDTH} />
    </PageShell>
  );
}
