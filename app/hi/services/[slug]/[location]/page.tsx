import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentLocationLandingPage from "@/components/TreatmentLocationLandingPage";
import { getLocation, getTreatment, treatmentLandings } from "@/lib/locationLandingData";
import { siteLocationSlugs } from "@/lib/siteLocations";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return treatmentLandings.flatMap(({ slug }) => siteLocationSlugs.map((location) => ({ slug, location })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; location: string }> }): Promise<Metadata> {
  const { slug, location: locationSlug } = await params;
  const treatment = getTreatment(slug);
  const location = getLocation(locationSlug);
  if (!treatment || !location) return { title: "उपचार पेज नहीं मिला" };
  return pageMetadata({
    title: `${location.name} में ${treatment.hi.label}`,
    description: `${location.name} में ${treatment.hi.label} की जानकारी और उपचार समन्वय के विकल्प देखें।`,
    path: `/hi/services/${slug}/${locationSlug}/`,
    locale: "hi",
    languages: { en: `/services/${slug}/${locationSlug}/`, hi: `/hi/services/${slug}/${locationSlug}/` },
  });
}

export default async function HindiPage({ params }: { params: Promise<{ slug: string; location: string }> }) {
  const { slug, location } = await params;
  if (!getTreatment(slug) || !getLocation(location)) notFound();
  return <TreatmentLocationLandingPage slug={slug} locationSlug={location} locale="hi" />;
}
