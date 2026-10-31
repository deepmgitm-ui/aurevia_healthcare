const delhiTreatmentImages: Record<string, string> = {
  cataract: "/aurevia/treatments/cataract.webp",
  lasik: "/aurevia/treatments/lasik.webp",
  sinus: "/aurevia/treatments/sinus.webp",
  tonsillectomy: "/aurevia/treatments/tonsillectomy.webp",
  septoplasty: "/aurevia/treatments/rhinoplasty.webp",
  "ear-perforation": "/services/ear_02.PNG",
  rhinoplasty: "/services/rhinoplasty_02.PNG",
  gynecomastia: "/aurevia/treatments/gynecomastia.webp",
  "kidney-stone": "/aurevia/treatments/kidney-stones.webp",
  dental: "/services/dental_02.PNG",
};

export function getTreatmentLocationImage(slug: string, locationSlug: string, defaultImage: string) {
  if (locationSlug === "delhi-ncr") return delhiTreatmentImages[slug] ?? defaultImage;
  return defaultImage;
}
