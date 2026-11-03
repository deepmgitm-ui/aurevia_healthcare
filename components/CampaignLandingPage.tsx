"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronDown, MapPin, Phone, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel";
import HealthcareBenefits from "@/components/HealthcareBenefits";
import type { CampaignLocale, CampaignTreatment } from "@/lib/campaignLandingData";
import { resolveSiteLocation } from "@/lib/locationDetails";
import { getTreatmentLocationImage } from "@/lib/treatmentLocationImages";

const googleProfileUrl = "https://www.google.com/maps/place/Aurevia+HealthCare,+maruti+industrial+development+area,+Sector+18,+Gurugram,+Haryana+122015/@28.4898737,77.0620363,17z/data=!4m2!3m1!1s0x27da9535d6e66a7d:0x3c07f42f9d285c4";

export default function CampaignLandingPage({ treatment, locale, initialLocation, languageHrefOverride }: { treatment: CampaignTreatment; locale: CampaignLocale; initialLocation?: string; languageHrefOverride?: string }) {
  const hindi = locale === "hi";
  const copy = treatment[locale];
  const [locationSlug, setLocationSlug] = useState<string | undefined>(initialLocation);
  const location = resolveSiteLocation(locationSlug);
  const visualImage = locationSlug ? getTreatmentLocationImage(treatment.slug, locationSlug, treatment.image) : treatment.image;
  const isLasik = treatment.slug === "lasik";
  const mumbaiLasik = isLasik && locationSlug === "mumbai";
  const languageHref = languageHrefOverride ?? `${hindi ? "/campaigns" : "/hi/campaigns"}/${treatment.slug}/${locationSlug ? `?location=${encodeURIComponent(locationSlug)}` : ""}`;

  useEffect(() => {
    if (initialLocation) return;
    const query = new URLSearchParams(window.location.search).get("location");
    if (query) setLocationSlug(resolveSiteLocation(query)?.slug);
  }, [initialLocation]);

  const city = location?.name;
  const cityPill = mumbaiLasik
    ? (hindi ? "मुंबई में LASIK · घाटकोपर और जोगेश्वरी" : "LASIK in Mumbai · Ghatkopar & Jogeshwari")
    : city ? `${copy.label} ${hindi ? "में" : "in"} ${location?.fullLabel[locale]}` : copy.label;
  const heroHeadline = isLasik
    ? (hindi ? "चश्मे से आज़ादी की ओर।\nनिःशुल्क LASIK परामर्श, विशेषज्ञों के साथ।" : "Say goodbye to glasses.\nFree LASIK consultation with senior eye surgeons.")
    : copy.headline.replace("\n", " ");
  const introHeading = isLasik
    ? (hindi ? "एक छोटी प्रक्रिया, जो चश्मे और लेंस की ज़रूरत कम कर सकती है" : "A quick procedure that can reduce your need for glasses and lenses")
    : copy.introTitle;
  const introBody = isLasik
    ? (hindi ? "LASIK में लेज़र से कॉर्निया का आकार बदला जाता है, ताकि रोशनी रेटिना पर सही तरह केंद्रित हो। दोनों आँखों की प्रक्रिया में लगभग 10 मिनट लग सकते हैं। सामान्य कामकाज पर लौटने का समय हर व्यक्ति के अनुसार बदलता है।" : "LASIK uses a laser to reshape the cornea so light focuses correctly on the retina. The procedure takes about 10 minutes for both eyes, and most people get back to routine work within a few days.*")
    : copy.intro;
  const stepTitles = isLasik
    ? (hindi ? ["निःशुल्क परामर्श", "₹1,000 में आँखों की जाँच", "लगभग 10 मिनट की प्रक्रिया", "निःशुल्क फॉलो-अप"] : ["Free consultation", "Eye tests for ₹1,000", "10-minute procedure", "Free follow-ups"])
    : (hindi ? ["निःशुल्क परामर्श", "रिपोर्ट और ज़रूरतों की समीक्षा", "विशेषज्ञ से विकल्पों पर बात", "आगे की देखभाल की योजना"] : ["Free consultation", "Review reports and needs", "Discuss options with a specialist", "Plan your follow-up"]);
  const stepBodies = isLasik
    ? (hindi ? ["वरिष्ठ नेत्र विशेषज्ञ से मिलें और अपनी नज़र के बारे में बात करें।", "पात्रता जाँचने के लिए LASIK से पहले की जाँच कराएँ।", "लेज़र प्रक्रिया और आपके लिए लागू देखभाल की जानकारी समझें।", "सर्जरी के बाद नियमित जाँच और देखभाल की योजना समझें।"] : ["Meet a senior eye surgeon and discuss your vision.", "Complete pre-LASIK tests worth ₹5,000 to check eligibility.", "Quick laser procedure with free pick & drop.", "Regular check-ups after surgery at no extra cost."])
    : (hindi ? ["अपनी चिंता और सवाल साझा करें।", "उपलब्ध रिपोर्ट और स्वास्थ्य संबंधी जानकारी साथ रखें।", "योग्य विशेषज्ञ जाँच के बाद उपयुक्त विकल्प समझाएँगे।", "अपनी स्थिति के अनुसार आगे की देखभाल तय करें।"] : ["Meet our care team and share what you would like to understand.", "Keep any reports and relevant health information handy.", "A qualified specialist can explain options after an assessment.", "Plan follow-up around your individual needs."]);

  return (
    <main lang={hindi ? "hi" : "en"} className={`campaign-page campaign-pdf-layout${hindi ? " campaign-hindi" : ""}`}>
      <div className="campaign-offer-strip">
        <span>{isLasik ? (hindi ? "इस हफ़्ते सीमित स्लॉट · ₹5,000 की आँखों की जाँच सिर्फ़ ₹1,000 में" : "Limited slots this week · ₹5,000 eye tests for just ₹1,000") : (hindi ? `${copy.label} के लिए निःशुल्क परामर्श उपलब्ध` : `Free ${copy.label.toLowerCase()} consultation available`)}</span>
        <a href="#campaign-form">{hindi ? "निःशुल्क परामर्श बुक करें" : "Book your free consultation"}<ArrowRight size={14} /></a>
      </div>
      <header className="campaign-header">
        <Link href="/" className="campaign-brand" aria-label="Aurevia Healthcare home">
          <Image src="/logo-new.png" alt="" width={43} height={46} priority />
          <span><strong>Aurevia <i>Healthcare</i></strong><small>{hindi ? "हेल्थकेयर फैसिलिटेटर्स" : "Healthcare facilitators"}</small></span>
        </Link>
        <div className="campaign-header-actions">
          <a className="campaign-call" href="tel:+919990959440"><Phone size={14} />{hindi ? "कॉल करें" : "Call 99909 59440"}</a>
          <Link className="campaign-language" href={languageHref}>{hindi ? "English" : "हिन्दी"}</Link>
          <a className="campaign-header-cta" href="#campaign-form">{hindi ? "निःशुल्क परामर्श बुक करें" : "Book Free Consultation"}<ArrowRight size={15} /></a>
        </div>
      </header>

      <section className="campaign-hero campaign-pdf-hero" aria-labelledby="campaign-title">
        <div className="campaign-hero-copy">
          <p className="campaign-location-pill"><MapPin size={14} />{cityPill}</p>
          <h1 id="campaign-title">{heroHeadline.split("\n").map((line, index) => <span key={`${line}-${index}`}>{index === 1 ? <em>{line}</em> : line}{index === 0 && heroHeadline.includes("\n") ? <br /> : null}</span>)}</h1>
          <p className="campaign-summary">{isLasik ? (hindi ? "जानें कि LASIK आपके लिए उपयुक्त है या नहीं। ₹5,000 तक की आँखों की जाँच सिर्फ़ ₹1,000 में, निःशुल्क परामर्श, पिकअप-ड्रॉप और फॉलो-अप के साथ।" : "Find out if LASIK is right for you. Complete eye tests worth ₹5,000 for just ₹1,000, with free pick & drop and free follow-ups.") : copy.summary}</p>
          <ul className="campaign-hero-points">
            {(isLasik ? (hindi ? ["निःशुल्क परामर्श", "निःशुल्क पिकअप और ड्रॉप", "वरिष्ठ नेत्र विशेषज्ञ", "निःशुल्क फॉलो-अप"] : ["Free consultation", "Free pick & drop", "Senior eye surgeons", "Free follow-ups"]) : (hindi ? ["निःशुल्क परामर्श", "अपनी भाषा में जानकारी", "अगले कदमों में सहायता", "फ़ैसला आपका"] : ["Free consultation", "Clear information", "Support with next steps", "Your decision, your pace"])).map((item) => <li key={item}><Check size={16} />{item}</li>)}
          </ul>
          <a className="campaign-hero-textlink" href="#campaign-pathway">{hindi ? "उपचार के बारे में जानें" : `Learn about ${copy.label.toLowerCase()}`}<ArrowDown size={15} /></a>
        </div>
        <aside className="campaign-form-card campaign-hero-form" id="campaign-form">
          <div className="campaign-form-head"><span>{hindi ? "आपकी देखभाल की शुरुआत" : "START YOUR CARE JOURNEY"}</span><h2>{hindi ? "निःशुल्क परामर्श बुक करें" : "Book your free consultation"}</h2><p>{hindi ? "हमारी टीम 30 मिनट के भीतर आपसे संपर्क करेगी।" : "Our team will call you within 30 minutes."}</p></div>
          <ContactForm compactLead initialTreatment={treatment.en.label} initialLocation={city} forceHindi={hindi} />
          <div className="campaign-form-foot"><ShieldCheck size={14} />{hindi ? "स्पैम नहीं। आपकी जानकारी सुरक्षित है।" : "No spam. Your details are safe with us."}</div>
        </aside>
      </section>

      <section className="campaign-pdf-proof" aria-label={hindi ? "हमारी देखभाल" : "Care support"}>
        {(isLasik ? (hindi ? ["निःशुल्क परामर्श", "LASIK से पहले आँखों की जाँच", "विशेषज्ञ द्वारा पात्रता जाँच", "आपके शहर में सहायता"] : ["Free consultation", "Pre-LASIK eye tests", "Surgeon-led eligibility check", `Care support${city ? ` in ${city}` : " near you"}`]) : (hindi ? ["निःशुल्क परामर्श", "विशेषज्ञ से बातचीत", "विकल्प आसान भाषा में", `आपके शहर में सहायता`] : ["Free consultation", "Specialist discussion", "Options in plain language", `Care support${city ? ` in ${city}` : " near you"}`])).map((item, index) => <div className="campaign-proof-item" key={item}><strong>0{index + 1}</strong><span>{item}</span></div>)}
      </section>

      <section className="campaign-pdf-intro campaign-section" id="campaign-pathway">
        <div className="campaign-pdf-intro-image"><Image src={visualImage} alt={copy.imageAlt} fill sizes="(max-width: 760px) 100vw, 48vw" /><span>{city ? `${copy.imageAlt} · ${location?.fullLabel[locale]}` : copy.imageAlt}</span></div>
        <div className="campaign-pdf-intro-copy"><p className="campaign-eyebrow">{isLasik ? (hindi ? "LASIK क्या है?" : "WHAT IS LASIK?") : copy.category}</p><h2>{introHeading}</h2><p>{introBody}</p>
          {isLasik && <div className="campaign-eligibility"><strong>{hindi ? "आप पात्र हो सकते हैं यदि:" : "You may be eligible if:"}</strong><ul>{(hindi ? ["आपकी उम्र 18–40 वर्ष है", "आपके चश्मे का नंबर कम-से-कम एक साल से स्थिर है", "आँखों की कोई बड़ी बीमारी नहीं है (डॉक्टर पुष्टि करेंगे)"] : ["You are 18–40 years old", "Your glasses power has been stable for 1+ year", "You have no major eye disease (your doctor will confirm)"]).map((item) => <li key={item}>{item}</li>)}</ul></div>}
          <a className="campaign-orange-button" href="#campaign-form">{hindi ? "निःशुल्क पात्रता जाँच कराएँ" : "Check my eligibility for free"}<ArrowRight size={15} /></a>
          {isLasik && <small className="campaign-safety-note">{hindi ? "पात्रता और उपचार का निर्णय जाँच के बाद आपका नेत्र विशेषज्ञ करेगा।" : "Your eye surgeon will confirm eligibility after an examination."}</small>}
        </div>
      </section>

      <section className="campaign-pdf-steps">
        <div className="campaign-section campaign-pdf-steps-inner">
          <p className="campaign-eyebrow">{hindi ? "कैसे आगे बढ़ें" : "HOW IT WORKS"}</p>
          <h2>{isLasik ? (hindi ? "परामर्श से साफ़ नज़र तक, 4 आसान कदम" : "From consultation to clear vision in 4 simple steps") : (hindi ? `${copy.label} के लिए 4 आसान कदम` : `Four simple steps to explore ${copy.label.toLowerCase()}`)}</h2>
          <div className="campaign-pdf-step-grid">{stepTitles.map((title, index) => <article className="campaign-pdf-step" key={title}><span>{index + 1}</span><h3>{title}</h3><p>{stepBodies[index]}</p></article>)}</div>
          <a className="campaign-orange-button" href="#campaign-form">{hindi ? "निःशुल्क परामर्श बुक करें" : "Book Free Consultation"}<ArrowRight size={15} /></a>
        </div>
      </section>

      <section className="campaign-city-section campaign-section">
        <p className="campaign-eyebrow">{hindi ? "आपके शहर में" : "CARE NEAR YOU"}</p>
        <h2>{mumbaiLasik ? (hindi ? "मुंबई में दो पार्टनर अस्पताल" : "Two partner hospitals in Mumbai") : city ? (hindi ? `${location?.fullLabel.hi} में सहायता` : `Care support in ${location?.fullLabel.en}`) : (hindi ? "आपके नज़दीक देखभाल समन्वय" : "Care coordination close to home")}</h2>
        {mumbaiLasik ? <div className="campaign-hospital-grid"><article><h3>{hindi ? "घाटकोपर ईस्ट" : "Ghatkopar East"}</h3><p>{hindi ? "पवई, विक्रोली, कुर्ला, चेंबूर और आसपास के इलाक़ों के लिए सुविधाजनक।" : "Convenient for Powai, Vikhroli, Kurla, Chembur & nearby areas."}</p><strong>{hindi ? "निःशुल्क पिकअप और ड्रॉप उपलब्ध" : "Free pick & drop available"}</strong></article><article><h3>{hindi ? "जोगेश्वरी वेस्ट" : "Jogeshwari West"}</h3><p>{hindi ? "अंधेरी, गोरेगाँव, विले पार्ले और आसपास के इलाक़ों के लिए सुविधाजनक।" : "Convenient for Andheri, Goregaon, Vile Parle & nearby areas."}</p><strong>{hindi ? "निःशुल्क पिकअप और ड्रॉप उपलब्ध" : "Free pick & drop available"}</strong></article></div> : <div className="campaign-city-card"><div className="campaign-city-photo"><Image src={city ? `/location-photos/${location?.slug}.jpg` : visualImage} alt={city ? `${location?.name} city image, shown to identify the campaign location` : copy.imageAlt} fill sizes="(max-width: 620px) 100vw, 180px" />{city && <span>{location?.fullLabel[locale]}</span>}</div><MapPin size={23} /><div><h3>{city ? location?.fullLabel[locale] : (hindi ? "अपना शहर चुनें" : "Choose your city")}</h3><p>{city ? (hindi ? "हमारी टीम आपके शहर में उपलब्ध परामर्श और अपॉइंटमेंट के अगले कदम समझने में मदद करेगी।" : "Our team can help you understand consultation availability and appointment next steps in your city.") : (hindi ? "परामर्श अनुरोध करते समय शहर चुनें; हमारी टीम उपलब्ध विकल्पों के बारे में बताएगी।" : "Choose your city when you request a call and our team will explain the available options.")}</p></div><a href="#campaign-form">{hindi ? "परामर्श लें" : "Ask our team"}<ArrowRight size={15} /></a></div>}
      </section>

      <HealthcareBenefits locale={locale} campaign eyeCare={isLasik || treatment.slug === "cataract"} location={location} />

      <section className="campaign-google-reviews campaign-section" aria-labelledby="campaign-google-title">
        <div className="campaign-google-heading"><div><p className="campaign-eyebrow">{hindi ? "Google पर साझा किए गए अनुभव" : "PATIENT STORIES"}</p><h2 id="campaign-google-title">{hindi ? "उन लोगों की बात, जिन्होंने हमारी देखभाल चुनी" : `Hear from people who chose ${copy.label.toLowerCase()}`}</h2></div><a className="campaign-google-rating" href={googleProfileUrl} target="_blank" rel="noopener noreferrer"><strong>5.0</strong><span><i aria-label="5 out of 5 stars">★★★★★</i><small>{hindi ? "49 Google समीक्षाएँ · गुरुग्राम" : "49 Google reviews · Gurugram"}</small></span><ArrowRight size={16} /></a></div>
        <GoogleReviewsCarousel locale={locale} />
      </section>

      {isLasik && <section className="campaign-offer-band"><div><span>{hindi ? "इस महीने का ऑफ़र" : "THIS MONTH’S OFFER"}</span><h2>{hindi ? "₹5,000 तक की LASIK आँखों की जाँच सिर्फ़ ₹1,000 में" : <>Complete LASIK eye tests worth <s>₹5,000</s> for just ₹1,000</>}</h2><p>{hindi ? "साथ में निःशुल्क परामर्श · पिकअप और ड्रॉप · फॉलो-अप" : "Plus free consultation · free pick & drop · free follow-ups"}</p></div><a className="campaign-orange-button" href="#campaign-form">{hindi ? "ऑफ़र के बारे में पूछें" : "Claim This Offer"}<ArrowRight size={15} /></a></section>}

      <section className="campaign-faq campaign-section">
        <p className="campaign-eyebrow">{hindi ? "अक्सर पूछे जाने वाले सवाल" : "FAQs"}</p>
        <h2>{hindi ? "आपके सवालों के जवाब" : "Your questions, answered"}</h2>
        <div className="campaign-faq-list">{copy.faqs.map((faq, index) => <details className="campaign-faq-item" key={faq.q} open={index === 0}><summary><span>{faq.q}</span><ChevronDown size={18} /></summary><p>{faq.a}</p></details>)}</div>
      </section>

      <section className="campaign-pdf-final"><h2>{isLasik ? (hindi ? "चश्मे के बिना देखने की ओर बढ़ें?" : "Ready to see life without glasses?") : (hindi ? `${copy.label} पर बातचीत शुरू करें?` : `Ready to talk about ${copy.label.toLowerCase()}?`)}</h2><p>{hindi ? "आज ही निःशुल्क परामर्श बुक करें। हमारी टीम आपके नज़दीक उपलब्ध विकल्प समझने में मदद करेगी।" : "Book your free consultation today. Our team will help you explore the options available near you."}</p><a className="campaign-orange-button" href="#campaign-form">{hindi ? "निःशुल्क परामर्श बुक करें" : "Book Free Consultation"}<ArrowRight size={15} /></a></section>

      <Footer locale={locale} languageHrefOverride={languageHref} />
      <p className="campaign-medical-note">{copy.disclaimer}</p>
    </main>
  );
}
