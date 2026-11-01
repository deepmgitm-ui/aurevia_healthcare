import StaticHtmlPage from "../static-html-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About Aurevia Healthcare", description: "Learn how Aurevia helps patients understand care options and coordinate with specialists and hospitals across India.", path: "/about/" });

export default function AboutPage() {
  return <StaticHtmlPage fileName="about.html" />;
}
