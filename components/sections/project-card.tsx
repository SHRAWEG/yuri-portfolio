import Link from "next/link";
import Image from "next/image";
import { projectMeta, type Project } from "@/data/projects";
import type { ImageAsset } from "@/lib/assets";

/**
 * Project grid card. Lifts on hover, the image gains a soft shadow, and a
 * lilac arrow slides in beside the title (see `.pcard` in globals.css).
 *
 * Shows the project's `cover` photo (discovered from `public/projects/<slug>/`
 * at build time) when one exists; otherwise a patterned placeholder stands in
 * until photos are added.
 */
export function ProjectCard({ project, cover }: { project: Project; cover?: ImageAsset }) {
  return (
    <Link className="pcard" href={`/projects/${project.slug}`}>
      <div
        className="pimg relative flex items-center justify-center overflow-hidden"
        style={{
          aspectRatio: "4/5",
          borderRadius: 24,
          border: "1px solid rgba(35,31,38,.1)",
          background: cover
            ? undefined
            : "repeating-linear-gradient(135deg,#ece6f3,#ece6f3 12px,#f2edf7 12px,#f2edf7 24px)",
        }}
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={project.name}
            width={cover.width}
            height={cover.height}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: ".16em", color: "#9a8fb0" }}
          >
            Project · 4:5
          </span>
        )}
      </div>

      <div style={{ marginTop: 13 }}>
        <h3
          className="font-serif font-medium text-ink"
          style={{ fontSize: "clamp(20px, 2.4vw, 25px)", margin: 0, lineHeight: 1.15 }}
        >
          {project.name}
          <span
            className="parrow font-sans text-accent"
            style={{ display: "inline-block", marginLeft: 6, fontSize: ".62em" }}
          >
            →
          </span>
        </h3>
        <p
          className="font-mono text-ink-muted"
          style={{ fontSize: 11, letterSpacing: ".08em", margin: "6px 0 0" }}
        >
          {projectMeta(project)}
        </p>
      </div>
    </Link>
  );
}
