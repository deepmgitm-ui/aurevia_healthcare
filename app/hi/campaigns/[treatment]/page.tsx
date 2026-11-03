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
  if (!treatment) return { title: "उपचार अभियान | Aurevia Healthcare", robots: { index: false, follow: true } };
  const path = `/hi/campaigns/${slug}/`;
  const title = `${treatment.hi.label} | हमारी केयर टीम से बात करें`;
  return {
    title,
    description: treatment.hi.summary,
    alternates: { canonical: new URL(path, SITE_URL).toString(), languages: { "en-IN": `/campaigns/${slug}/`, "hi-IN": path, "x-default": `/campaigns/${slug}/` } },
    robots: { index: false, follow: true },
    openGraph: { type: "website", siteName: "Aurevia Healthcare", locale: "hi_IN", title, description: treatment.hi.summary, url: new URL(path, SITE_URL).toString(), images: [{ url: treatment.image, alt: treatment.hi.imageAlt }] },
  };
}

export default async function HindiCampaignPage({ params }: { params: Promise<{ treatment: string }> }) {
  const { treatment: slug } = await params;
  const treatment = getCampaignTreatment(slug);
  if (!treatment) notFound();
  return <CampaignLandingPage treatment={treatment} locale="hi" />;
}
