import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    // Keep local development responsive on lower-core / memory-constrained PCs.
    cpus: 2,
    workerThreads: false,
    webpackMemoryOptimizations: true,
  },
  onDemandEntries: {
    // Avoid recompiling recently visited routes during local navigation.
    maxInactiveAge: 10 * 60 * 1_000,
    pagesBufferLength: 20,
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
