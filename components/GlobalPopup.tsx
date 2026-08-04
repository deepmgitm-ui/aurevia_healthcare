"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

export default function GlobalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("consult-modal-open");
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("consult-modal-open");
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => { openModal(); }, 5000);
    const intervalTimer = setInterval(() => { openModal(); }, 90000);
    return () => { clearTimeout(initialTimer); clearInterval(intervalTimer); };
  }, [openModal]);

  useEffect(() => {
    (window as any).openConsultationModal = openModal;
    (window as any).closeConsultationModal = closeModal;
    return () => {
      (window as any).openConsultationModal = undefined;
      (window as any).closeConsultationModal = undefined;
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
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 md:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden font-urbanist z-10"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white hover:text-red-300 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={20} className="stroke-[2.5]" />
            </button>

            <div className="bg-gradient-to-r from-[#03045E] to-[#0077B6] px-5 py-5 sm:p-6 text-center text-white shrink-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 font-urbanist tracking-tight">Request Free Consultation</h3>
              <p className="text-[#90E0EF] text-xs sm:text-sm font-medium">Expert medical advice is just a click away · Confidential & Fast</p>
            </div>

            {/* Yaha data-lenis-prevent="true" aur overscroll-contain add kiya hai scroll ke liye */}
            <div
              className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 overscroll-contain"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(3, 4, 94, 0.2) transparent" }}
              data-lenis-prevent="true"
            >
              <ContactForm layout="wide" plain={true} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}