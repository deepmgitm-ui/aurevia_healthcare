// {
// type: file_content_new
// fileName: code thik/app/services/[slug]/ServiceClient.tsx
// }

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- FULL DATA STRUCTURE ---
const serviceDetails: Record<string, any> = {
  "lasik": { 
    title: "LASIK Treatment", 
    category: "Eye Care",
    bgImage: "/treatments/lasik-bg.webp",
    icon: "/services/lasik_02.webp",
    overview: "LASIK (Laser-Assisted In Situ Keratomileusis) is a popular refractive surgery that corrects vision problems...",
    procedure: "The procedure involves creating a thin flap in the cornea using a femtosecond laser...",
    benefits: ["Immediate vision improvement.", "Freedom from glasses.", "Pain-free procedure."],
    eligibility: "Suitable for adults over 18 with stable vision.",
    recovery: "Most patients notice improved vision within 24 hours."
  },
  "cataract": { 
    title: "Cataract Surgery", 
    category: "Eye Care",
    bgImage: "/treatments/cataract-bg.webp",
    icon: "/services/cataract_02.webp",
    overview: "Cataract surgery involves removing the clouded lens of the eye...",
    procedure: "The surgeon makes a tiny incision in the eye and uses ultrasound...",
    benefits: ["Restores clear vision.", "Improves quality of life.", "Short procedure."],
    eligibility: "Recommended for individuals whose vision is significantly impaired.",
    recovery: "Vision improves within a few days."
  },
  "sinus": { 
    title: "Sinus Treatment", 
    category: "ENT",
    bgImage: "/treatments/sinus-bg.webp",
    icon: "/services/sinus_02.webp",
    overview: "FESS (Functional Endoscopic Sinus Surgery) is a minimally invasive procedure...",
    procedure: "Using a thin endoscope inserted through the nostrils...",
    benefits: ["Relief from chronic headaches.", "Improved breathing.", "Reduction in sinus infections."],
    eligibility: "Patients with chronic sinusitis.",
    recovery: "Mild congestion is common for a week."
  },
  "tonsillectomy": { 
    title: "Tonsillectomy", 
    category: "ENT",
    bgImage: "/treatments/tonsil-bg.jpg", 
    icon: "/services/tonsil_02.PNG", 
    overview: "Tonsillectomy is the surgical removal of the tonsils...",
    procedure: "The surgeon removes the tonsils using a scalpel or specialized tool...",
    benefits: ["Eliminates recurrent throat infections.", "Resolves breathing problems.", "Better sleep quality."],
    eligibility: "Children or adults with frequent tonsillitis.",
    recovery: "Throat pain is common for 1-2 weeks."
  },
  "septoplasty": { 
    title: "Septoplasty", 
    category: "ENT",
    bgImage: "/treatments/septoplasty-bg.jpg", 
    icon: "/services/septoplasty_02.PNG", 
    overview: "Septoplasty is a corrective surgical procedure to straighten a deviated nasal septum...",
    procedure: "The surgeon works through the nostrils to trim, reposition cartilage...",
    benefits: ["Significantly improved breathing.", "Reduced snoring.", "Fewer sinus infections."],
    eligibility: "Individuals with a deviated septum causing difficulty breathing.",
    recovery: "Swelling subsides in a week."
  },
  "ear-perforation": { 
    title: "Ear Perforation Repair", 
    category: "ENT",
    bgImage: "/treatments/ear-bg.jpg", 
    icon: "/services/ear_02.PNG", 
    overview: "Tympanoplasty is the surgical repair of a perforated eardrum...",
    procedure: "A graft (tissue patch) is taken from the patient's ear or scalp...",
    benefits: ["Restores hearing loss.", "Prevents water entering ear.", "Reduces infections."],
    eligibility: "Patients with a ruptured eardrum.",
    recovery: "Full hearing improvement after 6-8 weeks."
  },
  "rhinoplasty": { 
    title: "Rhinoplasty", 
    category: "Aesthetics",
    bgImage: "/treatments/rhinoplasty-bg.jpg", 
    icon: "/services/rhinoplasty_02.PNG", 
    overview: "Rhinoplasty, commonly known as a nose job, is surgery to change the shape of the nose...",
    procedure: "The surgeon makes incisions inside the nostrils or across the base...",
    benefits: ["Enhanced facial harmony.", "Correction of birth defects.", "Improved breathing."],
    eligibility: "Individuals with fully grown facial bones.",
    recovery: "Splints are worn for a week."
  },
  "gynecomastia": { 
    title: "Gynecomastia Surgery", 
    category: "Aesthetics",
    bgImage: "/treatments/gynecomastia-bg.jpg", 
    icon: "/services/gynecomastia_02.webp",
    overview: "Male breast reduction surgery treats gynecomastia...",
    procedure: "Liposuction is used to remove excess fat...",
    benefits: ["Flatter chest contour.", "Boost in self-confidence.", "Permanent removal."],
    eligibility: "Men with persistent enlarged breasts.",
    recovery: "Compression garments worn for a few weeks."
  },
  "kidney-stone": { 
    title: "Kidney Stone Removal", 
    category: "Urology",
    bgImage: "/treatments/kidney-bg.jpg", 
    icon: "/services/kidney_02.PNG", 
    overview: "Advanced treatments like RIRS and PCNL are used to remove kidney stones...",
    procedure: "For RIRS, a flexible scope is passed through the urethra...",
    benefits: ["Immediate relief from pain.", "Minimally invasive.", "High success rate."],
    eligibility: "Patients with large stones.",
    recovery: "Hospital stay is 1-2 days."
  },
  "dental": { 
    title: "Dental Treatments", 
    category: "Dental",
    bgImage: "/treatments/dental-bg.jpg", 
    icon: "/services/dental_02.PNG", 
    overview: "Comprehensive dental care includes implants, root canals...",
    procedure: "Varies by treatment. Implants involve placing a titanium post...",
    benefits: ["Restores ability to chew.", "Eliminates tooth pain.", "Enhances smile."],
    eligibility: "Anyone with tooth decay or missing teeth.",
    recovery: "Varies by procedure."
  },
};

export default function ServiceClient() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = serviceDetails[slug];
  const [activeTab, setActiveTab] = useState("overview");

  if (!service) return <div className="py-40 text-center text-2xl font-bold bg-white min-h-screen">Service Not Found</div>;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "procedure", label: "Procedure" },
    { id: "benefits", label: "Benefits" },
    { id: "eligibility", label: "Eligibility" },
    { id: "recovery", label: "Recovery" },
  ];

  return (
    <main className="relative min-h-screen bg-gray-50">
      <div className="relative h-[60vh] flex items-center justify-center">
        <Image src={service.bgImage} alt={service.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }} 
             animate={{ opacity: 1, scale: 1 }}
             className="inline-block mb-6 bg-white/20 backdrop-blur-md p-4 rounded-3xl"
           >
             <Image src={service.icon} alt="Icon" width={80} height={80} className="object-contain drop-shadow-lg" />
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">{service.title}</h1>
           <p className="mt-4 text-xl text-white/90 font-medium tracking-wide">{service.category}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-5 px-4 text-sm md:text-lg font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-[#147D86] text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50 hover:text-[#147D86]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-8 md:p-12 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 capitalize">{activeTab}</h2>
                {activeTab === "benefits" ? (
                  <ul className="grid gap-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
                        <span className="text-green-500 font-bold text-xl">✓</span>
                        <span className="text-gray-700 font-medium text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed whitespace-pre-line">
                    {service[activeTab]}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* BOTTOM CONTACT SECTION */}
          <div className="bg-gray-50 p-8 flex flex-col md:flex-row gap-6 justify-center items-center border-t">
             <p className="font-semibold text-gray-500">Have questions about this procedure?</p>
             <div className="flex gap-4">
               <a href="tel:+919990959440" className="bg-[#147D86] text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform">Call Expert</a>
               <a href="https://wa.me/919990959440" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform">WhatsApp</a>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
