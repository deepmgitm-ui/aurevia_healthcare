import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ChevronDown, HeartHandshake, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import HealthcareBenefits from "@/components/HealthcareBenefits";
import type { CampaignLocale, CampaignTreatment } from "@/lib/campaignLandingData";
import { siteLocationDetails } from "@/lib/locationDetails";

export default function CampaignLandingPage({ treatment, locale }: { treatment: CampaignTreatment; locale: CampaignLocale }) {
  const hindi = locale === "hi";
  const copy = treatment[locale];
  const switchHref = hindi ? `/campaigns/${treatment.slug}/` : `/hi/campaigns/${treatment.slug}/`;

  return (
    <main lang={hindi ? "hi" : "en"} className={`campaign-page campaign-tone-${treatment.tone}${hindi ? " campaign-hindi" : ""}`}>
      <header className="campaign-header">
        <Link href={hindi ? "/hi/" : "/"} className="campaign-brand" aria-label="Aurevia Healthcare home">
          <Image src="/logo-new.png" alt="" width={43} height={46} priority />
          <span><strong>Aurevia</strong><small>{hindi ? "हेल्थकेयर फैसिलिटेटर्स" : "Healthcare facilitators"}</small></span>
        </Link>
        <div className="campaign-header-actions">
          <a className="campaign-call" href="tel:+919990959440">+91 99909 59440</a>
          <Link className="campaign-language" href={switchHref}>{hindi ? "English" : "हिन्दी"}</Link>
          <a className="campaign-header-cta" href="#campaign-form">{hindi ? "कॉल का अनुरोध करें" : "Request a call"}<ArrowRight size={15} /></a>
        </div>
      </header>

      <section className="campaign-hero" aria-labelledby="campaign-title">
        <div className="campaign-hero-copy">
          <div className="campaign-breadcrumb"><span>{hindi ? "Aurevia केयर" : "Aurevia care"}</span><i />{copy.category}</div>
          <p className="campaign-eyebrow"><span />{copy.eyebrow}</p>
          <h1 id="campaign-title">{copy.headline.split("\n").map((line, i) => <span key={line}>{i === 1 ? <em>{line}</em> : line}{i === 0 && copy.headline.includes("\n") ? <br /> : null}</span>)}</h1>
          <p className="campaign-summary">{copy.summary}</p>
          <div className="campaign-hero-actions">
            <a className="campaign-primary-button" href="#campaign-form">{hindi ? "अपनी बातचीत शुरू करें" : "Start a conversation"}<ArrowRight size={18} /></a>
            <a className="campaign-text-link" href="#campaign-pathway">{copy.explore}<ArrowDown size={15} /></a>
          </div>
          <div className="campaign-hero-note"><ShieldCheck size={16} />{hindi ? "कोई दबाव नहीं · पहले जानकारी, फिर आपका फ़ैसला" : "No pressure · understand first, decide in your time"}</div>
        </div>

        <div className="campaign-hero-visual">
          <div className="campaign-image-frame">
            <Image src={treatment.image} alt={copy.imageAlt} fill priority sizes="(max-width: 820px) 100vw, 52vw" />
            <div className="campaign-image-wash" />
            <div className="campaign-image-caption"><span className="campaign-caption-mark"><HeartHandshake size={18} /></span><span><strong>{treatment.en.label}</strong><small>{hindi ? "विशेषज्ञ देखभाल पर बातचीत" : "A specialist-guided conversation"}</small></span></div>
            <div className="campaign-image-index">{treatment.slug === "lasik" ? "01 / EYE CARE" : treatment.en.category.split(" · ")[0]}</div>
          </div>
          <div className="campaign-orbit campaign-orbit-one" />
          <div className="campaign-orbit campaign-orbit-two" />
          <div className="campaign-image-side-note">{hindi ? "हर व्यक्ति की देखभाल अलग होती है" : "Care is personal. Your questions matter."}</div>
        </div>
        <div className="campaign-scroll-cue"><span />{hindi ? "नीचे और जानें" : "Scroll to explore"}</div>
      </section>

      <section className="campaign-trust-strip" aria-label={hindi ? "हमारा तरीका" : "Our approach"}>
        {copy.signals.map((signal, i) => <div className="campaign-trust-item" key={signal}><span className="campaign-trust-number">0{i + 1}</span><p>{signal}</p><Check size={17} /></div>)}
      </section>

      <section className="campaign-intro campaign-section" id="campaign-pathway">
        <div className="campaign-section-kicker"><span>01</span>{hindi ? "इलाज को समझें" : "UNDERSTAND YOUR OPTIONS"}</div>
        <div className="campaign-intro-grid">
          <h2>{copy.introTitle}</h2>
          <div className="campaign-intro-body"><p>{copy.intro}</p><a href="#campaign-pathway-steps">{hindi ? "कैसे आगे बढ़ें" : "See how it works"}<ArrowDown size={15} /></a></div>
        </div>
        <div className="campaign-insight-row"><div className="campaign-insight-symbol">{treatment.slug === "lasik" || treatment.slug === "cataract" ? "◉" : "✳"}</div><p>{hindi ? "आपकी जाँच और आपकी प्राथमिकताएँ—दोनों आगे की बातचीत का हिस्सा हैं।" : "Your assessment and your priorities both belong in the conversation."}</p><span>{copy.category}</span></div>
      </section>

      <section className="campaign-pathway" id="campaign-pathway-steps">
        <div className="campaign-section campaign-pathway-inner">
          <div className="campaign-section-kicker campaign-section-kicker-light"><span>02</span>{hindi ? "तीन आसान कदम" : "A SIMPLE WAY FORWARD"}</div>
          <div className="campaign-pathway-heading"><h2>{copy.stepsTitle}</h2><p>{hindi ? "कोई जल्दबाज़ी नहीं। सही सवालों से शुरुआत करें।" : "No rush. Start with the questions that matter to you."}</p></div>
          <div className="campaign-step-grid">{copy.steps.map((step, index) => <article className="campaign-step-card" key={step.title}><div className="campaign-step-top"><span>0{index + 1}</span><i /></div><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
        </div>
      </section>

      <section className="campaign-support campaign-section">
        <div className="campaign-section-kicker"><span>03</span>{hindi ? "AUREVIA केयर समन्वय" : "AUREVIA CARE COORDINATION"}</div>
        <div className="campaign-support-heading"><h2>{copy.supportTitle}</h2><p>{hindi ? "सवालों के जवाब और सही लोगों तक पहुँचने में मदद।" : "Helpful answers, thoughtful coordination, and room to decide."}</p></div>
        <div className="campaign-support-grid">{copy.support.map((item, index) => <article className="campaign-support-card" key={item.title}><span className="campaign-support-num">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p><div className="campaign-support-line" /></article>)}</div>
      </section>

      <HealthcareBenefits locale={locale} campaign eyeCare={treatment.slug === "lasik" || treatment.slug === "cataract"} />

      <section className="campaign-faq campaign-section">
        <div className="campaign-section-kicker"><span>04</span>{hindi ? "सवाल और जवाब" : "GOOD TO KNOW"}</div>
        <div className="campaign-faq-layout"><div className="campaign-faq-heading"><h2>{copy.faqTitle}</h2><p>{hindi ? "हर स्थिति अलग है। अपने मामले पर विशेषज्ञ से बात करें।" : "Every situation is different. A qualified specialist can guide you on yours."}</p><span className="campaign-faq-doodle">?</span></div><div className="campaign-faq-list">{copy.faqs.map((faq, index) => <details className="campaign-faq-item" key={faq.q} open={index === 0}><summary><span>{faq.q}</span><ChevronDown size={18} /></summary><p>{faq.a}</p></details>)}</div></div>
      </section>

      <section className="campaign-final-cta" id="campaign-form">
        <div className="campaign-final-copy"><div className="campaign-section-kicker campaign-section-kicker-light"><span>05</span>{hindi ? "बात शुरू करें" : "LET’S TALK"}</div><h2>{copy.ctaTitle}</h2><p>{copy.ctaBody}</p><div className="campaign-final-reassurance"><span><MapPin size={16} /></span>{hindi ? "अपने शहर से विशेषज्ञ देखभाल के विकल्प समझें" : "Explore specialist care options in your city"}</div></div>
        <div className="campaign-form-card"><div className="campaign-form-head"><span>{hindi ? "आपका अगला कदम" : "YOUR NEXT STEP"}</span><h3>{copy.formTitle}</h3><p>{copy.formBody}</p></div><ContactForm compactLead initialTreatment={treatment.en.label} /><div className="campaign-form-foot"><ShieldCheck size={14} />{hindi ? "आपकी जानकारी केवल संपर्क और समन्वय के लिए है।" : "Your details are used only to arrange a conversation."}</div></div>
      </section>

      <footer className="aurevia-site-footer campaign-site-footer" lang={hindi ? "hi" : "en"}>
        <div className="aurevia-footer-shell">
          <div className="aurevia-footer-grid">
            <div className="aurevia-footer-brand">
              <Link href={hindi ? "/hi/" : "/"} className="aurevia-footer-logo" aria-label={hindi ? "Aurevia Healthcare — होम" : "Aurevia Healthcare home"}>
                <Image src="/logo.png" alt="" width={38} height={42} className="object-contain" />
                <span>Aurevia <small>HEALTHCARE</small></span>
              </Link>
              <p>{hindi ? "हम मरीजों को उपचार के विकल्प समझने, अस्पतालों से जुड़ने और अगले कदम तय करने में मदद करते हैं।" : "We help patients understand treatment options, connect with hospitals and navigate the next steps of care."}</p>
              <div className="aurevia-footer-contact-note">{hindi ? "यह पेज सामान्य जानकारी और देखभाल समन्वय के लिए है।" : "This page shares general information and care coordination support."}</div>
            </div>

            <nav className="aurevia-footer-nav" aria-label={hindi ? "देखभाल के लिंक" : "Care links"}>
              <h2>{hindi ? "देखभाल" : "Explore care"}</h2>
              <ul>
                <li><Link href="/treatments">{hindi ? "सभी उपचार" : "All treatments"}<ArrowRight size={13} aria-hidden="true" /></Link></li>
                <li><Link href="/how-it-works">{hindi ? "कैसे काम करता है" : "How care works"}<ArrowRight size={13} aria-hidden="true" /></Link></li>
                <li><Link href={hindi ? "/hi/locations" : "/locations"}>{hindi ? "सभी क्षेत्र" : "All locations"}<ArrowRight size={13} aria-hidden="true" /></Link></li>
              </ul>
            </nav>

            <nav className="aurevia-footer-locations" aria-label={hindi ? "क्षेत्र चुनें" : "Care locations"}>
              <h2>{hindi ? "अपने शहर में" : "Care by location"}</h2>
              <ul>{siteLocationDetails.map((region) => <li key={region.slug}><Link href={`${hindi ? "/hi" : ""}/locations/${region.slug}`}><MapPin size={13} aria-hidden="true" />{region.fullLabel[locale]}</Link></li>)}</ul>
            </nav>

            <div className="aurevia-footer-contact">
              <h2>{hindi ? "हमसे संपर्क करें" : "Speak with us"}</h2>
              <p>{hindi ? "हमारी टीम से अपने सवालों के बारे में बात करें।" : "Talk with our team about the questions on your mind."}</p>
              <a href="tel:+919990959440" className="footer-contact-link"><Phone size={16} aria-hidden="true" /><span><small>{hindi ? "हमें कॉल करें" : "Call our care team"}</small>+91 99909 59440</span></a>
              <a href="mailto:info@aureviahealthcare.com" className="footer-contact-link"><Mail size={16} aria-hidden="true" /><span><small>{hindi ? "ईमेल" : "Email us"}</small>info@aureviahealthcare.com</span></a>
              <a href="https://wa.me/919990959440" target="_blank" rel="noopener noreferrer" className="footer-whatsapp-link"><MessageCircle size={16} aria-hidden="true" />{hindi ? "WhatsApp पर बात करें" : "Message us on WhatsApp"}</a>
            </div>
          </div>
          <div className="aurevia-footer-trustline"><span>{hindi ? "उपचार की उपयुक्तता और उपलब्ध सुविधाएँ हर व्यक्ति व प्रदाता के अनुसार बदलती हैं।" : "Treatment suitability and available services vary by person and provider."}</span><Link href="/disclaimer">{hindi ? "अस्वीकरण" : "Disclaimer"}</Link></div>
          <div className="aurevia-footer-bottom"><span>© {new Date().getFullYear()} Aurevia Healthcare</span><nav aria-label={hindi ? "कानूनी जानकारी" : "Legal information"}><Link href="/privacy-policy">{hindi ? "गोपनीयता" : "Privacy"}</Link><Link href="/terms-conditions">{hindi ? "नियम व शर्तें" : "Terms"}</Link><Link href="/photo-credits">{hindi ? "फ़ोटो क्रेडिट" : "Photo credits"}</Link><Link href={switchHref}>{hindi ? "English" : "हिन्दी"}</Link></nav></div>
        </div>
      </footer>

      <aside className="campaign-medical-note">{copy.disclaimer}</aside>
    </main>
  );
}
