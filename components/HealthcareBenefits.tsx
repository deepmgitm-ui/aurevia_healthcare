import {
  BadgeCheck,
  Building2,
  CalendarCheck,
  Eye,
  Handshake,
  Headphones,
  HeartHandshake,
  IndianRupee,
  ShieldCheck,
  Stethoscope,
  Wallet,
  ClipboardCheck,
} from "lucide-react";

type BenefitsLocale = "en" | "hi";

const benefitIcons = [Building2, BadgeCheck, Eye, Stethoscope, Wallet, IndianRupee, HeartHandshake, ShieldCheck, CalendarCheck, Headphones, ClipboardCheck, Handshake];

const benefits = {
  en: [
    ["NABH-accredited hospitals", "Explore partner hospitals with NABH accreditation where available."],
    ["Quality-assured facilities", "Care options through facilities with established quality processes."],
    ["Advanced care infrastructure", "Modern eye-care facilities for eye treatments; specialist facilities for other care."],
    ["Experienced specialists", "Ophthalmologists for eye care and relevant specialists for other treatments."],
    ["No-cost EMI options", "May be available for eligible treatments through selected providers."],
    ["Transparent pricing", "Ask for an upfront estimate and cost details before you decide."],
    ["Dedicated patient support", "Personalised assistance to help coordinate your next steps."],
    ["Insurance acceptance", "Support for eligible providers and plans; coverage depends on insurer approval."],
    ["Easy appointment booking", "Help coordinating a consultation time with the relevant provider."],
    ["Post-surgery assistance", "Care coordination support to help you understand the next steps."],
    ["Free post-surgery follow-ups", "May be available through select providers; confirm what applies to your plan."],
    ["Trusted hospital partnerships", "Our partner network varies by city and treatment."],
  ],
  hi: [
    ["NABH-मान्यता प्राप्त अस्पताल", "जहाँ उपलब्ध हों, हमारे नेटवर्क के NABH-मान्यता प्राप्त अस्पतालों के विकल्प देखें।"],
    ["गुणवत्ता पर ध्यान देने वाली सुविधाएँ", "स्थापित गुणवत्ता प्रक्रियाओं वाली सुविधाओं के माध्यम से देखभाल के विकल्प।"],
    ["आधुनिक उपचार सुविधाएँ", "आँखों के उपचार के लिए आधुनिक नेत्र सुविधाएँ; अन्य उपचारों के लिए संबंधित विशेषज्ञ सुविधाएँ।"],
    ["अनुभवी विशेषज्ञ", "नेत्र देखभाल के लिए नेत्र विशेषज्ञ और अन्य उपचारों के लिए संबंधित विशेषज्ञ।"],
    ["बिना अतिरिक्त ब्याज वाली EMI", "चुने हुए प्रदाताओं के यहाँ पात्र उपचारों के लिए उपलब्ध हो सकती है।"],
    ["पारदर्शी कीमतें", "फ़ैसला लेने से पहले अनुमानित खर्च और लागत की जानकारी माँगें।"],
    ["मरीजों के लिए सहायता", "अगले कदमों के समन्वय में व्यक्तिगत मदद।"],
    ["बीमा सहायता", "पात्र प्रदाताओं और योजनाओं के लिए मदद; कवरेज बीमा कंपनी की मंज़ूरी पर निर्भर है।"],
    ["आसान अपॉइंटमेंट बुकिंग", "संबंधित प्रदाता के साथ परामर्श का समय तय करने में मदद।"],
    ["सर्जरी के बाद सहायता", "अगले कदम समझने के लिए देखभाल समन्वय में मदद।"],
    ["सर्जरी के बाद निःशुल्क फ़ॉलो-अप", "कुछ चुनिंदा प्रदाताओं के यहाँ मिल सकता है; अपनी योजना में लागू सुविधा की पुष्टि करें।"],
    ["विश्वसनीय अस्पताल साझेदारियाँ", "अस्पताल नेटवर्क शहर और उपचार के अनुसार अलग हो सकता है।"],
  ],
} as const;

export default function HealthcareBenefits({ locale = "en", campaign = false, eyeCare = false }: { locale?: BenefitsLocale; campaign?: boolean; eyeCare?: boolean }) {
  const copy = benefits[locale];
  const hindi = locale === "hi";

  return (
    <section className={`healthcare-benefits${campaign ? " healthcare-benefits-campaign" : ""}`} aria-labelledby={campaign ? "campaign-benefits-title" : "healthcare-benefits-title"} lang={hindi ? "hi" : "en"}>
      <div className="healthcare-benefits-inner">
        <div className="healthcare-benefits-heading">
          <span className="healthcare-benefits-mark"><Building2 size={21} strokeWidth={1.8} aria-hidden="true" /></span>
          <div>
            <p>{hindi ? "AUREVIA केयर" : "AUREVIA CARE"}</p>
            <h2 id={campaign ? "campaign-benefits-title" : "healthcare-benefits-title"}>{hindi ? "हमारी स्वास्थ्य सेवाओं के लाभ" : "Our healthcare benefits"}</h2>
          </div>
        </div>
        <div className="healthcare-benefits-grid">
          {copy.map(([title, description], index) => {
            const Icon = benefitIcons[index];
            return (
              <article className="healthcare-benefit-card" key={title}>
                <span className="healthcare-benefit-icon"><Icon size={22} strokeWidth={1.75} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{
                  index === 2
                    ? hindi
                      ? eyeCare ? "नेत्र देखभाल के लिए आधुनिक तकनीक और सुविधाएँ।" : "आपके उपचार के लिए संबंधित विशेषज्ञ सुविधाओं के विकल्प।"
                      : eyeCare ? "Modern technology and facilities for eye care." : "Options through facilities relevant to your treatment."
                    : index === 3
                      ? hindi
                        ? eyeCare ? "नेत्र देखभाल में अनुभवी नेत्र विशेषज्ञ।" : "आपके उपचार से जुड़े अनुभवी विशेषज्ञ।"
                        : eyeCare ? "Experienced ophthalmologists for eye care." : "Experienced specialists relevant to your treatment."
                      : description
                }</p>
              </article>
            );
          })}
        </div>
        <p className="healthcare-benefits-note">
          {hindi
            ? "अस्पताल, डॉक्टर, EMI, बीमा और फ़ॉलो-अप की उपलब्धता शहर, प्रदाता और पात्रता के अनुसार बदल सकती है। आगे बढ़ने से पहले लागू सुविधाओं और खर्च की पुष्टि करें।"
            : "Hospital, specialist, EMI, insurance and follow-up availability can vary by city, provider and eligibility. Please confirm applicable benefits and costs before proceeding."}
        </p>
      </div>
    </section>
  );
}
