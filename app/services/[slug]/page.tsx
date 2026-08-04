// {
// type: file_content_update
// fileName: code thik/app/services/[slug]/page.tsx
// }

import ServiceClient from "./ServiceClient";

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