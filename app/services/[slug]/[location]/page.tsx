// {
// type: file_content_update
// fileName: code thik/app/services/[slug]/[location]/page.tsx
// }

import LocationClient from "./LocationClient";

export async function generateStaticParams() {
  const services = [
    "lasik", "cataract", "sinus", "tonsillectomy", 
    "septoplasty", "ear-perforation", "rhinoplasty", 
    "gynecomastia", "kidney-stone", "dental"
  ];
  
  const locations = ["delhi", "gurgaon", "noida", "mumbai"];

  const params = [];
  for (const slug of services) {
    for (const loc of locations) {
      params.push({ slug: slug, location: loc });
    }
  }
  
  return params;
}

export default function Page() {
  return <LocationClient />;
}