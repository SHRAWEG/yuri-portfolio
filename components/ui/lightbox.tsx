"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/lib/assets";

/**
 * Full-screen photo viewer: prev/next arrows, arrow-key + Escape control,
 * click-outside to close, an optional caption, and a clickable thumbnail strip.
 *
 * Controlled: the parent owns `index` (null = closed).
 */
export function Lightbox({
  photos,
  index,
  onIndexChange,
  alt,
  captions,
  quality,
}: {
  photos: ImageAsset[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  alt: string;
  /** Optional caption per photo (same order as `photos`). */
  captions?: (string | undefined)[];
  /** Image quality (must be in `images.qualities`); use 92 for line drawings. */
  quality?: number;
}) {
  const isOpen = index !== null;
  const close = useCallback(() => onIndexChange(null), [onIndexChange]);
  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length],
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

  if (index === null) return null;
  const active = photos[index];
  if (!active) return null;
  const caption = captions?.[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — photo ${index + 1} of ${photos.length}`}
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
        {index + 1} / {photos.length}
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
          alt={caption ?? alt}
          width={active.width}
          height={active.height}
          sizes="100vw"
          quality={quality}
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

      {caption && (
        <p
          className="font-serif italic"
          style={{ margin: 0, textAlign: "center", color: "rgba(255,255,255,.85)", fontSize: 18, padding: "0 20px" }}
        >
          {caption}
        </p>
      )}

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
              onClick={() => onIndexChange(i)}
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
