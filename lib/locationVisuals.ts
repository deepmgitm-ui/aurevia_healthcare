import type { LandingLocale } from "@/lib/locationLandingData";

type LocationVisual = {
  image: string;
  imageAlt: Record<LandingLocale, string>;
  caption: Record<LandingLocale, string>;
  palette: {
    ink: string;
    navy: string;
    teal: string;
    mint: string;
    soft: string;
    muted: string;
    regionWash: string;
    regionHighlight: string;
  };
};

export const locationVisuals: Record<string, LocationVisual> = {
  chandigarh: {
    image: "/location-scenes/chandigarh.svg",
    imageAlt: { en: "Modernist Chandigarh civic architecture along a garden avenue", hi: "बगीचे से घिरी सड़क के पास चंडीगढ़ की आधुनिक नागरिक वास्तुकला" },
    caption: { en: "Planned city · garden avenues", hi: "योजनाबद्ध शहर · हरे-भरे रास्ते" },
    palette: { ink: "#344657", navy: "#2B445F", teal: "#5A7897", mint: "#ECF1F5", soft: "#FAFCFD", muted: "#687786", regionWash: "#E4EDF4", regionHighlight: "#F8FAFC" },
  },
  "delhi-ncr": {
    image: "/location-scenes/delhi-ncr.svg",
    imageAlt: { en: "India Gate framed by New Delhi's tree-lined avenue", hi: "नई दिल्ली के पेड़ों वाले रास्ते के बीच इंडिया गेट" },
    caption: { en: "Capital region · sandstone avenues", hi: "राजधानी क्षेत्र · बलुआ पत्थर के रास्ते" },
    palette: { ink: "#493D42", navy: "#493243", teal: "#98523E", mint: "#F2EAE5", soft: "#FBF8F5", muted: "#716365", regionWash: "#F1E5DC", regionHighlight: "#FCF8F2" },
  },
  ghaziabad: {
    image: "/location-scenes/ghaziabad.svg",
    imageAlt: { en: "Green urban riverfront and skyline in Ghaziabad", hi: "गाज़ियाबाद का हरियाली भरा नदी किनारा और शहर का दृश्य" },
    caption: { en: "Urban greenway · river corridor", hi: "शहरी हरित पट्टी · नदी किनारा" },
    palette: { ink: "#374739", navy: "#3F5731", teal: "#6B873E", mint: "#F0F3E8", soft: "#FBFCF8", muted: "#67715D", regionWash: "#E7EDD9", regionHighlight: "#FAFBF4" },
  },
  noida: {
    image: "/location-scenes/noida.svg",
    imageAlt: { en: "Noida glass towers seen from an elevated expressway", hi: "एक्सप्रेसवे के पास नोएडा की आधुनिक काँच की इमारतें" },
    caption: { en: "Modern skyline · open green spaces", hi: "आधुनिक स्काईलाइन · खुले हरित क्षेत्र" },
    palette: { ink: "#224253", navy: "#1D3E62", teal: "#1A7288", mint: "#E6F2F4", soft: "#F6FAFB", muted: "#597078", regionWash: "#E1EEF3", regionHighlight: "#F8FBFC" },
  },
  mumbai: {
    image: "/location-scenes/mumbai.svg",
    imageAlt: { en: "Mumbai's Bandra-Worli Sea Link across the Arabian Sea at sunrise", hi: "सूर्योदय में अरब सागर पर मुंबई का बांद्रा-वर्ली सी लिंक" },
    caption: { en: "Coastal city · Arabian Sea", hi: "समुद्री शहर · अरब सागर" },
    palette: { ink: "#254453", navy: "#183D59", teal: "#A74550", mint: "#E8F1F1", soft: "#F7FAF9", muted: "#5C7075", regionWash: "#E5F0ED", regionHighlight: "#FEF7F2" },
  },
  bangalore: {
    image: "/location-scenes/bangalore.svg",
    imageAlt: { en: "Bengaluru's Vidhana Soudha framed by the city's garden greenery", hi: "बेंगलुरु की हरियाली के बीच विधान सौधा की भव्य इमारत" },
    caption: { en: "Garden city · modern skyline", hi: "गार्डन सिटी · आधुनिक स्काईलाइन" },
    palette: { ink: "#33483E", navy: "#244A3B", teal: "#397B60", mint: "#E8F2EB", soft: "#F7FAF6", muted: "#5F7267", regionWash: "#E1EFE5", regionHighlight: "#F8FBF4" },
  },
  pune: {
    image: "/location-scenes/pune.svg",
    imageAlt: { en: "The Shaniwar Wada gateway with Pune's green hills beyond", hi: "पुणे की हरी पहाड़ियों के सामने शनिवार वाड़ा का द्वार" },
    caption: { en: "Heritage gateway · Deccan hills", hi: "ऐतिहासिक धरोहर · दक्कन की पहाड़ियाँ" },
    palette: { ink: "#403F59", navy: "#3F3A75", teal: "#625F9B", mint: "#EFEEF7", soft: "#FAF9FC", muted: "#68677B", regionWash: "#ECEBF6", regionHighlight: "#FCFBFE" },
  },
  telangana: {
    image: "/location-scenes/telangana.svg",
    imageAlt: { en: "Hyderabad's Charminar with warm evening lights", hi: "शाम की रोशनी में हैदराबाद का चारमीनार" },
    caption: { en: "Hyderabad · Deccan heritage", hi: "हैदराबाद · दक्कन की विरासत" },
    palette: { ink: "#463F58", navy: "#393454", teal: "#76527E", mint: "#F0ECF3", soft: "#FBF9FC", muted: "#706777", regionWash: "#EFE9F1", regionHighlight: "#FCF9FC" },
  },
  ahmedabad: {
    image: "/location-scenes/ahmedabad.svg",
    imageAlt: { en: "Sabarmati riverfront and historic stone architecture in Ahmedabad", hi: "अहमदाबाद में साबरमती रिवरफ्रंट और ऐतिहासिक पत्थर की वास्तुकला" },
    caption: { en: "Sabarmati riverfront · sandstone heritage", hi: "साबरमती रिवरफ्रंट · पत्थर की विरासत" },
    palette: { ink: "#4D4337", navy: "#53402B", teal: "#985A2B", mint: "#F3EEE5", soft: "#FBF9F4", muted: "#73695B", regionWash: "#F1E7D8", regionHighlight: "#FCFAF4" },
  },
};

export function getLocationVisual(slug: string) {
  return locationVisuals[slug] ?? locationVisuals.chandigarh;
}
