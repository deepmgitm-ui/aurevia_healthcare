import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationLandingPage from "@/components/LocationLandingPage";
import { getLocation } from "@/lib/locationLandingData";
import { siteLocationSlugs } from "@/lib/siteLocations";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return siteLocationSlugs.map((location) => ({ location }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) return { title: "Region not found" };
  return pageMetadata({
    title: `Treatments and care in ${location.name}`,
    description: `Explore treatment information and care coordination support in ${location.name}. Speak with Aurevia about your next step.`,
    path: `/locations/${slug}/`,
    languages: { en: `/locations/${slug}/`, hi: `/hi/locations/${slug}/` },
  });
}

export default async function Page({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  if (!getLocation(location)) notFound();
  return <LocationLandingPage locationSlug={location} locale="en" />;
}
