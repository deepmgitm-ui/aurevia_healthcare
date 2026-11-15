"use client";
import { useEffect } from "react";
export default function TreatmentQueryFilter() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("q")?.trim().toLowerCase();
    if (!query) return;
    const links = Array.from(document.querySelectorAll<HTMLElement>(".aurevia-page-treatments .ortho-surgery-link"));
    const categories = Array.from(document.querySelectorAll<HTMLElement>(".aurevia-page-treatments .ortho-category"));
    let count = 0;
    links.forEach((link) => { const matched = (link.textContent ?? "").toLowerCase().includes(query); link.hidden = !matched; if (matched) count += 1; });
    categories.forEach((category) => { category.hidden = !category.querySelector(".ortho-surgery-link:not([hidden])"); });
    const target = document.querySelector(".aurevia-page-treatments .ortho-categories");
    if (target) {
      const status = document.createElement("p");
      status.className = "treatment-search-status";
      status.setAttribute("role", "status");
      status.textContent = count ? count + " matching treatments for: " + query : "No treatment matches: " + query + ". Try another treatment or specialty.";
      target.prepend(status);
      if (!count) categories.forEach((category) => { category.hidden = false; });
    }
  }, []);
  return null;
}
