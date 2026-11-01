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
  const region = getLocation(slug);
  if (!region) return { title: "क्षेत्र नहीं मिला" };
  return pageMetadata({
    title: `${region.name} में उपचार और देखभाल`,
    description: `${region.name} में उपचार की जानकारी और देखभाल समन्वय के विकल्प देखें। Aurevia की टीम से अगले कदम के बारे में बात करें।`,
    path: `/hi/locations/${slug}/`,
    locale: "hi",
    languages: { en: `/locations/${slug}/`, hi: `/hi/locations/${slug}/` },
  });
}

export default async function HindiLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  if (!getLocation(location)) notFound();
  return <LocationLandingPage locationSlug={location} locale="hi" />;
}
