import {
  Cormorant_Garamond,
  Mulish,
  Space_Mono,
  Overpass_Mono,
} from "next/font/google";

/**
 * Cormorant Garamond — serif display face.
 * Headings, italic pull-quotes, project titles, big stat numbers.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

/**
 * Mulish — sans body / default UI face.
 */
export const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-mulish",
});

/**
 * Space Mono — eyebrows, labels, meta, buttons, tags.
 */
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

/**
 * Overpass Mono — used only for the hero subtitle on Home.
 */
export const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-overpass-mono",
});

/** Combined font CSS-variable classes to attach to <html>/<body>. */
export const fontVariables = [
  cormorant.variable,
  mulish.variable,
  spaceMono.variable,
  overpassMono.variable,
].join(" ");
