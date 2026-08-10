// {
// type: file_content_new
// fileName: code thik/app/services/[slug]/[location]/LocationClient.tsx
// }

"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { siteLocations } from "@/lib/siteLocations";

// --- DATA ---
const serviceDetails: Record<string, any> = {
  "lasik": { 
    title: "LASIK Treatment", 
    overview: "LASIK is a popular refractive surgery that corrects vision problems...",
    procedure: "The procedure involves creating a thin flap in the cornea...",
    benefits: ["Immediate vision improvement.", "Freedom from glasses.", "Pain-free procedure."],
    eligibility: "Suitable for adults over 18 with stable vision.",
    recovery: "Most patients notice improved vision within 24 hours.",
    icon: "/services/lasik_02.webp",
    bgImage: "/treatments/lasik-bg.webp"
  },
  "cataract": { 
    title: "Cataract Surgery", 
    overview: "Cataract surgery involves removing the clouded lens of the eye...",
    procedure: "The surgeon uses ultrasound waves to break up the cloudy lens...",
    benefits: ["Restores clear vision.", "Improves quality of life.", "Short procedure."],
    eligibility: "Individuals whose vision is significantly impaired.",
    recovery: "Vision improves within a few days.",
    icon: "/services/cataract_02.webp",
    bgImage: "/treatments/cataract-bg.webp"
  },
  "sinus": { 
    title: "Sinus Treatment", 
    overview: "FESS is a minimally invasive procedure...",
    procedure: "Using a thin endoscope inserted through the nostrils...",
    benefits: ["Relief from chronic headaches.", "Improved breathing.", "Reduction in infections."],
    eligibility: "Patients with chronic sinusitis.",
    recovery: "Mild congestion is common for a week.",
    icon: "/services/sinus_02.webp",
    bgImage: "/treatments/sinus-bg.webp"
  },
  "tonsillectomy": { 
    title: "Tonsillectomy", 
    overview: "Tonsillectomy is the surgical removal of the tonsils...",
    procedure: "The surgeon removes the tonsils using a scalpel...",
    benefits: ["Eliminates recurrent throat infections.", "Resolves breathing problems.", "Better sleep quality."],
    eligibility: "Children or adults with frequent tonsillitis.",
    recovery: "Throat pain is common for 1-2 weeks.",
    icon: "/services/tonsil_02.PNG",
    bgImage: "/treatments/tonsil-bg.jpg"
  },
  "septoplasty": { 
    title: "Septoplasty", 
    overview: "Septoplasty is a corrective surgical procedure...",
    procedure: "The surgeon works through the nostrils to trim cartilage...",
    benefits: ["Significantly improved breathing.", "Reduced snoring.", "Fewer sinus infections."],
    eligibility: "Individuals with a deviated septum.",
    recovery: "Swelling subsides in a week.",
    icon: "/services/septoplasty_02.PNG",
    bgImage: "/treatments/septoplasty-bg.jpg"
  },
  "ear-perforation": { 
    title: "Ear Perforation Repair", 
    overview: "Tympanoplasty is the surgical repair of a perforated eardrum...",
    procedure: "A graft is taken from the patient's ear or scalp...",
    benefits: ["Restores hearing loss.", "Prevents water entering ear.", "Reduces infections."],
    eligibility: "Patients with a ruptured eardrum.",
    recovery: "Full hearing improvement after 6-8 weeks.",
    icon: "/services/ear_02.PNG",
    bgImage: "/treatments/ear-bg.jpg"
  },
  "rhinoplasty": { 
    title: "Rhinoplasty", 
    overview: "Rhinoplasty is surgery to change the shape of the nose...",
    procedure: "The surgeon makes incisions inside the nostrils...",
    benefits: ["Enhanced facial harmony.", "Correction of birth defects.", "Improved breathing."],
    eligibility: "Individuals with fully grown facial bones.",
    recovery: "Splints are worn for a week.",
    icon: "/services/rhinoplasty_02.PNG",
    bgImage: "/treatments/rhinoplasty-bg.jpg"
  },
  "gynecomastia": { 
    title: "Gynecomastia Surgery", 
    overview: "Male breast reduction surgery treats gynecomastia...",
    procedure: "Liposuction is used to remove excess fat...",
    benefits: ["Flatter chest contour.", "Boost in self-confidence.", "Permanent removal."],
    eligibility: "Men with persistent enlarged breasts.",
    recovery: "Compression garments worn for a few weeks.",
    icon: "/services/gynecomastia_02.webp",
    bgImage: "/treatments/gynecomastia-bg.jpg"
  },
  "kidney-stone": { 
    title: "Kidney Stone Removal", 
    overview: "Advanced treatments like RIRS and PCNL...",
    procedure: "For RIRS, a flexible scope is passed through the urethra...",
    benefits: ["Immediate relief from pain.", "Minimally invasive.", "High success rate."],
    eligibility: "Patients with large stones.",
    recovery: "Hospital stay is 1-2 days.",
    icon: "/services/kidney_02.PNG",
    bgImage: "/treatments/kidney-bg.jpg"
  },
  "dental": { 
    title: "Dental Treatments", 
    overview: "Comprehensive dental care includes implants...",
    procedure: "Varies by treatment. Implants involve placing a titanium post...",
    benefits: ["Restores ability to chew.", "Eliminates tooth pain.", "Enhances smile."],
    eligibility: "Anyone with tooth decay or missing teeth.",
    recovery: "Varies by procedure.",
    icon: "/services/dental_02.PNG",
    bgImage: "/treatments/dental-bg.jpg"
  },
  
  "default": {
    title: "Specialized Treatment",
    overview: "Advanced medical treatment provided by expert specialists.",
    procedure: "State-of-the-art procedures ensuring safety and quick recovery.",
    benefits: ["High success rate.", "Expert care.", "Affordable pricing."],
    eligibility: "Consult with our doctor to check eligibility.",
    recovery: "Quick recovery with minimal downtime.",
    icon: "/logo-new.png",
    bgImage: "/hero-new.jpg"
  }
};

export default function LocationClient() {
    const params = useParams();
    const slug = params?.slug as string;
    const location = params?.location as string;
    const formattedLocation = siteLocations.find(({ slug: locationSlug }) => locationSlug === location)?.name
      ?? location?.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")
      ?? "India";
    const service = serviceDetails[slug] || serviceDetails["default"];
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "procedure", label: "Procedure" },
        { id: "benefits", label: "Benefits" },
        { id: "eligibility", label: "Eligibility" },
        { id: "recovery", label: "Recovery" },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* HERO SECTION */}
            <section className="relative bg-[#0B485B] text-white overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
                
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
                    
                    {/* Left Text */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <Link href="/contact">
                            <motion.div whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-bold mb-4 cursor-pointer border border-white/30 shadow-lg transition-all">
                                ✨ Need Expert Guidance? Book a Free Consultation »
                            </motion.div>
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Seeking best <span className="text-[#9DDED8]">{service.title}</span> in <span>{formattedLocation}?</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                            Aurevia Healthcare coordinates specialist-led {service.title} guidance and end-to-end support in <span className="font-bold">{formattedLocation}</span> through our care network.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <motion.a whileHover={{ scale: 1.05 }} href="tel:+919990959440" className="bg-[#147D86] text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-[#106872] transition-colors">
                                <Phone size={20} /> Contact Us
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/919990959440" className="bg-white text-[#0B485B] px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-[#E9F7F5] transition-colors">
                                <MessageCircle size={20} /> WhatsApp Now
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.2 }} 
                        className="relative block h-64 md:h-[400px] w-full mt-6 md:mt-0"
                    >
                        <Image 
                            src={service.bgImage || "/hero-new.jpg"} 
                            alt={service.title} 
                            fill 
                            className="object-cover rounded-3xl shadow-2xl border-4 border-white/20" 
                            unoptimized 
                        />
                    </motion.div>
                </div>
            </section>
            
            {/* TABS SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-16 -mt-10 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                    <div className="flex flex-wrap border-b bg-gray-50">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 px-4 text-sm md:text-lg font-bold transition-all ${activeTab === tab.id ? "bg-[#147D86] text-white" : "text-gray-600 hover:text-[#147D86] hover:bg-white"}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="p-8 md:p-12 min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 capitalize flex items-center gap-3">
                                    <Image 
                                      src={service.icon || "/logo-new.png"} 
                                      width={40} 
                                      height={40} 
                                      alt="icon" 
                                      unoptimized
                                      className="object-contain"
                                    />
                                    {activeTab} of {service.title} in {formattedLocation}
                                </h2>
                                {activeTab === "benefits" ? (
                                    <ul className="space-y-4">
                                        {service.benefits?.map((benefit: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3 bg-[#E9F7F5] p-4 rounded-lg border-l-4 border-[#147D86]">
                                                <span className="text-[#147D86] font-bold">✓</span>
                                                <span className="text-gray-700 font-medium">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-lg text-gray-600 leading-relaxed">{service[activeTab]}</p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
}
