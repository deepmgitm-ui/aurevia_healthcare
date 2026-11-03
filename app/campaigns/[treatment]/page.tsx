import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampaignLandingPage from "@/components/CampaignLandingPage";
import { campaignTreatments, getCampaignTreatment } from "@/lib/campaignLandingData";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return campaignTreatments.map(({ slug }) => ({ treatment: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ treatment: string }> }): Promise<Metadata> {
  const { treatment: slug } = await params;
  const treatment = getCampaignTreatment(slug);
  if (!treatment) return { title: "Treatment campaign | Aurevia Healthcare", robots: { index: false, follow: true } };
  const path = `/campaigns/${slug}/`;
  const title = `${treatment.en.label} | Talk to our care team`;
  return {
    title,
    description: treatment.en.summary,
    alternates: { canonical: new URL(path, SITE_URL).toString(), languages: { "en-IN": path, "hi-IN": `/hi${path}`, "x-default": path } },
    robots: { index: false, follow: true },
    openGraph: { type: "website", siteName: "Aurevia Healthcare", title, description: treatment.en.summary, url: new URL(path, SITE_URL).toString(), images: [{ url: treatment.image, alt: treatment.en.imageAlt }] },
  };
}

export default async function CampaignPage({ params }: { params: Promise<{ treatment: string }> }) {
  const { treatment: slug } = await params;
  const treatment = getCampaignTreatment(slug);
  if (!treatment) notFound();
  return <CampaignLandingPage treatment={treatment} locale="en" />;
}
