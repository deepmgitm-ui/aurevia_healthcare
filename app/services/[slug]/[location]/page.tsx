import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentLocationLandingPage from "@/components/TreatmentLocationLandingPage";
import { getLocation, getTreatment } from "@/lib/locationLandingData";
import { siteLocationSlugs } from "@/lib/siteLocations";
import { treatmentLandings } from "@/lib/locationLandingData";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return treatmentLandings.flatMap(({ slug }) => siteLocationSlugs.map((location) => ({ slug, location })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; location: string }> }): Promise<Metadata> {
  const { slug, location: locationSlug } = await params;
  const treatment = getTreatment(slug);
  const location = getLocation(locationSlug);
  if (!treatment || !location) return { title: "Treatment page not found" };
  return pageMetadata({
    title: `${treatment.en.label} in ${location.name}`,
    description: `${treatment.en.summary} Explore local care coordination in ${location.name}.`,
    path: `/services/${slug}/${locationSlug}/`,
    languages: { en: `/services/${slug}/${locationSlug}/`, hi: `/hi/services/${slug}/${locationSlug}/` },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string; location: string }> }) {
  const { slug, location } = await params;
  if (!getTreatment(slug) || !getLocation(location)) notFound();
  return <TreatmentLocationLandingPage slug={slug} locationSlug={location} locale="en" />;
}
