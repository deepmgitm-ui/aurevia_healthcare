import LocationDirectoryLandingPage from "@/components/LocationDirectoryLandingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "अपने क्षेत्र में इलाज की जानकारी देखें", description: "Aurevia के अलग-अलग शहरों में उपलब्ध उपचार और देखभाल समन्वय की जानकारी देखें।", path: "/hi/locations/", locale: "hi", languages: { en: "/locations/", hi: "/hi/locations/" } });

export default function HindiLocationsPage() {
  return <LocationDirectoryLandingPage locale="hi" />;
}
