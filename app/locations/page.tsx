import LocationDirectoryLandingPage from "@/components/LocationDirectoryLandingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Find care in your region", description: "Choose a city or region to explore local treatment information and care coordination support from Aurevia.", path: "/locations/", languages: { en: "/locations/", hi: "/hi/locations/" } });

export default function LocationsPage() {
  return <LocationDirectoryLandingPage locale="en" />;
}
