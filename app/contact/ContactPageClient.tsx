"use client";

import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-blue-50 pt-32 pb-16 px-6 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-urbanist">
            Get in <span className="text-[#4FA6D8]">Touch</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Have questions? Our medical experts are available 24/7 to guide you through your healthcare journey.
          </p>
          <div className="space-y-4">
            <p className="text-gray-800 font-medium">📞 Call us: <a href="tel:+919990959440" className="text-[#4FA6D8] font-bold hover:underline">+91 99909 59440</a></p>
            <p className="text-gray-800 font-medium">💬 WhatsApp: <a href="https://wa.me/919990959440" className="text-green-600 font-bold hover:underline">Chat Now</a></p>
            <p className="text-gray-800 font-medium">Email: <a href="mailto:info@aureviahealthcare.com" className="text-[#4FA6D8] font-bold hover:underline">info@aureviahealthcare.com</a></p>
          </div>
        </div>

        <div className="w-full">
          <ContactForm />
        </div>
      </motion.div>
    </div>
  );
}
