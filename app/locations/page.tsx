import type { Metadata } from "next";
import LocationDirectoryLandingPage from "@/components/LocationDirectoryLandingPage";

export const metadata: Metadata = {
  title: "Choose your region | Aurevia Healthcare",
  description: "Choose an Aurevia Healthcare region to explore available treatments.",
  alternates: { languages: { en: "/locations", hi: "/hi/locations" } },
};

export default function LocationsPage() {
  return <LocationDirectoryLandingPage locale="en" />;
}
