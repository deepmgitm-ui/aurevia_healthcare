import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationLandingPage from "@/components/LocationLandingPage";
import { getLocation } from "@/lib/locationLandingData";
import { siteLocationSlugs } from "@/lib/siteLocations";

export function generateStaticParams() {
  return siteLocationSlugs.map((location) => ({ location }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location: slug } = await params;
  const region = getLocation(slug);
  if (!region) return { title: "क्षेत्र नहीं मिला | Aurevia Healthcare" };
  return {
    title: `${region.name} में उपचार | Aurevia Healthcare`,
    description: `${region.name} में उपलब्ध उपचार और देखभाल के विकल्प देखें।`,
    alternates: { languages: { en: `/locations/${slug}`, hi: `/hi/locations/${slug}` } },
  };
}

export default async function HindiLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  if (!getLocation(location)) notFound();
  return <LocationLandingPage locationSlug={location} locale="hi" />;
}
