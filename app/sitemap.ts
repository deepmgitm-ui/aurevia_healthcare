export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteLocationSlugs } from "@/lib/siteLocations";
import { treatmentLandings } from "@/lib/locationLandingData";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about/",
    "/services/",
    "/treatments/",
    "/how-it-works/",
    "/voices/",
    "/locations/",
    "/hi/locations/",
    "/contact/",
    "/free-consultation/",
    "/terms-conditions/",
    "/privacy-policy/",
    "/disclaimer/",
    "/photo-credits/",
  ].map((path) => ({
    url: new URL(path, `${SITE_URL}/`).toString(),
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Service pages (e.g., /services/lasik)
  const services = treatmentLandings.map(({ slug }) => slug);
  const serviceRoutes: MetadataRoute.Sitemap = services.map((slug) => ({
    url: new URL(`/services/${slug}/`, `${SITE_URL}/`).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const regionRoutes: MetadataRoute.Sitemap = siteLocationSlugs.flatMap((location) => [
    { url: new URL(`/locations/${location}/`, `${SITE_URL}/`).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: new URL(`/hi/locations/${location}/`, `${SITE_URL}/`).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
  ]);

  // Location pages (e.g., /services/lasik/delhi)
  const locationRoutes: MetadataRoute.Sitemap = services.flatMap((slug) =>
    siteLocationSlugs.flatMap((loc) => [
      { url: new URL(`/services/${slug}/${loc}/`, `${SITE_URL}/`).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
      { url: new URL(`/hi/services/${slug}/${loc}/`, `${SITE_URL}/`).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    ])
  );

  return [...staticRoutes, ...serviceRoutes, ...regionRoutes, ...locationRoutes];
}
