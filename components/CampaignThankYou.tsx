"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, MapPin } from "lucide-react";

export default function CampaignThankYou({ hindi = false }: { hindi?: boolean }) {
  const [treatment, setTreatment] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setTreatment(query.get("treatment")?.trim() ?? "");
    setLocation(query.get("location")?.trim() ?? "");
  }, []);

  const isLasik = treatment.toLowerCase().includes("lasik");
  const message = hindi
    ? `हमारी टीम 30 मिनट के भीतर${location ? ` ${location} में` : ""} आपसे ${isLasik ? "आपके निःशुल्क LASIK परामर्श का समय तय करने" : treatment ? `${treatment} परामर्श के अगले कदमों पर बात करने` : "परामर्श के अगले कदमों पर बात करने"} के लिए कॉल करेगी।`
    : `Our team will call you within 30 minutes${location ? ` about care in ${location}` : ""} to ${isLasik ? "confirm your free LASIK consultation slot" : treatment ? `discuss the next steps for your ${treatment} consultation` : "discuss the next steps for your consultation"}.`;

  return (
    <main className={`campaign-thank-you${hindi ? " campaign-hindi" : ""}`} lang={hindi ? "hi" : "en"}>
      <header className="campaign-thank-header">
        <Link href={hindi ? "/hi/" : "/"} className="campaign-thank-brand"><Image src="/logo-new.png" alt="" width={40} height={42} priority /><strong>Aurevia <i>Healthcare</i></strong></Link>
      </header>
      <section className="campaign-thank-content">
        <span className="campaign-thank-check"><Check size={39} strokeWidth={2.5} /></span>
        <p className="campaign-thank-eyebrow">{hindi ? "अनुरोध मिल गया" : "REQUEST RECEIVED"}</p>
        <h1>{hindi ? "धन्यवाद! आपका अनुरोध बुक हो गया है।" : "Thank you! Your request is booked."}</h1>
        <p className="campaign-thank-message">{message}</p>
        {location && <p className="campaign-thank-location"><MapPin size={15} />{location}</p>}
        <div className="campaign-thank-next">
          <h2>{hindi ? "अब आगे क्या होगा" : "What happens next"}</h2>
          <ol>
            {(hindi
              ? ["हमारी टीम तारीख और आपके नज़दीक उपलब्ध अस्पताल तय करने के लिए कॉल करेगी।", isLasik ? "आपकी विज़िट के लिए निःशुल्क पिकअप और ड्रॉप की व्यवस्था करेंगे।" : "हम आपकी अपॉइंटमेंट और उपलब्ध विकल्पों के समन्वय में मदद करेंगे।", isLasik ? "वरिष्ठ नेत्र विशेषज्ञ से मिलें और ₹1,000 में अपनी आँखों की जाँच कराएँ।" : "विशेषज्ञ से मिलें और अपनी स्थिति के अनुसार विकल्प समझें।"]
              : ["You get a call from our team to pick a date and the hospital nearest to you.", isLasik ? "We arrange free pick & drop for your visit." : "We help coordinate your appointment and explain available options.", isLasik ? "Meet a senior eye surgeon and complete your eye tests for just ₹1,000." : "Meet a specialist and discuss options for your individual situation."]).map((item, index) => <li key={item}><span>{index + 1}</span><p>{item}</p></li>)}
          </ol>
        </div>
        <p className="campaign-thank-contact">{hindi ? "कॉल का इंतज़ार नहीं करना चाहते? अभी संपर्क करें:" : "Can’t wait for the call? Reach us now:"}</p>
        <div className="campaign-thank-actions"><a className="campaign-thank-call" href="tel:+919990959440">{hindi ? "कॉल करें 99909 59440" : "Call 99909 59440"}</a><a className="campaign-thank-whatsapp" href="https://wa.me/919990959440" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></div>
        <Link className="campaign-thank-home" href={hindi ? "/hi/" : "/"}>{hindi ? "← होम पेज पर वापस जाएँ" : "← Back to home"}</Link>
      </section>
    </main>
  );
}
