import Link from "next/link";
import { site } from "@/data/site";

/**
 * Brand lockup used in every header: serif name stacked over the mono role.
 * Links home.
 */
export function Brand() {
  return (
    <Link href="/" className="flex flex-col leading-none no-underline">
      <span
        className="font-serif font-semibold text-ink"
        style={{ fontSize: "clamp(19px, 2.2vw, 23px)", letterSpacing: ".01em" }}
      >
        {site.name}
      </span>
      <span
        className="font-mono uppercase text-accent"
        style={{ fontSize: "10px", letterSpacing: ".22em", marginTop: "5px" }}
      >
        {site.role}
      </span>
    </Link>
  );
}
