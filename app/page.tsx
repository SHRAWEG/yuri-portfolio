import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Deco } from "@/components/ui/deco";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectsHeading } from "@/components/sections/projects-heading";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ContactSection } from "@/components/sections/contact-section";
import { assets } from "@/lib/assets";
import { homeNav, footerNav } from "@/data/site";
import { projects } from "@/data/projects";
import { getFeaturedItems } from "@/lib/featured";

const MAX_WIDTH = 1240;

/** Shared centered italic serif paragraph used in hero + about teaser. */
const introSerif =
  "font-serif italic font-normal text-ink-body text-center [text-wrap:pretty]";
const introSerifStyle = {
  fontSize: "clamp(19px, 2.5vw, 27px)",
  lineHeight: 1.5,
} as const;

export default async function HomePage() {
  // Hand-picked lineup from data/featured.ts, with photos resolved at build time.
  const featuredItems = await getFeaturedItems();

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

      {/* ========================= SELECTED WORK ========================= */}
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
          style={{ marginBottom: "clamp(40px,6vw,80px)" }}
        >
          <ProjectsHeading />
          <Eyebrow size={11} tracking=".22em" style={{ marginTop: "clamp(10px,1.6vw,18px)" }}>
            Selected work
          </Eyebrow>
        </div>

        <FeaturedProjects items={featuredItems} />

        <div
          className="flex flex-col items-center text-center"
          style={{ marginTop: "clamp(64px,9vw,120px)", gap: 18 }}
        >
          <p
            className={introSerif}
            style={{ ...introSerifStyle, margin: 0, maxWidth: 520 }}
          >
            More homes, hotels and cafés — plus space-planning layouts — on the
            work page.
          </p>
          <ButtonLink href="/work" variant="solid">
            View all {projects.length} projects →
          </ButtonLink>
        </div>
      </section>

      <ContactSection maxWidth={MAX_WIDTH} />

      <SiteFooter links={footerNav} maxWidth={MAX_WIDTH} />
    </PageShell>
  );
}
