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
  const location = getLocation(slug);
  if (!location) return { title: "Region not found | Aurevia Healthcare" };
  return {
    title: `Treatments in ${location.name} | Aurevia Healthcare`,
    description: `Explore treatments and care coordination options in ${location.name} with Aurevia Healthcare.`,
    alternates: { languages: { en: `/locations/${slug}`, hi: `/hi/locations/${slug}` } },
  };
}

export default async function Page({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  if (!getLocation(location)) notFound();
  return <LocationLandingPage locationSlug={location} locale="en" />;
}
