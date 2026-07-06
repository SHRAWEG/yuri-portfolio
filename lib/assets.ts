/**
 * Central manifest of image assets shipped in `public/uploads`.
 * Intrinsic width/height are recorded here so `next/image` can reserve
 * layout space without a runtime measurement. Display size is controlled
 * per-usage via CSS (usually a fluid `width` + `height: auto`).
 */
export type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

export const assets = {
  paperBackground: { src: "/uploads/paper-background.webp", width: 2000, height: 2000 },
  paperSeamless: { src: "/uploads/paper-seamless.webp", width: 2730, height: 1924 },

  // Hand-lettering
  portfolioLettering: { src: "/uploads/portfolio-lettering-new.webp", width: 1152, height: 488 },
  portfolioSwirl: { src: "/uploads/portfolio-swirl-new.webp", width: 1152, height: 488 },
  projectsLettering: { src: "/uploads/projects-lettering.webp", width: 866, height: 378 },
  projectsSwirl: { src: "/uploads/projects-swirl.webp", width: 1167, height: 790 },
  aboutMeLetteringHome: { src: "/uploads/aboutme-lettering-final.webp", width: 1000, height: 561 },
  aboutMeLettering: { src: "/uploads/aboutme-lettering.webp", width: 1000, height: 679 },
  portraitLineart: { src: "/uploads/portrait-lineart.webp", width: 278, height: 292 },

  // Decorative watercolor elements (`.deco`)
  star: { src: "/uploads/star-1.webp", width: 63, height: 65 },
  greenFlower: { src: "/uploads/green-flower.webp", width: 90, height: 85 },
  flowerTopRight: { src: "/uploads/watercolor-flower-topright.webp", width: 230, height: 218 },
  flowerTopRightCropped: { src: "/uploads/watercolor-flower-topright-cropped.webp", width: 167, height: 218 },
  flowerBottomLeft: { src: "/uploads/watercolor-flower-bottomleft.webp", width: 354, height: 269 },
} as const satisfies Record<string, ImageAsset>;

export type AssetKey = keyof typeof assets;
