import Image from "next/image";
import { assets } from "@/lib/assets";

/**
 * The hand-lettered "Projects" title with its watercolor swirl. Used on Home
 * (Selected work) and as the `/work` page title.
 */
export function ProjectsHeading({ as: Tag = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <Tag className="relative inline-block" style={{ width: "min(600px, 74vw)", margin: 0 }}>
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
    </Tag>
  );
}
