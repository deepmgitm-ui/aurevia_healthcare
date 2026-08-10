export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteLocationSlugs } from "@/lib/siteLocations";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aureviahealthcare.com";

const services = [
  "lasik",
  "cataract",
  "sinus",
  "tonsillectomy",
  "septoplasty",
  "ear-perforation",
  "rhinoplasty",
  "gynecomastia",
  "kidney-stone",
  "dental",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/contact",
    "/free-consultation",
    "/terms-conditions",
    "/privacy-policy",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Service pages (e.g., /services/lasik)
  const serviceRoutes: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Location pages (e.g., /services/lasik/delhi)
  const locationRoutes: MetadataRoute.Sitemap = services.flatMap((slug) =>
    siteLocationSlugs.map((loc) => ({
      url: `${siteUrl}/services/${slug}/${loc}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes];
}
