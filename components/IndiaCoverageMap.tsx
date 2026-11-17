"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, ExternalLink, MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import type { LandingLocale } from "@/lib/locationLandingData";

type CoverageLocation = {
  name: string;
  slug: string;
  coordinates: [number, number];
  summary: Record<LandingLocale, string>;
};

const coverageLocations: CoverageLocation[] = [
  { name: "Chandigarh", slug: "chandigarh", coordinates: [30.7333, 76.7794], summary: { en: "North India care coordination", hi: "उत्तर भारत में देखभाल समन्वय" } },
  { name: "Delhi NCR", slug: "delhi-ncr", coordinates: [28.7041, 77.1025], summary: { en: "Flagship multi-specialty network", hi: "प्रमुख मल्टी-स्पेशियलिटी नेटवर्क" } },
  { name: "Ghaziabad", slug: "ghaziabad", coordinates: [28.6692, 77.4538], summary: { en: "General and day-care pathways", hi: "जनरल और डे-केयर उपचार विकल्प" } },
  { name: "Noida", slug: "noida", coordinates: [28.5355, 77.391], summary: { en: "Eye, ENT and surgical care", hi: "आँख, ईएनटी और सर्जिकल देखभाल" } },
  { name: "Mumbai", slug: "mumbai", coordinates: [19.076, 72.8777], summary: { en: "Advanced specialty network", hi: "विशेषज्ञ उपचारों का नेटवर्क" } },
  { name: "Bengaluru", slug: "bangalore", coordinates: [12.9716, 77.5946], summary: { en: "Regional specialist and surgical care", hi: "क्षेत्रीय विशेषज्ञ और सर्जिकल देखभाल" } },
  { name: "Pune", slug: "pune", coordinates: [18.5204, 73.8567], summary: { en: "Planned surgical coordination", hi: "नियोजित सर्जरी के लिए देखभाल समन्वय" } },
  { name: "Telangana", slug: "telangana", coordinates: [17.385, 78.4867], summary: { en: "Regional specialist access", hi: "क्षेत्रीय विशेषज्ञों तक पहुँच" } },
  { name: "Ahmedabad", slug: "ahmedabad", coordinates: [23.0225, 72.5714], summary: { en: "Western India care network", hi: "पश्चिम भारत में देखभाल नेटवर्क" } },
];

const indiaMapCenter: [number, number] = [20.5937, 78.9629];
const indiaMapPixels = 256 * 2 ** 4;
const markerOffsets: Record<string, [number, number]> = {
  "delhi-ncr": [-10, -10],
  ghaziabad: [10, -6],
  noida: [10, 9],
  mumbai: [-12, 9],
  pune: [12, -9],
};
const markerLabelOffsets: Record<string, number> = { "delhi-ncr": -14, ghaziabad: 0, noida: 14, mumbai: 8, pune: -8 };

function mapMarkerPosition([latitude, longitude]: [number, number], slug: string): CSSProperties {
  const mercatorY = (value: number) => Math.log(Math.tan(Math.PI / 4 + (value * Math.PI) / 360));
  const [offsetX, offsetY] = markerOffsets[slug] ?? [0, 0];
  const left = (longitude - indiaMapCenter[1]) * (indiaMapPixels / 360) + offsetX;
  const top = -((mercatorY(latitude) - mercatorY(indiaMapCenter[0])) * (indiaMapPixels / (2 * Math.PI))) + offsetY;
  return {
    left: `calc(50% + ${left.toFixed(1)}px)`,
    top: `calc(50% + ${top.toFixed(1)}px)`,
    "--marker-line-length": `${Math.hypot(offsetX, offsetY).toFixed(1)}px`,
    "--marker-line-angle": `${Math.atan2(-offsetY, -offsetX)}rad`,
    "--marker-label-y": `${markerLabelOffsets[slug] ?? 0}px`,
  } as CSSProperties;
}

function googleMapsUrl(location: CoverageLocation) {
  const [latitude, longitude] = location.coordinates;
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export default function IndiaCoverageMap({ locale = "en" }: { locale?: LandingLocale }) {
  const isHindi = locale === "hi";
  const [activeSlug, setActiveSlug] = useState("delhi-ncr");
  const activeLocation = coverageLocations.find(({ slug }) => slug === activeSlug) ?? coverageLocations[1];
  const focusLocation = (location: CoverageLocation) => setActiveSlug(location.slug);
  const mapQuery = new URLSearchParams({ q: "India", z: "4", output: "embed", hl: locale, gl: "in" });

  return (
    <section className="map-wrap coverage-map-section" aria-labelledby="coverage-map-title">
      <div className="wrap">
        <div className="coverage-map-shell">
          <div className="coverage-map-stage">
            <div className="coverage-map-badge"><span /> Google Maps · {isHindi ? "भारत" : "India"}</div>
            <div className="coverage-map-hint"><Navigation size={14} /> {isHindi ? "पिन दबाकर स्थान खोलें" : "Tap a pin to open its location"}</div>
            <div className="coverage-map-canvas" role="group" aria-label={isHindi ? "भारत में Aurevia सेवा क्षेत्रों का नक्शा" : "Aurevia care regions across India"}>
              <iframe
                className="coverage-google-map"
                src={`https://maps.google.com/maps?${mapQuery.toString()}`}
                title={isHindi ? "पूरा भारत और Aurevia सेवा क्षेत्र — Google Maps" : "India and Aurevia care regions on Google Maps"}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div className="coverage-map-markers">
                {coverageLocations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`${isHindi ? "/hi" : ""}/locations/${location.slug}`}
                    className={`coverage-map-marker${location.slug === activeSlug ? " active" : ""}${location.slug === "mumbai" ? " label-left" : ""}`}
                    style={mapMarkerPosition(location.coordinates, location.slug)}
                    aria-label={isHindi ? `${location.name} का location page खोलें` : `Open ${location.name} location page`}
                    title={location.name}
                    onFocus={() => setActiveSlug(location.slug)}
                  >
                    <MapPin size={15} aria-hidden="true" /> <span>{location.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="coverage-map-panel">
            <div className="coverage-map-panel-heading">
              <span>{isHindi ? "9 सक्रिय क्षेत्र" : "9 active regions"}</span>
              <h2 id="coverage-map-title">{isHindi ? "भारत में देखभाल" : "Care across India."}</h2>
              <p>{isHindi ? "नक्शे पर क्षेत्र चुनें और वहाँ उपलब्ध उपचार देखें।" : "Choose a region to explore the care and treatment options available there."}</p>
            </div>

            <div className="coverage-region-list" aria-label={isHindi ? "Aurevia सेवा क्षेत्र" : "Aurevia care regions"}>
              {coverageLocations.map((location, index) => (
                <button
                  key={location.slug}
                  type="button"
                  className={location.slug === activeSlug ? "active" : ""}
                  onClick={() => focusLocation(location)}
                  aria-pressed={location.slug === activeSlug}
                >
                  <span className="coverage-region-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="coverage-region-name">{location.name}</span>
                  <MapPin size={15} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="coverage-active-card" aria-live="polite">
              <div>
                <span>{isHindi ? "चुना हुआ क्षेत्र" : "Selected region"}</span>
                <strong>{activeLocation.name}</strong>
                <p>{activeLocation.summary[locale]}</p>
              </div>
              <a href={googleMapsUrl(activeLocation)} target="_blank" rel="noopener noreferrer">
                {isHindi ? "Google Maps में देखें" : "Open in Google Maps"} <ExternalLink size={14} />
              </a>
              <Link href={`/locations/${activeLocation.slug}`} className="coverage-region-explore">
                {isHindi ? "उपचार देखें" : "Explore treatments"} <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
