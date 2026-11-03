import { siteLocations } from "@/lib/siteLocations";

const stateNames: Record<string, { en: string; hi: string }> = {
  chandigarh: { en: "Chandigarh (UT)", hi: "चंडीगढ़ (केंद्रशासित प्रदेश)" },
  "delhi-ncr": { en: "Delhi NCR", hi: "दिल्ली NCR" },
  ghaziabad: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
  noida: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
  mumbai: { en: "Maharashtra", hi: "महाराष्ट्र" },
  bangalore: { en: "Karnataka", hi: "कर्नाटक" },
  pune: { en: "Maharashtra", hi: "महाराष्ट्र" },
  telangana: { en: "Telangana", hi: "तेलंगाना" },
  ahmedabad: { en: "Gujarat", hi: "गुजरात" },
};

export type SiteLocationDetails = {
  name: string;
  slug: string;
  state: { en: string; hi: string };
  fullLabel: { en: string; hi: string };
};

export const siteLocationDetails: SiteLocationDetails[] = siteLocations.map(({ name, slug }) => {
  const state = stateNames[slug];
  const hindiNames: Record<string, string> = {
    Chandigarh: "चंडीगढ़",
    "Delhi NCR": "दिल्ली NCR",
    Ghaziabad: "गाज़ियाबाद",
    Noida: "नोएडा",
    Mumbai: "मुंबई",
    Bengaluru: "बेंगलुरु",
    Pune: "पुणे",
    Telangana: "तेलंगाना",
    Ahmedabad: "अहमदाबाद",
  };
  const hindiCity = hindiNames[name];
  return {
    name,
    slug,
    state,
    fullLabel: {
      en: slug === "chandigarh" ? "Chandigarh (UT)" : slug === "delhi-ncr" || slug === "telangana" ? name : `${name}, ${state.en}`,
      hi: slug === "chandigarh" ? "चंडीगढ़ (केंद्रशासित प्रदेश)" : slug === "delhi-ncr" || slug === "telangana" ? hindiCity : `${hindiCity}, ${state.hi}`,
    },
  };
});

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function resolveSiteLocation(value?: string | null): SiteLocationDetails | undefined {
  if (!value) return undefined;
  const needle = normalize(value);
  return siteLocationDetails.find(({ name, slug }) => normalize(name) === needle || normalize(slug) === needle);
}
