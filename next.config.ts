import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 = default for photos; 92 = line drawings (space-planning sheets),
    // where lower quality blurs thin lines and small dimension text.
    qualities: [75, 92],
  },
};

export default nextConfig;
