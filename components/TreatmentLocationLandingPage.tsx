import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Check, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  getLandingCopy,
  getLocation,
  getLocationHref,
  getTreatment,
  getTreatmentHref,
  type LandingLocale,
} from "@/lib/locationLandingData";
import { getLocationVisual } from "@/lib/locationVisuals";
import { getTreatmentVisual } from "@/lib/treatmentVisuals";
import { getTreatmentLocationImage } from "@/lib/treatmentLocationImages";

export default function TreatmentLocationLandingPage({ slug, locationSlug, locale }: { slug: string; locationSlug: string; locale: LandingLocale }) {
  const treatment = getTreatment(slug);
  const location = getLocation(locationSlug);
  if (!treatment || !location) return null;
  const copy = treatment[locale];
  const labels = getLandingCopy(locale);
  const oppositeLocale = locale === "en" ? "hi" : "en";
  const locationVisual = getLocationVisual(locationSlug);
  const treatmentVisual = getTreatmentVisual(slug);
  const heroImage = getTreatmentLocationImage(slug, locationSlug, treatment.image);
  const themeStyle = {
    "--care-ink": locationVisual.palette.ink,
    "--care-navy": locationVisual.palette.navy,
    "--care-teal": locationVisual.palette.teal,
    "--care-mint": locationVisual.palette.mint,
    "--care-soft": locationVisual.palette.soft,
    "--care-muted": locationVisual.palette.muted,
    "--care-region-wash": locationVisual.palette.regionWash,
    "--care-region-highlight": locationVisual.palette.regionHighlight,
    "--care-treatment-accent": treatmentVisual.accent,
    "--care-treatment-wash": treatmentVisual.wash,
    "--care-treatment-glow": treatmentVisual.glow,
    "--care-location-wash": locationVisual.palette.regionWash,
    "--care-location-accent": locationVisual.palette.teal,
    "--care-location-navy": locationVisual.palette.navy,
  } as CSSProperties;
  const process = locale === "hi"
    ? ["अपनी ज़रूरत साझा करें", "विशेषज्ञ से बात करें", "अगले कदम समझें"]
    : ["Share your concern", "Speak with a specialist", "Understand next steps"];
  const discussionCards = locale === "hi"
    ? [
        { number: "01", title: "आपकी परेशानी", body: `${copy.label} से जुड़ी परेशानी कब से है, रोज़मर्रा पर उसका क्या असर है और आप किस बात को लेकर सबसे ज़्यादा चिंतित हैं—यह साझा करें।` },
        { number: "02", title: "आपकी सेहत का इतिहास", body: "पहले की जाँच, रिपोर्ट, चल रही दवाएँ और कोई पुराना उपचार साथ लाएँ। इससे विशेषज्ञ आपकी पूरी स्थिति समझ पाएँगे।" },
        { number: "03", title: "आपके विकल्प और सवाल", body: "जाँच, उपलब्ध देखभाल के विकल्प, संभावित अगले कदम और follow-up के बारे में खुलकर पूछें। हर योजना व्यक्ति के अनुसार तय होती है।" },
      ]
    : [
        { number: "01", title: "What you are experiencing", body: `Share when your ${copy.label.toLowerCase()} concern began, how it affects daily life and what you would most like help understanding.` },
        { number: "02", title: "Your health history", body: "Bring previous reports, current medicines and details of any care you have already received so the specialist can understand the full picture." },
        { number: "03", title: "Options and questions", body: "Ask about assessment, available care options, possible next steps and follow-up. A plan is made around each person's situation." },
      ];
  const journey = locale === "hi"
    ? ["टीम से संपर्क", "ज़रूरतों पर बातचीत", "विशेषज्ञ की राय", "आपकी स्थिति के अनुसार अगला कदम"]
    : ["Connect with our team", "Talk through your needs", "Hear a specialist’s view", "Choose a next step for your situation"];
  const faqs = locale === "hi"
    ? [
        { question: `${copy.label} का कौन-सा विकल्प मेरे लिए सही है?`, answer: "यह आपकी जाँच, स्वास्थ्य इतिहास और विशेषज्ञ की सलाह पर निर्भर करता है। बातचीत के बाद ही आपके लिए विकल्प स्पष्ट होंगे।" },
        { question: "पहली बातचीत में क्या बताना चाहिए?", answer: "अपने लक्षण या चिंता, पहले हुई जाँच, चल रही दवाओं और आपके मन में मौजूद सवालों के बारे में बताएँ। अगर रिपोर्ट हैं तो उन्हें साथ रखें।" },
        { question: "क्या वेबसाइट की जानकारी व्यक्तिगत सलाह है?", answer: "नहीं। यह पेज सामान्य जानकारी देता है। निदान और उपचार का निर्णय योग्य विशेषज्ञ की व्यक्तिगत जाँच के बाद होना चाहिए।" },
      ]
    : [
        { question: `Which ${copy.label.toLowerCase()} option is right for me?`, answer: "That depends on your assessment, health history and a specialist’s advice. Your options can be discussed after reviewing your individual situation." },
        { question: "What should I share in the first conversation?", answer: "Tell us about your concern, previous assessments, current medicines and questions. Bring any reports you already have." },
        { question: "Is the information on this page personal medical advice?", answer: "No. This page offers general information. Diagnosis and treatment decisions should follow an individual assessment by a qualified specialist." },
      ];

  return (
    <main className={`care-landing care-treatment-detail care-location-${locationSlug} ${locale === "hi" ? "care-landing-hi" : ""}`} lang={locale === "hi" ? "hi" : "en"} style={themeStyle}>
      <section className="care-detail-hero">
        <div className="care-detail-hero-copy">
          <nav className="care-breadcrumb" aria-label={locale === "hi" ? "ब्रेडक्रम्ब" : "Breadcrumb"}>
            <Link href="/">{labels.home}</Link><span>/</span><Link href="/locations">{labels.locations}</Link><span>/</span>
            <Link href={getLocationHref(locationSlug, locale)}>{location.name}</Link><span>/</span><span>{copy.label}</span>
          </nav>
          <div className="care-detail-eyebrow"><MapPin size={15} /> {location.name} · {copy.category}</div>
          <h1>{locale === "hi" ? `${location.name} में ${copy.label}` : `${copy.label} in ${location.name}`}</h1>
          <p>{copy.intro}</p>
          <div className="care-detail-actions">
            <a className="care-button care-button-primary" href="tel:+919990959440"><Phone size={17} />{labels.talkToTeam}</a>
            <a className="care-button care-button-secondary" href="https://wa.me/919990959440" target="_blank" rel="noreferrer"><MessageCircle size={17} />{labels.whatsapp}</a>
          </div>
          <div className="care-detail-trust-note"><Check size={16} />{locale === "hi" ? "आपकी स्थिति के अनुसार मार्गदर्शन" : "Guidance shaped around your situation"}</div>
        </div>
        <div className="care-detail-image-wrap">
          <Image src={heroImage} alt={locale === "hi" ? `${location.name} में ${copy.label} का दृश्य` : `${copy.label} care in ${location.name}`} fill priority sizes="(max-width: 900px) 100vw, 48vw" className="care-detail-image" />
          <div className="care-detail-location-stamp">
            <Image src={locationVisual.image} alt="" width={82} height={82} className="care-detail-location-image" />
            <span><strong>{location.name}</strong><small>{locationVisual.caption[locale]}</small></span>
          </div>
          <div className="care-image-caption"><span>{copy.label}</span><strong>{location.name}</strong></div>
        </div>
        <Link className="care-language-switch" href={getTreatmentHref(slug, locationSlug, oppositeLocale)} hrefLang={oppositeLocale}>{labels.language}</Link>
      </section>

      <section className="care-detail-overview">
        <div className="care-content-wrap care-overview-grid">
          <div className="care-overview-main">
            <span className="care-section-kicker">{copy.category}</span>
            <h2>{labels.overview}</h2>
            <p>{copy.intro}</p>
            <p className="care-disclaimer">{labels.careNote}</p>
          </div>
          <aside className="care-next-card">
            <div className="care-next-icon"><ArrowUpRight size={20} /></div>
            <h3>{labels.nextSteps}</h3>
            <p>{labels.nextStepsBody}</p>
            <a href="tel:+919990959440" className="care-text-link">{labels.call} +91 99909 59440 <ArrowUpRight size={15} /></a>
          </aside>
        </div>
      </section>

      <section className="care-detail-discussion">
        <div className="care-content-wrap">
          <div className="care-detail-section-heading">
            <span className="care-section-kicker">{locale === "hi" ? "आपकी बातचीत, आपकी ज़रूरत" : "A conversation shaped around you"}</span>
            <h2>{locale === "hi" ? "विशेषज्ञ से क्या-क्या समझ सकते हैं?" : "Make your specialist conversation count"}</h2>
            <p>{locale === "hi" ? "अपॉइंटमेंट में अपनी बात साफ़-साफ़ रखने से आपको विकल्प समझने में मदद मिलती है। शुरुआत के लिए ये तीन बातें साथ रखें।" : "A little preparation can help you get more from your appointment. These three topics are a useful place to start."}</p>
          </div>
          <div className="care-discussion-grid">
            {discussionCards.map((card) => <article className="care-discussion-card" key={card.number}>
              <span className="care-discussion-number">{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>)}
          </div>
          <aside className="care-detail-callout">
            <span aria-hidden="true">✳</span>
            <p>{locale === "hi" ? "कोई सवाल छोटा नहीं होता—अपनी शंकाएँ लिखकर लाएँ और विशेषज्ञ से खुलकर पूछें।" : "No question is too small. Write down what is on your mind and bring it to your specialist conversation."}</p>
          </aside>
        </div>
      </section>

      <section className="care-detail-journey">
        <div className="care-content-wrap care-journey-layout">
          <div className="care-journey-copy">
            <span className="care-section-kicker">{locale === "hi" ? "साफ़ और आसान कदम" : "A clear way forward"}</span>
            <h2>{locale === "hi" ? "हमारे साथ आपकी देखभाल की यात्रा" : "Your care journey, one step at a time"}</h2>
            <p>{locale === "hi" ? "हमारी टीम बातचीत और अपॉइंटमेंट के अगले कदम समझने में मदद कर सकती है। आगे की देखभाल विशेषज्ञ की सलाह और आपकी पसंद के अनुसार तय होती है।" : "Our team can help you understand the conversation and appointment process. Any care plan is guided by a specialist’s advice and your preferences."}</p>
            <Link href={getLocationHref(locationSlug, locale)} className="care-journey-link">{locale === "hi" ? `${location.name} के सभी उपचार देखें` : `Explore care in ${location.name}`} <ArrowUpRight size={16} /></Link>
          </div>
          <ol className="care-journey-steps">
            {journey.map((step, index) => <li key={step}><span>{`0${index + 1}`}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className="care-detail-faq">
        <div className="care-content-wrap care-faq-layout">
          <div className="care-faq-intro">
            <span className="care-section-kicker">{locale === "hi" ? "आम सवाल" : "Good to know"}</span>
            <h2>{locale === "hi" ? "आपके मन में ये सवाल हैं?" : "Questions people often ask"}</h2>
            <p>{locale === "hi" ? "जवाब सामान्य जानकारी के लिए हैं। आपकी अपनी स्थिति पर विशेषज्ञ से बात करें।" : "These answers are general information. Talk with a specialist about your individual situation."}</p>
          </div>
          <div className="care-faq-list">
            {faqs.map((faq) => <details key={faq.question} className="care-faq-item"><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="care-process-section">
        <div className="care-content-wrap">
          <div className="care-section-heading care-process-heading">
            <div>
              <span className="care-section-kicker">{location.name}</span>
              <h2>{locale === "hi" ? "हम आपकी मदद कैसे करते हैं" : "How we can help"}</h2>
            </div>
            <Link href={getLocationHref(locationSlug, locale)} className="care-back-link"><ArrowLeft size={16} />{locale === "hi" ? "सभी उपचार देखें" : "View all treatments"}</Link>
          </div>
          <div className="care-process-list">
            {process.map((step, index) => (
              <div className="care-process-step" key={step}>
                <span className="care-process-index">0{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="care-related-section">
        <div className="care-content-wrap care-related-inner">
          <div>
            <span className="care-section-kicker">{location.name}</span>
            <h2>{locale === "hi" ? "विशेषज्ञ से अगला कदम पूछें" : "Ask a specialist about your next step"}</h2>
          </div>
          <a href="tel:+919990959440" className="care-button care-button-light"><Phone size={17} />{labels.talkToTeam}</a>
        </div>
      </section>
    </main>
  );
}
