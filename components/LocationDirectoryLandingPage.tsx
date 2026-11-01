import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteLocations } from "@/lib/siteLocations";
import { getLandingCopy, getLocationHref, type LandingLocale } from "@/lib/locationLandingData";
import IndiaCoverageMap from "@/components/IndiaCoverageMap";

export default function LocationDirectoryLandingPage({ locale }: { locale: LandingLocale }) {
  const labels = getLandingCopy(locale);
  return (
    <main className={`care-landing ${locale === "hi" ? "care-landing-hi" : ""}`} lang={locale === "hi" ? "hi" : "en"}>
      <section className="care-region-hero care-directory-hero">
        <div className="care-region-hero-copy">
          <div className="care-region-kicker"><MapPin size={15} /> Aurevia Healthcare</div>
          <h1>{locale === "hi" ? "अपना क्षेत्र चुनें" : "Choose your region"}</h1>
          <p>{locale === "hi" ? "अपने क्षेत्र में उपलब्ध उपचारों को देखने के लिए स्थान चुनें।" : "Choose a region to explore the treatments listed for your area."}</p>
        </div>
        <Link className="care-language-switch" href={locale === "hi" ? "/locations" : "/hi/locations"} hrefLang={locale === "hi" ? "en" : "hi"}>
          {locale === "hi" ? "English" : "हिन्दी"}
        </Link>
      </section>
      <IndiaCoverageMap locale={locale} />
      <section className="care-treatment-section">
        <div className="care-content-wrap">
          <div className="care-section-heading"><div><span className="care-section-kicker">{labels.locations}</span><h2>{locale === "hi" ? "भारत में हमारी देखभाल" : "Care across our regions"}</h2></div></div>
          <div className="care-location-grid">
            {siteLocations.map((location) => (
              <Link href={getLocationHref(location.slug, locale)} key={location.slug} className="care-location-card">
                <span className="care-location-pin"><MapPin size={18} /></span>
                <span><strong>{location.name}</strong><small>{locale === "hi" ? "उपचार देखें" : "Explore treatments"}</small></span>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
