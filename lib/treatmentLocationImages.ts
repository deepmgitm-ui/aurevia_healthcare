const delhiTreatmentImages: Record<string, string> = {
  cataract: "/treatment-location-photos/delhi-ncr/cataract.webp",
  lasik: "/treatment-location-photos/delhi-ncr/lasik.webp",
  sinus: "/treatment-location-photos/delhi-ncr/sinus.webp",
  tonsillectomy: "/treatment-location-photos/delhi-ncr/tonsillectomy.webp",
  septoplasty: "/treatment-location-photos/delhi-ncr/septoplasty.webp",
  "ear-perforation": "/treatment-location-photos/delhi-ncr/ear-perforation.webp",
  rhinoplasty: "/treatment-location-photos/delhi-ncr/rhinoplasty.webp",
  gynecomastia: "/treatment-location-photos/delhi-ncr/gynecomastia.webp",
  "kidney-stone": "/treatment-location-photos/delhi-ncr/kidney-stone.webp",
  dental: "/treatment-location-photos/delhi-ncr/dental.webp",
};

export function getTreatmentLocationImage(slug: string, locationSlug: string, defaultImage: string) {
  if (locationSlug === "delhi-ncr") return delhiTreatmentImages[slug] ?? defaultImage;
  return defaultImage;
}
