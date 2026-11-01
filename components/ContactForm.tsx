"use client";

import { useState, useRef, FormEvent, useId } from "react";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Send, Loader2, User, Phone, Activity, ChevronDown, ShieldCheck, MapPin, MessageSquare, CircleCheck, CircleAlert } from "lucide-react";
import { siteLocationNames } from "@/lib/siteLocations";

const cityOptions = [...siteLocationNames, "Other"];
const treatmentOptions = ["I'm not sure yet", "LASIK", "Cataract", "Sinus", "Tonsillectomy", "Septoplasty", "Eardrum repair", "Rhinoplasty", "Gynecomastia", "Kidney stones", "Dental", "Liposuction", "Lipoma", "Orthopedic"];

interface ContactFormProps {
  layout?: "wide" | "compact";
  plain?: boolean;
  modalCompact?: boolean;
  initialLocation?: string;
  initialTreatment?: string;
  compactLead?: boolean;
}

export default function ContactForm({ layout = "compact", plain = false, modalCompact = false, initialLocation, initialTreatment, compactLead = false }: ContactFormProps) {
  const pathname = usePathname();
  const isHindi = pathname.startsWith("/hi/");
  const formId = useId().replaceAll(":", "");
  const treatmentListId = `${formId}-treatment-options`;
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
          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-[#254654] mb-2">{isHindi ? "आपका नाम" : "Your name"}</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <input id={`${formId}-name`} type="text" name="user_name" autoComplete="name" required placeholder={isHindi ? "अपना नाम लिखें" : "Enter your name"} className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F4F8FB] border border-[#173f50]/15 focus:bg-white focus:border-[#147D86] focus:ring-4 focus:ring-[#147D86]/10 outline-none transition-all font-medium text-[#183d4b] placeholder:text-[#667d84]" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-[#254654] mb-2">{isHindi ? "फ़ोन नंबर" : "Phone number"}</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <input id={`${formId}-phone`} type="tel" name="user_phone" autoComplete="tel" required placeholder="+91 98765 4XXXX" className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F4F8FB] border border-[#173f50]/15 focus:bg-white focus:border-[#147D86] focus:ring-4 focus:ring-[#147D86]/10 outline-none transition-all font-medium text-[#183d4b] placeholder:text-[#667d84]" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={initialLocation ? undefined : `${formId}-city`} className="block text-sm font-semibold text-[#254654] mb-2">{isHindi ? "शहर" : "City"}</label>
          {initialLocation ? <>
            <input type="hidden" name="user_city" value={initialLocation} />
            <div className="flex min-h-[54px] items-center gap-3 rounded-xl border border-[#173f50]/15 bg-[#eef6f5] px-4 py-3 font-semibold text-[#183d4b]">
              <MapPin size={19} className="shrink-0 text-[#147D86]" />
              <span>{initialLocation}</span>
              <span className="ml-auto text-xs font-medium text-[#5f747b]">{isHindi ? "इस पेज से" : "From this page"}</span>
            </div>
          </> : <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <select id={`${formId}-city`} name="user_city" required defaultValue="" className="w-full pl-12 pr-10 py-4 rounded-xl bg-[#F4F8FB] border border-[#173f50]/15 focus:bg-white focus:border-[#147D86] focus:ring-4 focus:ring-[#147D86]/10 outline-none transition-all appearance-none text-[#183d4b] font-medium cursor-pointer">
              <option value="" disabled>{isHindi ? "शहर चुनें..." : "Select a City..."}</option>
              {cityOptions.map((city, index) => (<option key={index} value={city}>{city === "Other" && isHindi ? "अन्य" : city}</option>))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 pointer-events-none" size={20} />
          </div>}
        </div>

        <div className="space-y-2">
          <label htmlFor={`${formId}-treatment`} className="block text-sm font-semibold text-[#254654] mb-2">{isHindi ? "आप किस उपचार के बारे में बात करना चाहते हैं?" : "Which treatment would you like to discuss?"}</label>
          <div className="relative group">
            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <input id={`${formId}-treatment`} type="text" name="user_treatment" list={treatmentListId} defaultValue={initialTreatment ?? ""} required autoComplete="off" placeholder={isHindi ? "जैसे: मोतियाबिंद, लेसिक या अपना उपचार लिखें" : "e.g. Cataract, LASIK or type another treatment"} className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F4F8FB] border border-[#173f50]/15 focus:bg-white focus:border-[#147D86] focus:ring-4 focus:ring-[#147D86]/10 outline-none transition-all font-medium text-[#183d4b] placeholder:text-[#667d84]" />
            <datalist id={treatmentListId}>
              {treatmentOptions.map((treatment) => {
                const hindiLabels: Record<string, string> = { "I'm not sure yet": "अभी तय नहीं", "LASIK": "लेसिक (LASIK)", "Cataract": "मोतियाबिंद", "Sinus": "साइनस", "Tonsillectomy": "टॉन्सिल सर्जरी", "Septoplasty": "सेप्टोप्लास्टी", "Eardrum repair": "कान के पर्दे की मरम्मत", "Liposuction": "लिपोसक्शन", "Lipoma": "लाइपोमा", "Rhinoplasty": "राइनोप्लास्टी", "Gynecomastia": "गाइनेकोमैस्टिया", "Kidney stones": "किडनी स्टोन", "Dental": "दाँतों का उपचार", "Orthopedic": "ऑर्थोपेडिक" };
                return <option key={treatment} value={treatment} label={isHindi ? hindiLabels[treatment] ?? treatment : treatment} />;
              })}
            </datalist>
          </div>
          <p className="text-xs leading-relaxed text-[#5f747b]">{isHindi ? "सूची से चुनें या अपना उपचार खुद लिखें।" : "Choose a suggestion or type the treatment in your own words."}</p>
        </div>

        <div className={`space-y-2 ${layout === "wide" ? "md:col-span-2" : ""} ${modalCompact ? "col-span-2" : ""}`}>
          <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-[#254654] mb-2">{isHindi ? "और कुछ बताना चाहेंगे?" : "Anything else you would like us to know?"}</label>
          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 text-[#03045E]/40 group-focus-within:text-[#03045E] transition-colors" size={20} />
            <textarea id={`${formId}-message`} name="user_message" placeholder={isHindi ? "अपनी समस्या या सवाल के बारे में कुछ पंक्तियाँ लिखें..." : "A few lines about your concern or questions..."} rows={modalCompact ? 2 : layout === "wide" ? 3 : 4} className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#F4F8FB] border border-[#173f50]/15 focus:bg-white focus:border-[#147D86] focus:ring-4 focus:ring-[#147D86]/10 outline-none transition-all font-medium text-[#183d4b] placeholder:text-[#667d84] resize-y" />
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
          <CircleCheck size={19} aria-hidden="true" /> <span>{isHindi ? "अनुरोध भेज दिया गया! हमारी टीम जल्द आपसे संपर्क करेगी।" : "Request Sent! Our expert will call you shortly."}</span>
        </motion.div>
      )}
      {status === "error" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center font-medium">
          <CircleAlert size={19} aria-hidden="true" /> {isHindi ? "अनुरोध नहीं भेजा जा सका। विवरण जाँचें या हमें सीधे कॉल करें।" : "Failed to send. Please verify your details or call us directly."}
        </motion.div>
      )}
    </form>
  );

  const compactLeadElement = (
    <form ref={formRef} onSubmit={sendEmail} className="healthcare-form compact-lead-form">
      <input type="hidden" name="user_city" defaultValue={initialLocation ?? ""} />
      <input type="hidden" name="user_treatment" defaultValue={initialTreatment ?? ""} />
      <input type="hidden" name="user_message" defaultValue="Treatment-page callback request" />
      <label className="compact-lead-field">
        <span>{isHindi ? "आपका नाम" : "Your name"}</span>
        <input type="text" name="user_name" autoComplete="name" required placeholder={isHindi ? "अपना नाम लिखें" : "Enter your name"} />
      </label>
      <label className="compact-lead-field">
        <span>{isHindi ? "संपर्क नंबर" : "Contact number"}</span>
        <input type="tel" name="user_phone" autoComplete="tel" inputMode="tel" minLength={7} maxLength={20} required placeholder={isHindi ? "+91 के साथ अपना नंबर लिखें" : "Enter your phone number"} />
      </label>
      <button type="submit" disabled={loading} className="compact-lead-submit">
        {loading ? <><Loader2 size={17} className="animate-spin" />{isHindi ? "भेजा जा रहा है…" : "Sending…"}</> : <>{isHindi ? "मुझसे संपर्क करें" : "Contact me"}<Send size={16} /></>}
      </button>
      <p className="compact-lead-privacy"><ShieldCheck size={14} aria-hidden="true" />{isHindi ? "हमारी टीम जल्द आपसे संपर्क करेगी।" : "Your details stay private. Our team will be in touch."}</p>
      {status === "success" && <p role="status" className="compact-lead-status success">{isHindi ? "धन्यवाद—हम जल्द आपसे संपर्क करेंगे।" : "Thank you. We’ll be in touch shortly."}</p>}
      {status === "error" && <p role="alert" className="compact-lead-status error">{isHindi ? "अनुरोध नहीं भेजा जा सका। कृपया फिर से कोशिश करें।" : "We couldn’t send your request. Please try again."}</p>}
    </form>
  );

  if (compactLead) return compactLeadElement;

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
