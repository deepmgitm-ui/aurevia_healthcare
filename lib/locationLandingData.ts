import { siteLocations } from "@/lib/siteLocations";

export type LandingLocale = "en" | "hi";

type Copy = {
  label: string;
  category: string;
  summary: string;
  intro: string;
};

export type TreatmentLanding = {
  slug: string;
  image: string;
  en: Copy;
  hi: Copy;
};

export const treatmentLandings: TreatmentLanding[] = [
  {
    slug: "cataract",
    image: "/treatments/cataract-bg.webp",
    en: { label: "Cataract care", category: "Eye care", summary: "Explore assessment and care options for cataracts.", intro: "A cataract is clouding of the eye’s natural lens. A specialist can assess how it affects your vision and discuss whether monitoring or treatment may suit you." },
    hi: { label: "मोतियाबिंद का उपचार", category: "नेत्र देखभाल", summary: "मोतियाबिंद की जाँच और देखभाल के विकल्प जानें।", intro: "मोतियाबिंद में आँख का प्राकृतिक लेंस धुंधला हो जाता है। विशेषज्ञ आपकी दृष्टि की जाँच करके देखभाल और उपचार के उपयुक्त विकल्प समझा सकते हैं।" },
  },
  {
    slug: "lasik",
    image: "/treatments/lasik-bg.webp",
    en: { label: "LASIK", category: "Eye care", summary: "Learn about laser vision correction and an eligibility review.", intro: "LASIK is a laser vision correction procedure. An eye specialist can review your prescription, eye health and goals to discuss whether it may be an option for you." },
    hi: { label: "लेसिक (LASIK)", category: "नेत्र देखभाल", summary: "लेज़र दृष्टि सुधार और उपयुक्तता की जाँच के बारे में जानें।", intro: "LASIK लेज़र द्वारा दृष्टि सुधार की प्रक्रिया है। नेत्र विशेषज्ञ आपकी नज़र, आँखों की सेहत और ज़रूरतों की जाँच करके बता सकते हैं कि यह विकल्प आपके लिए उपयुक्त है या नहीं।" },
  },
  {
    slug: "sinus",
    image: "/treatments/sinus-bg.webp",
    en: { label: "Sinus care", category: "ENT", summary: "Discuss ongoing sinus concerns with an ENT specialist.", intro: "Sinus symptoms can have different causes. An ENT specialist can review your symptoms and previous care before discussing suitable next steps." },
    hi: { label: "साइनस की देखभाल", category: "ईएनटी", summary: "साइनस की लगातार समस्या पर ईएनटी विशेषज्ञ से बात करें।", intro: "साइनस से जुड़े लक्षणों के अलग-अलग कारण हो सकते हैं। ईएनटी विशेषज्ञ आपके लक्षणों और पहले हुए उपचार की जानकारी लेकर आगे के विकल्प समझा सकते हैं।" },
  },
  {
    slug: "tonsillectomy",
    image: "/treatments/tonsil-bg.jpg",
    en: { label: "Tonsillectomy", category: "ENT", summary: "Understand when tonsil surgery may be discussed.", intro: "A tonsillectomy is an operation to remove the tonsils. An ENT specialist can assess recurring throat concerns and explain the available care options." },
    hi: { label: "टॉन्सिल सर्जरी", category: "ईएनटी", summary: "जानें कि टॉन्सिल सर्जरी पर कब चर्चा की जा सकती है।", intro: "टॉन्सिलेक्टॉमी में टॉन्सिल हटाने की सर्जरी की जाती है। ईएनटी विशेषज्ञ बार-बार होने वाली गले की समस्या की जाँच करके उपलब्ध विकल्प समझा सकते हैं।" },
  },
  {
    slug: "septoplasty",
    image: "/treatments/septoplasty-bg.jpg",
    en: { label: "Septoplasty", category: "ENT", summary: "Explore assessment for a deviated nasal septum.", intro: "Septoplasty is surgery to correct a deviated nasal septum. An ENT specialist can assess breathing concerns and discuss whether further evaluation is needed." },
    hi: { label: "सेप्टोप्लास्टी", category: "ईएनटी", summary: "नाक के पर्दे के टेढ़ेपन की जाँच के बारे में जानें।", intro: "सेप्टोप्लास्टी नाक के टेढ़े पर्दे को ठीक करने की सर्जरी है। ईएनटी विशेषज्ञ साँस लेने की समस्या की जाँच करके आगे की ज़रूरत समझा सकते हैं।" },
  },
  {
    slug: "ear-perforation",
    image: "/treatments/ear-bg.jpg",
    en: { label: "Eardrum repair", category: "ENT", summary: "Get guidance for a perforated eardrum.", intro: "A perforated eardrum may need monitoring or specialist care depending on the cause and symptoms. An ENT specialist can review your situation and explain possible next steps." },
    hi: { label: "कान के पर्दे की मरम्मत", category: "ईएनटी", summary: "कान के पर्दे में छेद होने पर मार्गदर्शन पाएँ।", intro: "कान के पर्दे में छेद होने पर कारण और लक्षणों के अनुसार निगरानी या विशेषज्ञ देखभाल की ज़रूरत हो सकती है। ईएनटी विशेषज्ञ स्थिति की जाँच करके अगले कदम समझा सकते हैं।" },
  },
  {
    slug: "rhinoplasty",
    image: "/treatments/rhinoplasty-bg.jpg",
    en: { label: "Rhinoplasty", category: "Aesthetic surgery", summary: "Discuss functional or appearance-related nose surgery.", intro: "Rhinoplasty changes the shape of the nose and may also address some functional concerns. A qualified specialist can discuss your goals, suitability and options." },
    hi: { label: "राइनोप्लास्टी", category: "एस्थेटिक सर्जरी", summary: "नाक की बनावट या उससे जुड़ी समस्या पर चर्चा करें।", intro: "राइनोप्लास्टी में नाक की बनावट में बदलाव किया जाता है और कुछ मामलों में कार्य से जुड़ी समस्या पर भी विचार होता है। विशेषज्ञ आपकी ज़रूरत और विकल्पों पर चर्चा कर सकते हैं।" },
  },
  {
    slug: "gynecomastia",
    image: "/treatments/gynecomastia-bg.jpg",
    en: { label: "Gynecomastia care", category: "Aesthetic surgery", summary: "Explore an assessment for enlarged male breast tissue.", intro: "Gynecomastia can have different causes. A specialist can review your health history and discuss whether further assessment or treatment may be appropriate." },
    hi: { label: "गाइनेकोमैस्टिया का उपचार", category: "एस्थेटिक सर्जरी", summary: "पुरुषों में स्तन ऊतक बढ़ने की जाँच के विकल्प जानें।", intro: "गाइनेकोमैस्टिया के कई कारण हो सकते हैं। विशेषज्ञ आपके स्वास्थ्य इतिहास की समीक्षा करके आगे की जाँच या उपचार के विकल्प समझा सकते हैं।" },
  },
  {
    slug: "kidney-stone",
    image: "/treatments/kidney-bg.jpg",
    en: { label: "Kidney stone care", category: "Urology", summary: "Discuss kidney stone evaluation and care options.", intro: "Kidney stone care depends on factors such as symptoms, stone size and location. A urology specialist can review your reports and explain suitable options." },
    hi: { label: "किडनी स्टोन का उपचार", category: "यूरोलॉजी", summary: "किडनी स्टोन की जाँच और देखभाल के विकल्प समझें।", intro: "किडनी स्टोन की देखभाल लक्षणों, पथरी के आकार और स्थान जैसी बातों पर निर्भर करती है। यूरोलॉजी विशेषज्ञ आपकी रिपोर्ट देखकर उपयुक्त विकल्प समझा सकते हैं।" },
  },
  {
    slug: "dental",
    image: "/treatments/dental-bg.jpg",
    en: { label: "Dental care", category: "Dental", summary: "Find guidance for common dental treatment needs.", intro: "Dental care can include evaluation and treatment planning for concerns such as damaged or missing teeth. A dental professional can discuss the options relevant to you." },
    hi: { label: "दंत चिकित्सा", category: "डेंटल", summary: "दाँतों के सामान्य उपचार के लिए मार्गदर्शन पाएँ।", intro: "दंत चिकित्सा में क्षतिग्रस्त या टूटे दाँतों जैसी समस्याओं की जाँच और उपचार योजना शामिल हो सकती है। दंत विशेषज्ञ आपके लिए उपयुक्त विकल्प बता सकते हैं।" },
  },
];

const interfaceCopy = {
  en: {
    home: "Home", locations: "Locations", treatments: "Treatments", consultation: "Talk to a care coordinator",
    chooseTreatment: "Care options in", chooseTreatmentDescription: "Choose a treatment to learn about the care pathway and speak with our team.",
    treatmentIn: "care in", talkToTeam: "Speak with our care team", call: "Call us", whatsapp: "WhatsApp",
    overview: "About this treatment", nextSteps: "What happens next", nextStepsBody: "Share your concern with our team. We can help arrange a specialist discussion and explain the next steps for your situation.",
    careNote: "Treatment choices depend on an individual specialist assessment. This page provides general information, not a diagnosis or treatment recommendation.",
    language: "हिन्दी", otherLocale: "hi", browse: "Browse all regions", availableTreatments: "Treatments",
  },
  hi: {
    home: "होम", locations: "हमारे क्षेत्र", treatments: "उपचार", consultation: "केयर टीम से बात करें",
    chooseTreatment: "यहाँ उपलब्ध उपचार —", chooseTreatmentDescription: "उपचार की जानकारी और हमारी टीम से बात करने के लिए कोई विकल्प चुनें।",
    treatmentIn: "—", talkToTeam: "हमारी केयर टीम से बात करें", call: "कॉल करें", whatsapp: "व्हाट्सऐप",
    overview: "उपचार के बारे में", nextSteps: "आगे क्या होगा", nextStepsBody: "अपनी समस्या हमारी टीम को बताएँ। हम विशेषज्ञ से बातचीत तय करने और आपकी स्थिति के अनुसार अगले कदम समझने में मदद करेंगे।",
    careNote: "उपचार का चुनाव विशेषज्ञ की व्यक्तिगत जाँच के बाद होता है। यह सामान्य जानकारी है, निदान या उपचार की सलाह नहीं।",
    language: "English", otherLocale: "en", browse: "सभी क्षेत्रों को देखें", availableTreatments: "उपचार",
  },
} as const;

export function getLandingCopy(locale: LandingLocale) {
  return interfaceCopy[locale];
}

export function getTreatment(slug: string) {
  return treatmentLandings.find((treatment) => treatment.slug === slug);
}

export function getLocation(slug: string) {
  return siteLocations.find((location) => location.slug === slug);
}

export function getTreatmentHref(slug: string, location: string, locale: LandingLocale) {
  const base = `/services/${slug}/${location}`;
  return locale === "hi" ? `/hi${base}` : base;
}

export function getLocationHref(location: string, locale: LandingLocale) {
  const base = `/locations/${location}`;
  return locale === "hi" ? `/hi${base}` : base;
}
