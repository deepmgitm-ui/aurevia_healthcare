import StaticHtmlPage from "../static-html-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "How care coordination works", description: "See how Aurevia helps patients plan a consultation, connect with a specialist and coordinate the next steps in care.", path: "/how-it-works/" });

export default function HowItWorksPage() {
  return <StaticHtmlPage fileName="how-it-works.html" />;
}
