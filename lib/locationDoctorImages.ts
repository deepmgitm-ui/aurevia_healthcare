const locationDoctorImages: Record<string, string> = {
  mumbai: "/aurevia/photos/doctor-patient.webp",
  "delhi-ncr": "/aurevia/photos/nci-doctor-patient.webp",
  bangalore: "/aurevia/photos/doctor-explains.webp",
  chandigarh: "/aurevia/photos/nci-doctor-patient.webp",
  ghaziabad: "/aurevia/photos/doctor-patient.webp",
  noida: "/aurevia/photos/doctor-explains.webp",
  pune: "/aurevia/photos/doctor-patient.webp",
  telangana: "/aurevia/photos/nci-doctor-patient.webp",
  ahmedabad: "/aurevia/photos/doctor-explains.webp",
};

export function getLocationDoctorImage(locationSlug: string) {
  return locationDoctorImages[locationSlug] ?? "/aurevia/photos/doctor-patient.webp";
}
