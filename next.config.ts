import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: 'export', // This is the magic line for GitHub Pages
  images: {
    unoptimized: true, // Necessary because GitHub Pages doesn't support Next.js Image Optimization
  },};

export default nextConfig;
