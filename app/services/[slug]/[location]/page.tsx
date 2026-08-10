// {
// type: file_content_update
// fileName: code thik/app/services/[slug]/[location]/page.tsx
// }

import LocationClient from "./LocationClient";
import { siteLocationSlugs } from "@/lib/siteLocations";

export async function generateStaticParams() {
  const services = [
    "lasik", "cataract", "sinus", "tonsillectomy", 
    "septoplasty", "ear-perforation", "rhinoplasty", 
    "gynecomastia", "kidney-stone", "dental"
  ];
  
  const params = [];
  for (const slug of services) {
    for (const loc of siteLocationSlugs) {
      params.push({ slug: slug, location: loc });
    }
  }
  
  return params;
}

export default function Page() {
  return <LocationClient />;
}
