import { campaignTreatments } from "@/lib/campaignLandingData";
import { siteLocations } from "@/lib/siteLocations";
import type { CampaignLocale } from "@/lib/campaignLandingData";

const departmentFor: Record<string, string> = {
  lasik: "ophthal", cataract: "ophthal",
  sinus: "ent", tonsillectomy: "ent", septoplasty: "ent", "ear-perforation": "ent",
  dental: "dental",
};

export function buildGpCampaignSlug(treatmentSlug: string, locationSlug: string, locale: CampaignLocale) {
  const department = departmentFor[treatmentSlug] ?? "surgery";
  const language = locale === "hi" ? "hindi" : "english";
  return `cms-${department}-${treatmentSlug}-${locationSlug}-metro-cost-${language}-facebook`;
}

export function getGpCampaignRoute(slug: string) {
  for (const treatment of campaignTreatments) {
    for (const location of siteLocations) {
      for (const locale of ["en", "hi"] as const) {
        if (buildGpCampaignSlug(treatment.slug, location.slug, locale) === slug) {
          return { treatment, location, locale };
        }
      }
    }
  }
  return undefined;
}

export const gpCampaignParams = campaignTreatments.flatMap((treatment) =>
  siteLocations.flatMap((location) => ([
    { campaign: buildGpCampaignSlug(treatment.slug, location.slug, "en") },
    { campaign: buildGpCampaignSlug(treatment.slug, location.slug, "hi") },
  ])),
);
