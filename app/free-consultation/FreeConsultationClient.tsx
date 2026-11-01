"use client";

import ContactForm from "@/components/ContactForm";
import { ArrowRight, Check, Phone, ShieldCheck, Sparkles } from "lucide-react";

const steps = ["Tell us what you need", "Speak with a care coordinator", "Choose your next step"];

export default function FreeConsultationClient() {
  return (
    <main className="interior-page consultation-page">
      <section className="consultation-hero">
        <div className="interior-shell consultation-layout">
          <div className="consultation-copy">
            <p className="interior-eyebrow"><span /> A little clarity can go a long way</p>
            <h1>Your questions deserve a <em>real conversation.</em></h1>
            <p className="interior-intro">Speak with our care team about a treatment, a doctor or what happens next. Start with your details and we’ll help you find the right person to talk to.</p>
            <div className="consultation-promise"><span className="promise-icon"><ShieldCheck size={23} /></span><div><strong>No-cost initial guidance</strong><p>There’s no fee to share your questions with our care coordination team.</p></div></div>
            <div className="consultation-steps">{steps.map((step, index) => <div className="consultation-step" key={step}><span>{String(index + 1).padStart(2,"0")}</span><p>{step}</p>{index < steps.length - 1 && <ArrowRight size={15} />}</div>)}</div>
            <a className="consultation-direct" href="tel:+919990959440"><span><Phone size={17} /></span><span><small>Prefer to call?</small><strong>+91 99909 59440</strong></span><ArrowRight size={17} /></a>
          </div>
          <div className="consultation-form-wrap"><div className="consultation-form-top"><span className="form-top-mark"><Sparkles size={18} /></span><span className="interior-eyebrow">Your care, at your pace</span></div><h2>Let’s start here.</h2><p className="consultation-form-lead">Share your contact details and the treatment you’d like to discuss.</p><ContactForm layout="wide" /><p className="form-privacy"><Check size={14} /> Your details are kept private and used to coordinate your call.</p></div>
        </div>
      </section>
      <section className="consultation-bottom"><div className="interior-shell"><p>Need help choosing a treatment?</p><a href="/treatments">Browse our treatment guide <ArrowRight size={16} /></a></div></section>
    </main>
  );
}
