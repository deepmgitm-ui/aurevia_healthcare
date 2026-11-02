const locationDoctorImages: Record<string, string> = {
  mumbai: "/aurevia/photos/doctor-patient.jpg",
  "delhi-ncr": "/aurevia/photos/nci-doctor-patient.jpg",
  bangalore: "/aurevia/photos/doctor-explains.jpg",
  chandigarh: "/aurevia/photos/nci-doctor-patient.jpg",
  ghaziabad: "/aurevia/photos/doctor-patient.jpg",
  noida: "/aurevia/photos/doctor-explains.jpg",
  pune: "/aurevia/photos/doctor-patient.jpg",
  telangana: "/aurevia/photos/nci-doctor-patient.jpg",
  ahmedabad: "/aurevia/photos/doctor-explains.jpg",
};

export function getLocationDoctorImage(locationSlug: string) {
  return locationDoctorImages[locationSlug] ?? "/aurevia/photos/doctor-patient.jpg";
}
