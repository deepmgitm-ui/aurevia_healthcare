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
            <Image src={locationVisual.image} alt="" width={58} height={58} className="care-detail-location-image" />
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
