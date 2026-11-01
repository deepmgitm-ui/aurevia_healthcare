"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
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

function googleMapsUrl(location: CoverageLocation) {
  const [latitude, longitude] = location.coordinates;
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export default function IndiaCoverageMap({ locale = "en" }: { locale?: LandingLocale }) {
  const isHindi = locale === "hi";
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, LeafletMarker>>({});
  const [activeSlug, setActiveSlug] = useState("delhi-ncr");

  const activeLocation = coverageLocations.find(({ slug }) => slug === activeSlug) ?? coverageLocations[1];

  useEffect(() => {
    let disposed = false;

    async function initializeMap() {
      if (!mapElementRef.current || mapRef.current) return;

      const L = await import("leaflet");
      if (disposed || !mapElementRef.current) return;

      const map = L.map(mapElementRef.current, {
        center: [22.8, 76.8],
        zoom: 5,
        minZoom: 4,
        maxZoom: 13,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds = L.latLngBounds([]);

      coverageLocations.forEach((location) => {
        const icon = L.divIcon({
          className: "coverage-map-marker-shell",
          html: `<span class="coverage-map-marker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span>`,
          iconSize: [34, 40],
          iconAnchor: [17, 38],
          popupAnchor: [0, -36],
        });

        const marker = L.marker(location.coordinates, {
          icon,
          title: isHindi ? `${location.name} में Aurevia की देखभाल` : `Aurevia coverage in ${location.name}`,
          riseOnHover: true,
        }).addTo(map);

        marker.bindTooltip(location.name, {
          direction: "top",
          offset: [0, -12],
          className: "coverage-map-tooltip",
        });

        marker.bindPopup(
          `<div class="coverage-map-popup">
            <span>${isHindi ? "Aurevia सेवा क्षेत्र" : "Aurevia service region"}</span>
            <strong>${location.name}</strong>
            <small>${location.summary[locale]}</small>
            <a href="${googleMapsUrl(location)}" target="_blank" rel="noopener noreferrer">${isHindi ? "Google Maps में देखें ↗" : "Open in Google Maps ↗"}</a>
          </div>`,
          { closeButton: false, minWidth: 210 },
        );

        marker.on("click", () => setActiveSlug(location.slug));
        markersRef.current[location.slug] = marker;
        bounds.extend(location.coordinates);
      });

      map.fitBounds(bounds, { padding: [56, 56], maxZoom: 5 });
      mapRef.current = map;

      window.setTimeout(() => map.invalidateSize(), 100);
    }

    void initializeMap();

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  const focusLocation = (location: CoverageLocation) => {
    setActiveSlug(location.slug);
    const map = mapRef.current;
    const marker = markersRef.current[location.slug];
    if (!map || !marker) return;

    map.flyTo(location.coordinates, Math.max(map.getZoom(), 7), { duration: 0.75 });
    window.setTimeout(() => marker.openPopup(), 420);
  };

  const resetIndiaView = async () => {
    const map = mapRef.current;
    if (!map) return;
    const L = await import("leaflet");
    const bounds = L.latLngBounds(coverageLocations.map(({ coordinates }) => coordinates));
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 5, animate: true });
    map.closePopup();
  };

  return (
    <section className="map-wrap coverage-map-section" aria-labelledby="coverage-map-title">
      <div className="wrap">
        <div className="coverage-map-shell">
          <div className="coverage-map-stage">
            <div className="coverage-map-badge"><span /> {isHindi ? "सक्रिय सेवा नेटवर्क" : "Live service network"}</div>
            <button type="button" className="coverage-map-reset" onClick={() => void resetIndiaView()}>
              <Navigation size={14} /> {isHindi ? "पूरा भारत देखें" : "View all India"}
            </button>
            <div ref={mapElementRef} className="coverage-map-canvas" aria-label={isHindi ? "भारत में Aurevia सेवा क्षेत्रों का नक्शा" : "Interactive map of Aurevia service regions in India"} />
          </div>

          <aside className="coverage-map-panel">
            <div className="coverage-map-panel-heading">
              <span>{isHindi ? "9 सक्रिय क्षेत्र" : "9 active regions"}</span>
              <h2 id="coverage-map-title">{isHindi ? "भारत में देखभाल" : "Care across India."}</h2>
              <p>{isHindi ? "नक्शे पर क्षेत्र चुनें और वहाँ उपलब्ध उपचार देखें।" : "Select a region to locate it on the map and explore Aurevia’s care network."}</p>
            </div>

            <div className="coverage-region-list" aria-label={isHindi ? "Aurevia सेवा क्षेत्र" : "Aurevia service regions"}>
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

