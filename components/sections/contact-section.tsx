import type { ReactNode } from "react";
import { Deco } from "@/components/ui/deco";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { assets } from "@/lib/assets";
import { instagramUrl, mailtoHref, site } from "@/data/site";

/**
 * Contact: the big serif sign-off, then a hairline list of ways to reach out —
 * email (open a pre-addressed draft, or copy the address), Instagram, and
 * location — with the CV download underneath. Shared by Home and `/work`.
 */
export function ContactSection({ maxWidth }: { maxWidth: number }) {
  return (
    <section
      id="contact"
      className="relative mx-auto overflow-hidden scroll-mt-24"
      style={{ maxWidth, padding: "clamp(56px,9vw,120px) var(--page-gutter)" }}
    >
      <Deco
        asset={assets.star}
        show="md"
        style={{ width: "clamp(34px,4vw,56px)", bottom: "14%", right: "6%", opacity: 0.8 }}
      />
      <Deco
        asset={assets.greenFlower}
        style={{ width: "clamp(24px,3vw,40px)", top: 99, left: 87, opacity: 0.9 }}
      />

      <div className="relative z-2 mx-auto" style={{ maxWidth: 760 }}>
        <h2
          className="text-center font-serif font-medium"
          style={{
            fontSize: "clamp(36px,6.5vw,76px)",
            lineHeight: 1.02,
            margin: "0 0 clamp(14px,2vw,20px)",
            letterSpacing: "-.015em",
          }}
        >
          Let&apos;s design
          <br />
          &nbsp;something together.
        </h2>
        <p
          className="mx-auto text-center font-serif italic text-ink-body [text-wrap:pretty]"
          style={{ fontSize: "clamp(18px,2vw,22px)", lineHeight: 1.5, maxWidth: 520, margin: "0 auto" }}
        >
          Have a space in mind? Send a few lines about it — I usually reply within a couple of days.
        </p>

        <ul
          className="m-0 list-none p-0"
          style={{ marginTop: "clamp(32px,5vw,52px)", borderTop: "1px solid rgba(35,31,38,.14)" }}
        >
          <ContactRow label="Email">
            <a href={mailtoHref} className="crow-link font-serif text-ink" style={valueStyle}>
              {site.email}
            </a>
            <div className="flex flex-wrap items-center" style={{ gap: 10 }}>
              <CopyButton value={site.email} />
              <a href={mailtoHref} className="mini-btn">
                Write an email
              </a>
            </div>
          </ContactRow>

          <ContactRow label="Instagram">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="crow-link inline-flex items-center font-serif text-ink"
              style={{ ...valueStyle, gap: 10 }}
            >
              <InstagramIcon />@{site.instagram}
              <span className="narrow font-sans text-accent" style={{ fontSize: ".6em" }}>
                ↗
              </span>
            </a>
          </ContactRow>

          <ContactRow label="Based in">
            <span className="font-serif text-ink" style={valueStyle}>
              {site.location}
            </span>
          </ContactRow>
        </ul>

        <div className="flex justify-center" style={{ marginTop: "clamp(32px,4vw,44px)" }}>
          <ButtonLink href={site.cvHref} variant="ghost" download>
            Download CV
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

const valueStyle = { fontSize: "clamp(21px,2.6vw,28px)", lineHeight: 1.2 } as const;

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li
      className="crow grid items-center sm:grid-cols-[130px_1fr_auto]"
      style={{
        gap: "8px 20px",
        padding: "clamp(16px,2.4vw,22px) 12px",
        borderBottom: "1px solid rgba(35,31,38,.14)",
      }}
    >
      <span className="font-mono uppercase text-accent" style={{ fontSize: 11, letterSpacing: ".2em" }}>
        {label}
      </span>
      {children}
    </li>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      width="0.8em"
      height="0.8em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-accent"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
