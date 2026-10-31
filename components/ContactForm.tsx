"use client";

import { useState, useRef, FormEvent } from "react";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Send, Loader2, User, Phone, Activity, ChevronDown, ShieldCheck, MapPin, MessageSquare } from "lucide-react";
import { siteLocationNames } from "@/lib/siteLocations";

const cityOptions = [...siteLocationNames, "Other"];
const treatmentOptions = ["I'm not sure yet", "LASIK", "Cataract", "Sinus", "Tonsillectomy", "Liposuction", "Lipoma", "Rhinoplasty", "Gynecomastia", "Kidney stones", "Orthopedic"];

interface ContactFormProps {
  layout?: "wide" | "compact";
  plain?: boolean;
  modalCompact?: boolean;
}

export default function ContactForm({ layout = "compact", plain = false, modalCompact = false }: ContactFormProps) {
  const pathname = usePathname();
  const isHindi = pathname.startsWith("/hi/");
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Make sure ye credentials tumhare EmailJS account se match karte hain
    const serviceID = "service_99t3hcb";
    const templateID = "template_z1t5gbg";
    const publicKey = "oTUcVeYLoEJEImySX";

    if (formRef.current) {
      emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
        .then(() => {
          setLoading(false);
          setStatus("success");
          formRef.current?.reset();
          setTimeout(() => setStatus("idle"), 5000);
        }, (error) => {
          setLoading(false);
          setStatus("error");
          console.error("FAILED...", error);
        });
    }
  };

  const formElement = (
    <form ref={formRef} onSubmit={sendEmail} className={`healthcare-form space-y-6 w-full ${modalCompact ? "consultation-compact-form" : ""}`}>
      <div className={modalCompact ? "consultation-compact-grid grid grid-cols-2" : layout === "wide" ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" : "space-y-6"}>
        
        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#03045E]/60 font-semibold mb-2 ml-1">{isHindi ? "आपका नाम" : "Your Name"}</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <input type="text" name="user_name" required placeholder={isHindi ? "मरीज़ का नाम लिखें" : "Enter patient's name"} className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F4F8FB] border border-[#03045E]/10 focus:bg-white focus:border-[#03045E] focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-[#03045E] placeholder:text-[#03045E]/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#03045E]/60 font-semibold mb-2 ml-1">{isHindi ? "फ़ोन नंबर" : "Phone Number"}</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <input type="tel" name="user_phone" required placeholder="+91 98765 4XXXX" className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F4F8FB] border border-[#03045E]/10 focus:bg-white focus:border-[#03045E] focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-[#03045E] placeholder:text-[#03045E]/40" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#03045E]/60 font-semibold mb-2 ml-1">{isHindi ? "शहर" : "City"}</label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <select name="user_city" required defaultValue="" className="w-full pl-12 pr-10 py-4 rounded-xl bg-[#F4F8FB] border border-[#03045E]/10 focus:bg-white focus:border-[#03045E] focus:ring-4 focus:ring-indigo-100 outline-none transition-all appearance-none text-[#03045E] font-medium cursor-pointer">
              <option value="" disabled>{isHindi ? "शहर चुनें..." : "Select a City..."}</option>
              {cityOptions.map((city, index) => (<option key={index} value={city}>{city === "Other" && isHindi ? "अन्य" : city}</option>))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#03045E]/60 font-semibold mb-2 ml-1">{isHindi ? "रुचि का उपचार" : "Treatment of interest"}</label>
          <div className="relative group">
            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <select name="user_treatment" required defaultValue="" className="w-full pl-12 pr-10 py-4 rounded-xl bg-[#F4F8FB] border border-[#03045E]/10 focus:bg-white focus:border-[#03045E] focus:ring-4 focus:ring-indigo-100 outline-none transition-all appearance-none text-[#03045E] font-medium cursor-pointer">
              <option value="" disabled>{isHindi ? "उपचार चुनें..." : "Select treatment..."}</option>
              {treatmentOptions.map((treatment, index) => {
                const hindiLabels: Record<string, string> = { "I'm not sure yet": "अभी तय नहीं", "LASIK": "लेसिक (LASIK)", "Cataract": "मोतियाबिंद", "Sinus": "साइनस", "Tonsillectomy": "टॉन्सिल सर्जरी", "Liposuction": "लिपोसक्शन", "Lipoma": "लाइपोमा", "Rhinoplasty": "राइनोप्लास्टी", "Gynecomastia": "गाइनेकोमैस्टिया", "Kidney stones": "किडनी स्टोन", "Orthopedic": "ऑर्थोपेडिक" };
                return <option key={index} value={treatment}>{isHindi ? hindiLabels[treatment] ?? treatment : treatment}</option>;
              })}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 pointer-events-none" size={20} />
          </div>
        </div>

        <div className={`space-y-2 ${layout === "wide" ? "md:col-span-2" : ""} ${modalCompact ? "col-span-2" : ""}`}>
          <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#03045E]/60 font-semibold mb-2 ml-1">{isHindi ? "संक्षेप में बताएँ" : "Tell us briefly"}</label>
          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <textarea name="user_message" placeholder={isHindi ? "अपनी समस्या, रिपोर्ट या सवाल के बारे में कुछ पंक्तियाँ लिखें..." : "A few lines about your condition, reports, or questions..."} rows={modalCompact ? 2 : layout === "wide" ? 3 : 4} className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F4F8FB] border border-[#03045E]/10 focus:bg-white focus:border-[#03045E] focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-[#03045E] placeholder:text-[#03045E]/40 resize-y" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} type="submit"
          className="w-full bg-[#03045E] hover:bg-[#023E8A] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-indigo-950/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <><Loader2 className="animate-spin" /> {isHindi ? "भेजा जा रहा है..." : "Processing..."}</> : <><Send size={20} /> {isHindi ? "परामर्श के लिए अनुरोध भेजें" : "Request my consultation"}</>}
        </motion.button>
      </div>

      <div className="flex items-start justify-center gap-2 text-xs text-[#03045E]/60 mt-4 max-w-md mx-auto text-center font-medium leading-relaxed">
        <ShieldCheck size={16} className="text-[#00B5B8] shrink-0 mt-0.5" />
        <span>{isHindi ? "आपकी जानकारी का उपयोग केवल परामर्श तय करने के लिए होगा। आपकी सहमति से पहले इसे अस्पतालों के साथ साझा नहीं किया जाएगा।" : "Your details are used only to set up your consultation. We never share them with hospitals before your consent."}</span>
      </div>

      {status === "success" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-center font-medium flex items-center justify-center gap-2">
          ✅ <span>{isHindi ? "अनुरोध भेज दिया गया! हमारी टीम जल्द आपसे संपर्क करेगी।" : "Request Sent! Our expert will call you shortly."}</span>
        </motion.div>
      )}
      {status === "error" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center font-medium">
          ❌ {isHindi ? "अनुरोध नहीं भेजा जा सका। विवरण जाँचें या हमें सीधे कॉल करें।" : "Failed to send. Please verify your details or call us directly."}
        </motion.div>
      )}
    </form>
  );

  if (plain) return formElement;

  return (
    <div className="relative w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative bg-white/90 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-2xl overflow-hidden"
      >
        <div className="bg-[#0B485B] p-6 text-center text-white">
          <h3 className="text-2xl font-bold mb-2 font-newsreader tracking-tight">{isHindi ? "निःशुल्क परामर्श" : "Request Free Consultation"}</h3>
          <p className="text-white/70 text-sm md:text-base font-medium">{isHindi ? "विशेषज्ञ से बातचीत शुरू करें" : "Expert medical advice is just a click away"}</p>
        </div>
        <div className="p-6 md:p-8">{formElement}</div>
      </motion.div>
    </div>
  );
}
