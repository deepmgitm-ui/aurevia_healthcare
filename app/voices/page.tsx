import StaticHtmlPage from "../static-html-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Patient stories and experiences", description: "Read patient experiences about care coordination, specialist consultations and treatment journeys with Aurevia.", path: "/voices/" });

export default function VoicesPage() {
  return <StaticHtmlPage fileName="voices.html" />;
}
