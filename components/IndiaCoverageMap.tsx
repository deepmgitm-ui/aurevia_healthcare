"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import type { LandingLocale } from "@/lib/locationLandingData";
import type { Map as LeafletMap } from "leaflet";

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

const indiaBounds: [[number, number], [number, number]] = [[6.5, 68], [37.5, 97.5]];

function googleMapsUrl(location: CoverageLocation) {
  const [latitude, longitude] = location.coordinates;
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export default function IndiaCoverageMap({ locale = "en" }: { locale?: LandingLocale }) {
  const isHindi = locale === "hi";
  const [activeSlug, setActiveSlug] = useState("delhi-ncr");
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const activeLocation = coverageLocations.find(({ slug }) => slug === activeSlug) ?? coverageLocations[1];
  const focusLocation = (location: CoverageLocation) => {
    setActiveSlug(location.slug);
    mapInstance.current?.flyTo(location.coordinates, 8, { duration: 0.65 });
  };

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | undefined;

    void import("leaflet").then((L) => {
      if (cancelled || !mapElement.current) return;
      map = L.map(mapElement.current, { zoomControl: false, scrollWheelZoom: false, minZoom: 4, maxZoom: 12 });
      mapInstance.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(map);
      L.control.zoom({ position: "bottomright" }).addTo(map);
      map.fitBounds(indiaBounds, { padding: [24, 24], maxZoom: 5 });

      coverageLocations.forEach((location) => {
        const icon = L.divIcon({
          className: "coverage-leaflet-icon",
          html: '<span class="coverage-leaflet-pin"><span></span></span>',
          iconSize: [30, 38],
          iconAnchor: [15, 34],
          tooltipAnchor: [12, -19],
        });
        const marker = L.marker(location.coordinates, { icon, title: location.name, alt: `Open ${location.name} location page`, keyboard: true }).addTo(map!);
        marker.bindTooltip(location.name, { permanent: true, direction: location.slug === "mumbai" ? "left" : "right", className: "coverage-location-tooltip" });
        marker.on("click", () => {
          window.location.href = `${isHindi ? "/hi" : ""}/locations/${location.slug}/`;
        });
      });
    });

    return () => {
      cancelled = true;
      map?.remove();
      if (mapInstance.current === map) mapInstance.current = null;
    };
  }, [isHindi]);

  const resetMap = () => mapInstance.current?.fitBounds(indiaBounds, { padding: [24, 24], maxZoom: 5, animate: true });

  return (
    <section className="map-wrap coverage-map-section" aria-labelledby="coverage-map-title">
      <div className="wrap">
        <div className="coverage-map-shell">
          <div className="coverage-map-stage">
            <div className="coverage-map-badge"><span /> OpenStreetMap · {isHindi ? "भारत" : "India"}</div>
            <div className="coverage-map-hint"><Navigation size={14} /> {isHindi ? "पिन दबाकर स्थान खोलें" : "Tap a pin to open its location"}</div>
            <div className="coverage-map-canvas" role="application" aria-label={isHindi ? "भारत में Aurevia सेवा क्षेत्रों का interactive नक्शा" : "Interactive map of Aurevia care regions across India"}>
              <div ref={mapElement} className="coverage-leaflet-map" />
              <button className="coverage-map-reset" type="button" onClick={resetMap}>{isHindi ? "पूरा भारत" : "Show all India"}</button>
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
              <a href={`https://www.openstreetmap.org/?mlat=${activeLocation.coordinates[0]}&mlon=${activeLocation.coordinates[1]}#map=8/${activeLocation.coordinates[0]}/${activeLocation.coordinates[1]}`} target="_blank" rel="noopener noreferrer">
                {isHindi ? "OpenStreetMap में देखें" : "Open in OpenStreetMap"} <ExternalLink size={14} />
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
