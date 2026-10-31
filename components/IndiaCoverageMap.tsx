"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

type CoverageLocation = {
  name: string;
  slug: string;
  coordinates: [number, number];
  summary: string;
};

const coverageLocations: CoverageLocation[] = [
  { name: "Chandigarh", slug: "chandigarh", coordinates: [30.7333, 76.7794], summary: "North India care coordination" },
  { name: "Delhi NCR", slug: "delhi-ncr", coordinates: [28.7041, 77.1025], summary: "Flagship multi-specialty network" },
  { name: "Ghaziabad", slug: "ghaziabad", coordinates: [28.6692, 77.4538], summary: "General and day-care pathways" },
  { name: "Noida", slug: "noida", coordinates: [28.5355, 77.391], summary: "Eye, ENT and surgical care" },
  { name: "Mumbai", slug: "mumbai", coordinates: [19.076, 72.8777], summary: "Advanced specialty network" },
  { name: "Pune", slug: "pune", coordinates: [18.5204, 73.8567], summary: "Planned surgical coordination" },
  { name: "Telangana", slug: "telangana", coordinates: [17.385, 78.4867], summary: "Regional specialist access" },
  { name: "Ahmedabad", slug: "ahmedabad", coordinates: [23.0225, 72.5714], summary: "Western India care network" },
];

function googleMapsUrl(location: CoverageLocation) {
  const [latitude, longitude] = location.coordinates;
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export default function IndiaCoverageMap() {
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

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      const bounds = L.latLngBounds([]);

      coverageLocations.forEach((location) => {
        const icon = L.divIcon({
          className: "coverage-map-marker-shell",
          html: `<span class="coverage-map-marker"><span></span></span>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });

        const marker = L.marker(location.coordinates, {
          icon,
          title: `Aurevia coverage in ${location.name}`,
          riseOnHover: true,
        }).addTo(map);

        marker.bindTooltip(location.name, {
          direction: "top",
          offset: [0, -12],
          className: "coverage-map-tooltip",
        });

        marker.bindPopup(
          `<div class="coverage-map-popup">
            <span>Aurevia service region</span>
            <strong>${location.name}</strong>
            <small>${location.summary}</small>
            <a href="${googleMapsUrl(location)}" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
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
            <div className="coverage-map-badge"><span /> Live service network</div>
            <button type="button" className="coverage-map-reset" onClick={() => void resetIndiaView()}>
              <Navigation size={14} /> View all India
            </button>
            <div ref={mapElementRef} className="coverage-map-canvas" aria-label="Interactive map of Aurevia service regions in India" />
          </div>

          <aside className="coverage-map-panel">
            <div className="coverage-map-panel-heading">
              <span>8 active regions</span>
              <h2 id="coverage-map-title">Care across India.</h2>
              <p>Select a region to locate it on the map and explore Aurevia&apos;s care network.</p>
            </div>

            <div className="coverage-region-list" aria-label="Aurevia service regions">
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
                <span>Selected region</span>
                <strong>{activeLocation.name}</strong>
                <p>{activeLocation.summary}</p>
              </div>
              <a href={googleMapsUrl(activeLocation)} target="_blank" rel="noopener noreferrer">
                Open in Google Maps <ExternalLink size={14} />
              </a>
              <Link href={`/locations/${activeLocation.slug}`} className="coverage-region-explore">
                Explore treatments <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

