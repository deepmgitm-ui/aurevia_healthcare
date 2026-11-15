"use client";

import { useEffect } from "react";

export default function SpecialtyStripControls({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const heading = document.querySelector<HTMLElement>(".aurevia-page-index .specialties-heading");
    const track = document.querySelector<HTMLElement>(".aurevia-page-index .marquee-track");
    if (!heading || !track) return;

    const controls = document.createElement("div");
    controls.className = "specialties-controls";
    controls.setAttribute("aria-label", "Browse treatment specialties");
    controls.innerHTML = `<button type="button" aria-label="Show previous specialties"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 18-6-6 6-6"/></svg></button><button type="button" aria-label="Show more specialties"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 18 6-6-6-6"/></svg></button>`;
    const [previous, next] = Array.from(controls.querySelectorAll<HTMLButtonElement>("button"));
    const update = () => { const max = track.scrollWidth - track.clientWidth; previous.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft >= max - 2; };
    previous.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.9, behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.9, behavior: "smooth" }));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    heading.append(controls);
    update();
    return () => { track.removeEventListener("scroll", update); window.removeEventListener("resize", update); controls.remove(); };
  }, [active]);

  return null;
}
