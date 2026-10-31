import type { Metadata } from "next";
import LocationDirectoryLandingPage from "@/components/LocationDirectoryLandingPage";

export const metadata: Metadata = {
  title: "हमारे क्षेत्र | Aurevia Healthcare",
  description: "Aurevia Healthcare के क्षेत्रों में उपलब्ध उपचार देखें।",
  alternates: { languages: { en: "/locations", hi: "/hi/locations" } },
};

export default function HindiLocationsPage() {
  return <LocationDirectoryLandingPage locale="hi" />;
}
