"use client";

import ContactForm from "@/components/ContactForm";
import { ArrowDown, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPageClient() {
  return (
    <main className="interior-page contact-page">
      <section className="interior-hero contact-hero">
        <div className="interior-shell contact-layout">
          <div className="contact-copy">
            <p className="interior-eyebrow"><span /> Here when you need us</p>
            <h1>Care starts with a <em>conversation.</em></h1>
            <p className="interior-intro">Tell us what you need help with. A care coordinator will listen, answer your questions and help you understand the next step.</p>
            <div className="contact-ways">
              <a href="tel:+919990959440" className="contact-way"><span className="contact-way-icon"><Phone size={19} /></span><span><small>Call our care team</small><strong>+91 99909 59440</strong></span><ArrowUpRight size={17} /></a>
              <a href="https://wa.me/919990959440" target="_blank" rel="noreferrer" className="contact-way"><span className="contact-way-icon contact-way-icon--mint"><MessageCircle size={19} /></span><span><small>Message us on WhatsApp</small><strong>We’re here to help</strong></span><ArrowUpRight size={17} /></a>
              <a href="mailto:info@aureviahealthcare.com" className="contact-way"><span className="contact-way-icon contact-way-icon--peach"><Mail size={19} /></span><span><small>Email our team</small><strong>info@aureviahealthcare.com</strong></span><ArrowUpRight size={17} /></a>
            </div>
            <div className="contact-note"><MapPin size={17} /><span>Care coordination across 9 regions in India</span></div>
          </div>
          <div className="contact-form-card">
            <div className="form-card-heading"><span className="interior-eyebrow">A good place to begin</span><h2>How can we help?</h2><p>Share a few details and our team will get back to you.</p></div>
            <ContactForm layout="wide" />
            <p className="form-privacy">Your information stays private and is used to help arrange your consultation.</p>
          </div>
        </div>
        <a className="interior-scroll-cue" href="#contact-next"><span>Good care begins by listening</span><ArrowDown size={16} /></a>
      </section>
      <section className="contact-next" id="contact-next"><div className="interior-shell contact-next-inner"><div><p className="interior-eyebrow">No pressure, just guidance</p><h2>Not sure what to ask?<br /><em>That’s completely okay.</em></h2></div><p>Start with what is bothering you. We can help you find the right specialist, understand available treatment options and plan a consultation at your pace.</p><Link href="/treatments" className="interior-text-link">Explore treatments <ArrowUpRight size={17} /></Link></div></section>
    </main>
  );
}
