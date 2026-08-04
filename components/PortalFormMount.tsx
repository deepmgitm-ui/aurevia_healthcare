"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ContactForm from "@/components/ContactForm";

export default function PortalFormMount() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const targetNode = document.getElementById("react-contact-form-portal");
  if (!targetNode) {
    return null;
  }

  return createPortal(<ContactForm />, targetNode);
}
