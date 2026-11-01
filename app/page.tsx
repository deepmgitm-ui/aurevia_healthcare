import StaticHtmlPage from "./static-html-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Healthcare guidance for your next step",
  description: "Explore treatment pathways and get help coordinating specialist consultations and hospital care across India.",
  path: "/",
});

export default function Home() {
  return <StaticHtmlPage fileName="index.html" />;
}
