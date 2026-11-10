"use client";

import { useState } from "react";

/**
 * Copies `value` to the clipboard and briefly confirms. Handy for people
 * without a desktop mail app, where `mailto:` links do nothing.
 */
export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button type="button" onClick={copy} className="mini-btn" aria-live="polite">
      {state === "copied" ? "Copied ✓" : state === "failed" ? "Select & copy" : label}
    </button>
  );
}
