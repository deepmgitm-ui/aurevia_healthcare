import type { Metadata } from "next";
import CampaignThankYou from "@/components/CampaignThankYou";

export const metadata: Metadata = { title: "धन्यवाद | Aurevia Healthcare", robots: { index: false, follow: false } };

export default function HindiThankYouPage() {
  return <CampaignThankYou hindi />;
}
