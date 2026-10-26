import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generates a fully static site in `out/` so GitHub Pages can serve it.
  output: "export",
  // GitHub Pages has no server to resize images, so skip Next's optimizer.
  images: { unoptimized: true },
};

export default nextConfig;
