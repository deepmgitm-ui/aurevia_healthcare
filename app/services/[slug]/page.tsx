// {
// type: file_content_update
// fileName: code thik/app/services/[slug]/page.tsx
// }

import ServiceClient from "./ServiceClient";
import { getTreatment } from "@/lib/locationLandingData";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return pageMetadata({ title: "Treatment guide", description: "Explore specialist-guided treatment information from Aurevia Healthcare.", path: `/services/${slug}/` });
  return pageMetadata({
    title: `${treatment.en.label} treatment guide`,
    description: treatment.en.summary,
    path: `/services/${slug}/`,
  });
}

export async function generateStaticParams() {
  const services = [
    "lasik", "cataract", "sinus", "tonsillectomy", 
    "septoplasty", "ear-perforation", "rhinoplasty", 
    "gynecomastia", "kidney-stone", "dental"
  ];

  return services.map((slug) => ({
    slug: slug,
  }));
}

export default function Page() {
  return <ServiceClient />;
}
