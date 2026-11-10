import type React from "react";

/** Short summaries read as a large centred pull-quote; long descriptions as a readable paragraph. */
export function summaryStyle(text: string): React.CSSProperties {
  return text.length > 240
    ? { fontSize: "clamp(18px,2vw,23px)", lineHeight: 1.6, maxWidth: "58ch", textAlign: "left" }
    : { fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.5, maxWidth: "32ch", textAlign: "center" };
}
