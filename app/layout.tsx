import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Interior Architect`,
    template: `%s · ${site.name}`,
  },
  description:
    "Interiors for the way people actually live — homes, cafés and public spaces across the Kathmandu Valley, resolved down to the last joint and hinge.",
  metadataBase: new URL("https://yuribajracharya.com"),
  openGraph: {
    title: `${site.name} — Interior Architect`,
    description:
      "Warm, editorial interior architecture across the Kathmandu Valley, with a focus on inclusive public design.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
