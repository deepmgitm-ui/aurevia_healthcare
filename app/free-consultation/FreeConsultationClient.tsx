"use client";

import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";

export default function FreeConsultationClient() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-urbanist">
            Book Your <span className="text-[#147D86]">Free Surgery Consultation</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Talk to experienced surgeons and specialists about LASIK, ENT, urology, aesthetics or dental treatments. No fees, no hidden charges—just honest guidance so you can choose the right procedure.
          </p>
          <ul className="space-y-3 mb-8 text-gray-700 font-medium">
            <li className="flex items-center gap-2">✅ 100% free, no-obligation consultation</li>
            <li className="flex items-center gap-2">✅ Expert Advice from Top Specialists</li>
            <li className="flex items-center gap-2">✅ 24/7 care coordination and support</li>
          </ul>
          <div className="space-y-3 text-gray-800">
            <p className="font-semibold">Prefer to talk directly?</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+919990959440"
                className="inline-flex items-center justify-center rounded-full bg-[#147D86] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#106872] transition-colors"
              >
                Call Our Expert
              </a>
              <a
                href="https://wa.me/919990959440"
                className="inline-flex items-center justify-center rounded-full border border-[#147D86] px-5 py-2 text-sm font-semibold text-[#147D86] hover:bg-[#E9F7F5] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
           <ContactForm />
        </motion.div>

      </div>
    </div>
  );
}
