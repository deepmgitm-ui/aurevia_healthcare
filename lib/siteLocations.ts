export const siteLocations = [
  { name: "Chandigarh", slug: "chandigarh" },
  { name: "Delhi NCR", slug: "delhi-ncr" },
  { name: "Ghaziabad", slug: "ghaziabad" },
  { name: "Noida", slug: "noida" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Pune", slug: "pune" },
  { name: "Telangana", slug: "telangana" },
  { name: "Ahmedabad", slug: "ahmedabad" },
] as const;

export const siteLocationNames = siteLocations.map(({ name }) => name);
export const siteLocationSlugs = siteLocations.map(({ slug }) => slug);

