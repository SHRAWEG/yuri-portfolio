"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/lightbox";
import type { ResolvedSlider } from "@/lib/work-folders";
import type { ImageAsset } from "@/lib/assets";

/**
 * A space plan's before/after sliders (see `sliders` in
 * data/space-planning.ts). A single untitled slider renders on its own;
 * otherwise each gets a heading (with its notes) above it.
 */
export function PlanSliders({ sliders, title }: { sliders: ResolvedSlider[]; title: string }) {
  if (sliders.length === 1 && !sliders[0].title) {
    const [s] = sliders;
    return <RevealSlider under={s.under} over={s.over} title={title} />;
  }

  return (
    <div style={{ display: "grid", gap: "clamp(48px,7vw,88px)" }}>
      {sliders.map((s, i) => (
        <section key={`${s.under.image.src}|${s.over.image.src}`} aria-label={s.title}>
          <header
            className="flex flex-col md:flex-row md:items-end md:justify-between"
            style={{ gap: "10px 32px", marginBottom: "clamp(16px,2.4vw,24px)" }}
          >
            <div>
              <p className={`${monoLabel} text-accent`} style={{ ...monoLabelStyle, margin: 0 }}>
                {String(i + 1).padStart(2, "0")} / {String(sliders.length).padStart(2, "0")}
              </p>
              {s.title && (
                <h2
                  className="font-serif font-medium text-ink"
                  style={{ fontSize: "clamp(28px,3.6vw,44px)", lineHeight: 1.05, margin: "8px 0 0" }}
                >
                  {s.title}
                </h2>
              )}
            </div>
            {s.notes.length > 0 && (
              <ul
                className="m-0 text-ink-body-2 md:text-right"
                style={{ fontSize: 14, lineHeight: 1.6, paddingLeft: 18, listStyle: "disc" }}
              >
                {s.notes.map((n) => (
                  <li key={n} className="md:list-none">
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </header>
          <RevealSlider
            under={s.under}
            over={s.over}
            title={s.title ? `${title} — ${s.title}` : title}
            eager={i === 0}
          />
        </section>
      ))}
    </div>
  );
}

/**
 * Keep a drawing fully on screen: as wide as the page allows, but never taller
 * than the viewport minus the sticky header and a little breathing room.
 */
const VIEWPORT_ROOM = "(100svh - 150px)";
const fitToScreen = (img: ImageAsset) =>
  ({
    aspectRatio: `${img.width} / ${img.height}`,
    width: `min(100%, calc(${VIEWPORT_ROOM} * ${(img.width / img.height).toFixed(4)}))`,
    marginInline: "auto",
  }) as const;

/** Line drawings need more than the default 75 quality (see next.config.ts). */
const DRAWING_QUALITY = 92;

const monoLabel = "font-mono uppercase";
const monoLabelStyle = { fontSize: 11, letterSpacing: ".2em" } as const;

/**
 * Two drawings that line up exactly. Drag the handle (or use the arrow keys)
 * to wipe from `under` (left) to `over` (right). Both open full screen.
 */
function RevealSlider({
  under,
  over,
  title,
  eager = true,
}: {
  under: { label: string; image: ImageAsset };
  over: { label: string; image: ImageAsset };
  title: string;
  /** Load immediately (top of page) instead of lazily as it scrolls in. */
  eager?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const [index, setIndex] = useState<number | null>(null);
  const pill = {
    ...monoLabelStyle,
    fontSize: 10,
    padding: "6px 12px",
    borderRadius: 20,
    background: "rgba(244,240,233,.92)",
    color: "var(--color-ink)",
    pointerEvents: "none" as const,
  };

  return (
    <>
      <div
        className="reveal relative select-none overflow-hidden"
        style={{
          ...fitToScreen(under.image),
          borderRadius: 16,
          border: "1px solid rgba(35,31,38,.1)",
          background: "#fff",
          boxShadow: "0 30px 60px -40px rgba(35,31,38,.45)",
        }}
      >
        <Image
          src={under.image.src}
          alt={`${title} — ${under.label}`}
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          quality={DRAWING_QUALITY}
          style={{ objectFit: "cover" }}
          priority={eager}
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image
            src={over.image.src}
            alt={`${title} — ${over.label}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            quality={DRAWING_QUALITY}
            style={{ objectFit: "cover" }}
            priority={eager}
          />
        </div>

        {/* Divider + knob */}
        <div
          aria-hidden
          className="absolute inset-y-0"
          style={{
            left: `${pos}%`,
            width: 2,
            marginLeft: -1,
            background: "#fff",
            boxShadow: "0 0 0 1px rgba(35,31,38,.15)",
            pointerEvents: "none",
          }}
        >
          <span
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white"
            style={{
              width: 46,
              height: 46,
              background: "var(--color-accent)",
              boxShadow: "0 10px 24px -8px rgba(35,31,38,.6)",
              fontSize: 18,
              letterSpacing: 2,
            }}
          >
            ‹›
          </span>
        </div>

        <span className={`${monoLabel} absolute`} style={{ ...pill, top: 14, left: 14, opacity: pos > 12 ? 1 : 0 }}>
          {under.label}
        </span>
        <span className={`${monoLabel} absolute`} style={{ ...pill, top: 14, right: 14, opacity: pos < 88 ? 1 : 0 }}>
          {over.label}
        </span>

        {/* Invisible range input on top: drag anywhere, keyboard accessible. */}
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Slide between ${under.label} and ${over.label}`}
          className="reveal-range absolute inset-0 h-full w-full cursor-ew-resize"
          style={{ opacity: 0, margin: 0, touchAction: "pan-y" }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center" style={{ gap: 10, marginTop: 18 }}>
        <span className="text-ink-muted" style={{ fontSize: 13, marginRight: 6 }}>
          Drag across the plan to compare ·
        </span>
        <button type="button" className="mini-btn" onClick={() => setIndex(0)}>
          {under.label} full screen
        </button>
        <button type="button" className="mini-btn" onClick={() => setIndex(1)}>
          {over.label} full screen
        </button>
      </div>

      <Lightbox
        photos={[under.image, over.image]}
        captions={[under.label, over.label]}
        index={index}
        onIndexChange={setIndex}
        alt={title}
        quality={DRAWING_QUALITY}
      />
    </>
  );
}
