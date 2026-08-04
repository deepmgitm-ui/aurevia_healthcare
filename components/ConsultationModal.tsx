"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (window as any).openConsultationModal = () => {
      setIsOpen(true);
      document.body.classList.add("consult-modal-open");
    };
    (window as any).closeConsultationModal = () => {
      setIsOpen(false);
      document.body.classList.remove("consult-modal-open");
    };
    return () => {
      (window as any).openConsultationModal = undefined;
      (window as any).closeConsultationModal = undefined;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        (window as any).closeConsultationModal?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => (window as any).closeConsultationModal?.()}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* data-lenis-prevent="true" lagaya gaya hai scroll kaam karne ke liye */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white z-10 max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            data-lenis-prevent="true"
          >
            <button
              onClick={() => (window as any).closeConsultationModal?.()}
              className="absolute top-6 right-6 z-20 bg-white/80 hover:bg-white text-gray-800 hover:text-black p-2 rounded-full border border-gray-200/50 shadow-md transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="mt-0">
              <ContactForm plain={true} layout="wide" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}