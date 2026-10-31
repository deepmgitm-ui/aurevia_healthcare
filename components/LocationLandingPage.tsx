import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  getLandingCopy,
  getLocation,
  getLocationHref,
  getTreatmentHref,
  treatmentLandings,
  type LandingLocale,
} from "@/lib/locationLandingData";
import { getLocationVisual } from "@/lib/locationVisuals";

export default function LocationLandingPage({ locationSlug, locale }: { locationSlug: string; locale: LandingLocale }) {
  const location = getLocation(locationSlug);
  if (!location) return null;
  const labels = getLandingCopy(locale);
  const oppositeLocale = locale === "en" ? "hi" : "en";
  const visual = getLocationVisual(locationSlug);
  const themeStyle = {
    "--care-ink": visual.palette.ink,
    "--care-navy": visual.palette.navy,
    "--care-teal": visual.palette.teal,
    "--care-mint": visual.palette.mint,
    "--care-soft": visual.palette.soft,
    "--care-muted": visual.palette.muted,
    "--care-region-wash": visual.palette.regionWash,
    "--care-region-highlight": visual.palette.regionHighlight,
  } as CSSProperties;

  return (
    <main className={`care-landing care-location-${locationSlug} ${locale === "hi" ? "care-landing-hi" : ""}`} lang={locale === "hi" ? "hi" : "en"} style={themeStyle}>
      <section className="care-region-hero">
        <div className="care-region-hero-copy">
          <nav className="care-breadcrumb" aria-label={locale === "hi" ? "ब्रेडक्रम्ब" : "Breadcrumb"}>
            <Link href="/">{labels.home}</Link><span>/</span><Link href="/locations">{labels.locations}</Link><span>/</span><span>{location.name}</span>
          </nav>
          <div className="care-region-kicker"><MapPin size={15} /> Aurevia Healthcare</div>
          <h1>{locale === "hi" ? `${location.name} में देखभाल के विकल्प` : `Care options in ${location.name}`}</h1>
          <p>{locale === "hi"
            ? `${location.name} में उपलब्ध उपचारों के बारे में जानें और हमारी केयर टीम से अगले कदमों पर बात करें।`
            : `Explore treatment options in ${location.name} and talk with our care team about the next step.`}</p>
          <a className="care-button care-button-primary" href="tel:+919990959440">{labels.consultation}<ArrowUpRight size={17} /></a>
        </div>
        <div className="care-region-hero-art" role="img" aria-label={visual.imageAlt[locale]}>
          <Image src={visual.image} alt="" fill priority sizes="(max-width: 900px) 85vw, 40vw" className="care-region-hero-image" />
          <div className="care-region-photo-shade" />
          <div className="care-region-art-label"><strong>{location.name}</strong><span>{visual.caption[locale]}</span></div>
        </div>
        <Link className="care-language-switch" href={getLocationHref(locationSlug, oppositeLocale)} hrefLang={oppositeLocale}>
          {labels.language}
        </Link>
      </section>

      <section className="care-treatment-section" aria-labelledby="care-treatment-heading">
        <div className="care-content-wrap">
          <div className="care-section-heading">
            <div>
              <span className="care-section-kicker">{location.name}</span>
              <h2 id="care-treatment-heading">{labels.chooseTreatment}</h2>
              <p>{labels.chooseTreatmentDescription}</p>
            </div>
            <Link href={locale === "hi" ? "/hi/locations" : "/locations"} className="care-text-link">{labels.browse}</Link>
          </div>

          <div className="care-treatment-grid">
            {treatmentLandings.map((treatment) => {
              const copy = treatment[locale];
              return (
                <Link className="care-treatment-card" href={getTreatmentHref(treatment.slug, locationSlug, locale)} key={treatment.slug}>
                  <div className="care-treatment-card-image">
                    <Image src={treatment.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                    <span>{copy.category}</span>
                  </div>
                  <div className="care-treatment-card-body">
                    <h3>{copy.label}</h3>
                    <p>{copy.summary}</p>
                    <span className="care-card-open">{locale === "hi" ? "जानकारी देखें" : "Explore treatment"}<ArrowUpRight size={16} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
