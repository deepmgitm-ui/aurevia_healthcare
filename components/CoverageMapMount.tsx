"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import IndiaCoverageMap from "./IndiaCoverageMap";

export default function CoverageMapMount() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;
  const portal = document.getElementById("react-coverage-map-portal");
  return portal ? createPortal(<IndiaCoverageMap />, portal) : null;
}

