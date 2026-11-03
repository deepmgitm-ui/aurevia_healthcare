import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampaignLandingPage from "@/components/CampaignLandingPage";
import { buildGpCampaignSlug, getGpCampaignRoute, gpCampaignParams } from "@/lib/gpCampaignRoutes";
import { SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return gpCampaignParams;
}

export async function generateMetadata({ params }: { params: Promise<{ campaign: string }> }): Promise<Metadata> {
  const { campaign } = await params;
  const route = getGpCampaignRoute(campaign);
  if (!route) return { title: "Campaign | Aurevia Healthcare", robots: { index: false, follow: false } };
  const copy = route.treatment[route.locale];
  const canonicalSlug = buildGpCampaignSlug(route.treatment.slug, route.location.slug, route.locale);
  const canonical = new URL(`/gp/${canonicalSlug}/`, SITE_URL).toString();
  return {
    title: `${copy.label} in ${route.location.name} | Aurevia Healthcare`,
    description: copy.summary,
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: { type: "website", siteName: "Aurevia Healthcare", title: `${copy.label} in ${route.location.name}`, description: copy.summary, url: canonical, images: [{ url: route.treatment.image, alt: copy.imageAlt }] },
  };
}

export default async function GpCampaignPage({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  const route = getGpCampaignRoute(campaign);
  if (!route) notFound();
  const alternateLocale = route.locale === "en" ? "hi" : "en";
  const languageHrefOverride = `/gp/${buildGpCampaignSlug(route.treatment.slug, route.location.slug, alternateLocale)}/`;
  return <CampaignLandingPage treatment={route.treatment} locale={route.locale} initialLocation={route.location.slug} languageHrefOverride={languageHrefOverride} />;
}
