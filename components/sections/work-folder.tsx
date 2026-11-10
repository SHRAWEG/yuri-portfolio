import Link from "next/link";
import Image from "next/image";
import type { WorkFolder as WorkFolderData } from "@/lib/work-folders";

/** Resting rotation/offset for up to three peeking sheets (left → right). */
const SHEETS = [
  { left: "6%", rotate: -7 },
  { left: "29%", rotate: 1.5 },
  { left: "52%", rotate: 8 },
] as const;

/**
 * A paper folder for one `/work` category. Cover photos peek out of the top;
 * on hover they rise and fan while the front flap tips open (see `.folder`
 * in globals.css). Links to `/work/<slug>`.
 */
export function WorkFolder({ folder, index }: { folder: WorkFolderData; index: number }) {
  const sheets = folder.previews.slice(0, 3);
  // Center a short stack (1–2 sheets) instead of leaving a gap on the right.
  const shift = sheets.length === 1 ? 23 : sheets.length === 2 ? 11.5 : 0;

  return (
    <Link href={`/work/${folder.slug}`} className="folder block no-underline" aria-label={`${folder.label} — ${folder.countLabel}`}>
      <div className="folder-body">
        <div className="folder-tab" aria-hidden />
        <div className="folder-back" aria-hidden />

        {sheets.map((img, i) => (
          <div
            key={img.src}
            className="folder-sheet"
            aria-hidden
            style={
              {
                left: `calc(${SHEETS[i].left} + ${shift}%)`,
                "--r": `${SHEETS[i].rotate}deg`,
                "--lift": `${-26 - i * 4}%`,
                zIndex: 2 + i,
              } as React.CSSProperties
            }
          >
            <Image
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              sizes="220px"
              className="h-full w-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}

        <div className="folder-front">
          <span
            className="font-mono uppercase text-accent"
            style={{ fontSize: 10, letterSpacing: ".22em" }}
          >
            Folder {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="block font-serif font-medium text-ink"
            style={{ fontSize: "clamp(26px,2.8vw,34px)", lineHeight: 1.05, marginTop: 8 }}
          >
            {folder.label}
          </span>
          <span
            className="mt-auto flex items-center justify-between font-mono text-ink-muted"
            style={{ fontSize: 11, letterSpacing: ".08em" }}
          >
            {folder.countLabel}
            <span className="narrow font-serif text-accent" style={{ fontSize: 24, lineHeight: 1 }}>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
