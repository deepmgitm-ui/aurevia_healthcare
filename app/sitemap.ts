export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteLocationSlugs } from "@/lib/siteLocations";
import { treatmentLandings } from "@/lib/locationLandingData";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aureviahealthcare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/locations",
    "/hi/locations",
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
  const services = treatmentLandings.map(({ slug }) => slug);
  const serviceRoutes: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const regionRoutes: MetadataRoute.Sitemap = siteLocationSlugs.flatMap((location) => [
    { url: `${siteUrl}/locations/${location}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${siteUrl}/hi/locations/${location}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
  ]);

  // Location pages (e.g., /services/lasik/delhi)
  const locationRoutes: MetadataRoute.Sitemap = services.flatMap((slug) =>
    siteLocationSlugs.flatMap((loc) => [
      { url: `${siteUrl}/services/${slug}/${loc}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
      { url: `${siteUrl}/hi/services/${slug}/${loc}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    ])
  );

  return [...staticRoutes, ...serviceRoutes, ...regionRoutes, ...locationRoutes];
}
