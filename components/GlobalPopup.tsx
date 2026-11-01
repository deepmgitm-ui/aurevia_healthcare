"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";
import { getLocation, getTreatment } from "@/lib/locationLandingData";

type ConsultationWindow = Window & {
  openConsultationModal?: () => void;
  closeConsultationModal?: () => void;
};

const INITIAL_POPUP_DELAY_MS = 1_000;
const SECOND_POPUP_DELAY_MS = 60_000;
const RECURRING_POPUP_START_MS = SECOND_POPUP_DELAY_MS + 120_000;
const RECURRING_POPUP_INTERVAL_MS = 120_000;

export default function GlobalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHindi = pathname.startsWith("/hi/");
  const routeParts = pathname.split("/").filter(Boolean);
  const servicesIndex = routeParts.indexOf("services");
  const isTreatmentLanding = servicesIndex >= 0 && routeParts.length > servicesIndex + 2;
  const treatmentSlug = isTreatmentLanding ? routeParts[servicesIndex + 1] : "";
  const locationSlug = isTreatmentLanding ? routeParts[servicesIndex + 2] : "";
  const pageLocation = isTreatmentLanding ? getLocation(locationSlug) : undefined;
  const pageTreatment = isTreatmentLanding ? getTreatment(treatmentSlug) : undefined;
  const isCareLanding = pathname === "/hi/locations" || /^\/(?:hi\/)?locations\/[^/]+\/?$/.test(pathname) || /^\/(?:hi\/)?services\/[^/]+\/[^/]+\/?$/.test(pathname);

  const openModal = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("consult-modal-open");
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("consult-modal-open");
  }, []);

  useEffect(() => {
    if (isCareLanding) return;

    const initialTimer = setTimeout(() => {
      openModal();
    }, INITIAL_POPUP_DELAY_MS);

    const secondTimer = setTimeout(() => {
      openModal();
    }, SECOND_POPUP_DELAY_MS);

    let recurringInterval: ReturnType<typeof setInterval> | undefined;
    const recurringStartTimer = setTimeout(() => {
      openModal();
      recurringInterval = setInterval(openModal, RECURRING_POPUP_INTERVAL_MS);
    }, RECURRING_POPUP_START_MS);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondTimer);
      clearTimeout(recurringStartTimer);
      if (recurringInterval) clearInterval(recurringInterval);
    };
  }, [openModal, isCareLanding, isTreatmentLanding]);

  useEffect(() => {
    const consultationWindow = window as ConsultationWindow;
    consultationWindow.openConsultationModal = openModal;
    consultationWindow.closeConsultationModal = closeModal;
    return () => {
      consultationWindow.openConsultationModal = undefined;
      consultationWindow.closeConsultationModal = undefined;
    };
  }, [openModal, closeModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}
            className="fixed inset-0 bg-[#1c302d]/45 backdrop-blur-[3px] cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} transition={{ type: "spring", duration: 0.4 }}
            className="consultation-popup-card relative w-full max-w-xl bg-white rounded-[26px] shadow-2xl flex flex-col overflow-hidden font-urbanist z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-popup-title"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white hover:text-red-300 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={20} className="stroke-[2.5]" />
            </button>

            <div className="consultation-popup-header px-12 py-5 sm:px-14 sm:py-6 text-center text-white shrink-0">
              <span className="consultation-popup-kicker">{isHindi ? "ऑरिया केयर टीम" : "Aurevia care team"}</span>
              <h3 id="consultation-popup-title" className="text-xl sm:text-2xl font-semibold mb-1 font-urbanist tracking-tight">{isHindi ? "निःशुल्क परामर्श का अनुरोध" : "Request a free consultation"}</h3>
              <p className="consultation-popup-subtitle text-xs sm:text-sm">{isHindi ? "जल्दी, गोपनीय और बिना किसी बाध्यता के" : "A calm, confidential conversation about your care"}</p>
            </div>

            <div
              className="p-3 sm:p-5 flex-1"
            >
              <ContactForm
                layout="wide"
                plain={true}
                modalCompact={true}
                initialLocation={pageLocation?.name}
                initialTreatment={pageTreatment?.[isHindi ? "hi" : "en"].label}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
