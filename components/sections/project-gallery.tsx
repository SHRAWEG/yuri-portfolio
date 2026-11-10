"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";
import { Lightbox } from "@/components/ui/lightbox";
import { summaryStyle } from "@/lib/summary-style";
import type { GalleryLayout } from "@/data/projects";
import type { ImageAsset } from "@/lib/assets";

/**
 * The photo experience for a project page: hero, summary, gallery grid, and a
 * full-screen lightbox viewer.
 *
 * The hero and every gallery photo open in the same viewer (hero first) — see
 * `components/ui/lightbox.tsx`.
 *
 * With no photos yet, the hero and grid fall back to placeholders.
 */

const BODY_WIDTH = 1100;
const BLEED_WIDTH = 1280;
const GAP = "clamp(18px,2.4vw,28px)";
/** Uniform row height for the wrapping "grid" gallery; widths follow each ratio. */
const ROW_HEIGHT = "clamp(150px,24vw,260px)";
const PLACEHOLDER_TILES = ["4/3", "3/4", "1/1"] as const;

export function ProjectGallery({
  cover,
  gallery,
  alt,
  summary,
  layout = "grid",
  afterSummary,
  galleryLabel = "Gallery",
}: {
  cover?: ImageAsset;
  gallery: ImageAsset[];
  alt: string;
  summary: string;
  layout?: GalleryLayout;
  /** Optional content between the summary and the gallery (e.g. before/after). */
  afterSummary?: React.ReactNode;
  /** Kicker above the gallery grid. */
  galleryLabel?: string;
}) {
  // Viewer order: hero first, then the gallery.
  const photos = cover ? [cover, ...gallery] : gallery;
  /** Grid index i maps to this photo index (offset by the hero). */
  const galleryOffset = cover ? 1 : 0;

  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      {/* ============================= HERO ============================= */}
      <section
        className="mx-auto flex justify-center"
        style={{ maxWidth: BLEED_WIDTH, padding: "0 var(--page-gutter) clamp(28px,4vw,48px)" }}
      >
        {cover ? (
          <button
            type="button"
            onClick={() => setIndex(0)}
            aria-label="View hero photo"
            className="gphoto"
            style={{ display: "block", padding: 0, border: "none", background: "none", cursor: "zoom-in", borderRadius: 20, maxWidth: "100%" }}
          >
            <Image
              src={cover.src}
              alt={alt}
              width={cover.width}
              height={cover.height}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="block"
              // Natural ratio, no crop; bounded by width and viewport height.
              style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "80vh", borderRadius: 20 }}
            />
          </button>
        ) : (
          <Placeholder label="Hero photo" ratio="16/9" />
        )}
      </section>

      {/* =========================== SUMMARY =========================== */}
      <section className="mx-auto" style={{ maxWidth: BODY_WIDTH, padding: "clamp(8px,2vw,24px) var(--page-gutter) clamp(28px,4vw,48px)" }}>
        <p
          className="font-serif italic text-ink-body [text-wrap:pretty]"
          style={{ ...summaryStyle(summary), margin: "0 auto" }}
        >
          {summary}
        </p>
      </section>

      {afterSummary}

      {/* =========================== GALLERY =========================== */}
      {/* Hidden when there's a hero but nothing else to show. */}
      {!(cover && gallery.length === 0) && (
        <section className="mx-auto" style={{ maxWidth: BLEED_WIDTH, padding: "0 var(--page-gutter) clamp(44px,6vw,80px)" }}>
          <div className="mx-auto" style={{ maxWidth: BODY_WIDTH }}>
            <Eyebrow style={{ marginBottom: 24 }}>{galleryLabel}</Eyebrow>
          </div>

          {gallery.length === 0 ? (
            // No photos yet → mixed-ratio placeholder tiles.
            <div className="mx-auto" style={{ maxWidth: BODY_WIDTH, columnWidth: "300px", columnGap: GAP }}>
              {PLACEHOLDER_TILES.map((ratio, i) => (
                <div key={i} style={{ marginBottom: GAP, breakInside: "avoid" }}>
                  <Placeholder label="Photo" ratio={ratio} />
                </div>
              ))}
            </div>
          ) : layout === "stacked" ? (
            // Large, full-width photos stacked one per row.
            <div className="mx-auto" style={{ maxWidth: BLEED_WIDTH }}>
              {gallery.map((photo, i) => (
                <PhotoButton
                  key={photo.src}
                  photo={photo}
                  alt={alt}
                  label={`View photo ${i + 1} of ${gallery.length}`}
                  onClick={() => setIndex(i + galleryOffset)}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  // Capped to the screen height so each one is visible without scrolling.
                  wrapperStyle={{ width: "fit-content", maxWidth: "100%", margin: `0 auto ${GAP}` }}
                  imgClassName="block"
                  imgStyle={{ width: "auto", maxWidth: "100%", maxHeight: "calc(100svh - 150px)" }}
                />
              ))}
            </div>
          ) : (
            <PhotoRows photos={gallery} alt={alt} onOpen={(i) => setIndex(i + galleryOffset)} />
        )}
      </section>
      )}

      {/* ========================== LIGHTBOX ========================== */}
      <Lightbox photos={photos} index={index} onIndexChange={setIndex} alt={alt} />
    </>
  );
}

/** Wrapping rows: photos fill left→right in order at a uniform height. */
function PhotoRows({
  photos,
  alt,
  onOpen,
}: {
  photos: ImageAsset[];
  alt: string;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="mx-auto flex flex-wrap" style={{ maxWidth: BODY_WIDTH, gap: GAP, alignItems: "flex-start", justifyContent: "center" }}>
      {photos.map((photo, i) => (
        <PhotoButton
          key={photo.src}
          photo={photo}
          alt={alt}
          label={`View photo ${i + 1} of ${photos.length}`}
          onClick={() => onOpen(i)}
          sizes="(max-width: 700px) 60vw, 340px"
          wrapperStyle={{ height: ROW_HEIGHT, flex: "0 0 auto", borderRadius: 12, overflow: "hidden" }}
          imgClassName="block"
          imgStyle={{ height: "100%", width: "auto", borderRadius: 0 }}
        />
      ))}
    </div>
  );
}

/** A clickable gallery photo (opens the lightbox). Shared by grid + stacked. */
function PhotoButton({
  photo,
  alt,
  label,
  onClick,
  sizes,
  wrapperStyle,
  imgClassName = "block w-full",
  imgStyle,
}: {
  photo: ImageAsset;
  alt: string;
  label: string;
  onClick: () => void;
  sizes: string;
  wrapperStyle?: React.CSSProperties;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="gphoto"
      style={{
        display: "block",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "zoom-in",
        borderRadius: 16,
        ...wrapperStyle,
      }}
    >
      <Image
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        className={imgClassName}
        style={{ height: "auto", borderRadius: 16, ...imgStyle }}
      />
    </button>
  );
}
