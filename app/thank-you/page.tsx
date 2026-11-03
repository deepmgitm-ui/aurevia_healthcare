import type { Metadata } from "next";
import CampaignThankYou from "@/components/CampaignThankYou";

export const metadata: Metadata = { title: "Thank you | Aurevia Healthcare", robots: { index: false, follow: false } };

export default function ThankYouPage() {
  return <CampaignThankYou />;
}
