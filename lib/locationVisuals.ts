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
    image: "/location-photos/chandigarh.jpg",
    imageAlt: { en: "Modernist Chandigarh civic architecture along a garden avenue", hi: "बगीचे से घिरी सड़क के पास चंडीगढ़ की आधुनिक नागरिक वास्तुकला" },
    caption: { en: "Planned city · garden avenues", hi: "योजनाबद्ध शहर · हरे-भरे रास्ते" },
    palette: { ink: "#263E55", navy: "#244B70", teal: "#3E83B9", mint: "#E6F1FA", soft: "#F7FAFD", muted: "#566E83", regionWash: "#DDEAF5", regionHighlight: "#F7F4EC" },
  },
  "delhi-ncr": {
    image: "/location-photos/delhi-ncr.jpg",
    imageAlt: { en: "India Gate framed by New Delhi's tree-lined avenue", hi: "नई दिल्ली के पेड़ों वाले रास्ते के बीच इंडिया गेट" },
    caption: { en: "Capital region · sandstone avenues", hi: "राजधानी क्षेत्र · बलुआ पत्थर के रास्ते" },
    palette: { ink: "#442F36", navy: "#4A2D3B", teal: "#B85439", mint: "#F6E4D9", soft: "#FCF7F1", muted: "#705A59", regionWash: "#F3DCCB", regionHighlight: "#FFF6E8" },
  },
  ghaziabad: {
    image: "/location-photos/ghaziabad.jpg",
    imageAlt: { en: "Green urban riverfront and skyline in Ghaziabad", hi: "गाज़ियाबाद का हरियाली भरा नदी किनारा और शहर का दृश्य" },
    caption: { en: "Urban greenway · river corridor", hi: "शहरी हरित पट्टी · नदी किनारा" },
    palette: { ink: "#344632", navy: "#34522E", teal: "#6E923D", mint: "#E9F0DD", soft: "#FAFCF5", muted: "#5D6B53", regionWash: "#DEEACD", regionHighlight: "#F6F2E5" },
  },
  noida: {
    image: "/location-photos/noida.jpg",
    imageAlt: { en: "Noida glass towers seen from an elevated expressway", hi: "एक्सप्रेसवे के पास नोएडा की आधुनिक काँच की इमारतें" },
    caption: { en: "Modern skyline · open green spaces", hi: "आधुनिक स्काईलाइन · खुले हरित क्षेत्र" },
    palette: { ink: "#203F50", navy: "#173B58", teal: "#147F98", mint: "#DDEFF2", soft: "#F4FAFB", muted: "#536D77", regionWash: "#D2E9ED", regionHighlight: "#F7F2E9" },
  },
  mumbai: {
    image: "/location-photos/mumbai.jpg",
    imageAlt: { en: "Mumbai's Bandra-Worli Sea Link across the Arabian Sea at sunrise", hi: "सूर्योदय में अरब सागर पर मुंबई का बांद्रा-वर्ली सी लिंक" },
    caption: { en: "Coastal city · Arabian Sea", hi: "समुद्री शहर · अरब सागर" },
    palette: { ink: "#243E4B", navy: "#173A52", teal: "#C34D58", mint: "#DDF0EE", soft: "#F8FAF6", muted: "#566A70", regionWash: "#F5E0D8", regionHighlight: "#FFF0E4" },
  },
  bangalore: {
    image: "/location-photos/bangalore.jpg",
    imageAlt: { en: "Bengaluru's Vidhana Soudha framed by the city's garden greenery", hi: "बेंगलुरु की हरियाली के बीच विधान सौधा की भव्य इमारत" },
    caption: { en: "Garden city · modern skyline", hi: "गार्डन सिटी · आधुनिक स्काईलाइन" },
    palette: { ink: "#2E493B", navy: "#234C3B", teal: "#32865D", mint: "#E0F0E4", soft: "#F6FAF5", muted: "#587064", regionWash: "#D7EBDD", regionHighlight: "#F8F1E7" },
  },
  pune: {
    image: "/location-photos/pune.jpg",
    imageAlt: { en: "The Shaniwar Wada gateway with Pune's green hills beyond", hi: "पुणे की हरी पहाड़ियों के सामने शनिवार वाड़ा का द्वार" },
    caption: { en: "Heritage gateway · Deccan hills", hi: "ऐतिहासिक धरोहर · दक्कन की पहाड़ियाँ" },
    palette: { ink: "#3E3C5D", navy: "#403B78", teal: "#7166B3", mint: "#E9E7F6", soft: "#FAF9FD", muted: "#625F78", regionWash: "#DEDDF1", regionHighlight: "#FBF3E9" },
  },
  telangana: {
    image: "/location-photos/telangana.jpg",
    imageAlt: { en: "Hyderabad's Charminar with warm evening lights", hi: "शाम की रोशनी में हैदराबाद का चारमीनार" },
    caption: { en: "Hyderabad · Deccan heritage", hi: "हैदराबाद · दक्कन की विरासत" },
    palette: { ink: "#43354E", navy: "#463252", teal: "#985D91", mint: "#F0E4F0", soft: "#FCF8FC", muted: "#6B5C70", regionWash: "#EBD8E9", regionHighlight: "#FFF2E8" },
  },
  ahmedabad: {
    image: "/location-photos/ahmedabad.jpg",
    imageAlt: { en: "Sabarmati riverfront and historic stone architecture in Ahmedabad", hi: "अहमदाबाद में साबरमती रिवरफ्रंट और ऐतिहासिक पत्थर की वास्तुकला" },
    caption: { en: "Sabarmati riverfront · sandstone heritage", hi: "साबरमती रिवरफ्रंट · पत्थर की विरासत" },
    palette: { ink: "#4C3B27", navy: "#5C4023", teal: "#B97825", mint: "#F4EBD7", soft: "#FCF9F1", muted: "#71614A", regionWash: "#F0E1C3", regionHighlight: "#FFF5E1" },
  },
};

export function getLocationVisual(slug: string) {
  return locationVisuals[slug] ?? locationVisuals.chandigarh;
}
