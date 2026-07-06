"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";
import type { GalleryLayout } from "@/data/projects";
import type { ImageAsset } from "@/lib/assets";

/**
 * The photo experience for a project page: hero, summary, gallery grid, and a
 * full-screen lightbox viewer.
 *
 * The hero and every gallery photo open in the same viewer (hero first), which
 * supports prev/next arrows, arrow-key + Escape control, click-outside to close,
 * and a clickable thumbnail strip along the bottom.
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
}: {
  cover?: ImageAsset;
  gallery: ImageAsset[];
  alt: string;
  summary: string;
  layout?: GalleryLayout;
}) {
  // Viewer order: hero first, then the gallery.
  const photos = cover ? [cover, ...gallery] : gallery;
  /** Grid index i maps to this photo index (offset by the hero). */
  const galleryOffset = cover ? 1 : 0;

  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  // Keyboard controls + scroll lock while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, step]);

  const active = index === null ? null : photos[index];

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
          className="font-serif italic text-ink-body text-center [text-wrap:pretty]"
          style={{ fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.5, margin: "0 auto", maxWidth: "32ch" }}
        >
          {summary}
        </p>
      </section>

      {/* =========================== GALLERY =========================== */}
      <section className="mx-auto" style={{ maxWidth: BLEED_WIDTH, padding: "0 var(--page-gutter) clamp(44px,6vw,80px)" }}>
        <div className="mx-auto" style={{ maxWidth: BODY_WIDTH }}>
          <Eyebrow style={{ marginBottom: 24 }}>Gallery</Eyebrow>
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
                wrapperStyle={{ width: "100%", marginBottom: GAP }}
              />
            ))}
          </div>
        ) : (
          // Wrapping rows: photos fill left→right in order at a uniform height.
          <div className="mx-auto flex flex-wrap" style={{ maxWidth: BODY_WIDTH, gap: GAP, alignItems: "flex-start", justifyContent: "center" }}>
            {gallery.map((photo, i) => (
              <PhotoButton
                key={photo.src}
                photo={photo}
                alt={alt}
                label={`View photo ${i + 1} of ${gallery.length}`}
                onClick={() => setIndex(i + galleryOffset)}
                sizes="(max-width: 700px) 60vw, 340px"
                wrapperStyle={{ height: ROW_HEIGHT, flex: "0 0 auto", borderRadius: 12, overflow: "hidden" }}
                imgClassName="block"
                imgStyle={{ height: "100%", width: "auto", borderRadius: 0 }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ========================== LIGHTBOX ========================== */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — photo ${index! + 1} of ${photos.length}`}
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(20,17,24,.94)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LightboxButton label="Close" onClick={close} autoFocus style={{ top: 16, right: 20 }}>
            ×
          </LightboxButton>

          <p
            className="font-mono"
            style={{
              position: "absolute",
              top: 22,
              left: 0,
              right: 0,
              textAlign: "center",
              margin: 0,
              fontSize: 12,
              letterSpacing: ".14em",
              color: "rgba(255,255,255,.7)",
              pointerEvents: "none",
            }}
          >
            {index! + 1} / {photos.length}
          </p>

          {/* Image stage */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(48px,7vw,72px) clamp(16px,4vw,72px) 16px",
            }}
          >
            {photos.length > 1 && (
              <>
                <LightboxButton
                  label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  style={{ left: 12, top: "50%", transform: "translateY(-50%)" }}
                >
                  ‹
                </LightboxButton>
                <LightboxButton
                  label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  style={{ right: 12, top: "50%", transform: "translateY(-50%)" }}
                >
                  ›
                </LightboxButton>
              </>
            )}

            <Image
              src={active.src}
              alt={alt}
              width={active.width}
              height={active.height}
              sizes="100vw"
              priority
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 8,
                cursor: "default",
              }}
            />
          </div>

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                flex: "0 0 auto",
                display: "flex",
                gap: 8,
                justifyContent: "safe center",
                overflowX: "auto",
                padding: "12px clamp(12px,3vw,24px) 18px",
              }}
            >
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === index}
                  style={{
                    flex: "0 0 auto",
                    width: 68,
                    height: 46,
                    padding: 0,
                    borderRadius: 6,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: i === index ? "2px solid #fff" : "2px solid transparent",
                    opacity: i === index ? 1 : 0.5,
                    transition: "opacity .15s",
                    background: "none",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    sizes="68px"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
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

/** Circular control used for close / prev / next inside the lightbox. */
function LightboxButton({
  label,
  onClick,
  children,
  style,
  autoFocus,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      autoFocus={autoFocus}
      style={{
        position: "absolute",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,.25)",
        background: "rgba(255,255,255,.08)",
        color: "#fff",
        fontSize: 26,
        lineHeight: 1,
        cursor: "pointer",
        backdropFilter: "blur(4px)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
