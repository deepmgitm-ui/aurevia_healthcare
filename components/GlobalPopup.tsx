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
            className="consultation-popup-backdrop fixed inset-0 bg-[#173344]/55 backdrop-blur-[2px] cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} transition={{ type: "spring", duration: 0.4 }}
            className="consultation-popup-card relative w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden font-urbanist z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-popup-title"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-[#edf4f3] text-[#60737a] hover:text-[#174e63] transition-all duration-200 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} className="stroke-[2.5]" />
            </button>

            <div className="consultation-popup-header px-6 py-5 sm:px-7 sm:py-5 text-left shrink-0">
              <h3 id="consultation-popup-title" className="text-lg sm:text-xl font-semibold mb-1 font-urbanist tracking-tight">{isHindi ? "निःशुल्क परामर्श बुक करें" : "Book a free consultation"}</h3>
              <p className="consultation-popup-subtitle text-xs sm:text-sm">{isHindi ? "हमारी केयर टीम आपका अगला कदम तय करने में मदद करेगी।" : "Our care team will help you plan the next step."}</p>
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
