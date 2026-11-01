import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Treatments and specialist care", description: "Explore LASIK, cataract, ENT, dental, urology and other treatment pathways supported by Aurevia's care coordination team.", path: "/services/" });

const treatments = [
  ["lasik", "LASIK", "A clearer view, with specialist-guided vision correction.", "/treatments/lasik-bg.webp", "Vision care"],
  ["cataract", "Cataract care", "Understand your options for restoring everyday vision.", "/treatments/cataract-bg.webp", "Eye care"],
  ["sinus", "Sinus treatment", "Explore care for recurring sinus concerns and breathing.", "/treatments/sinus-bg.webp", "ENT care"],
  ["tonsillectomy", "Tonsil treatment", "Get guidance for persistent tonsil and throat problems.", "/treatments/tonsil-bg.webp", "ENT care"],
  ["septoplasty", "Septoplasty", "Discuss support for a deviated septum and easier breathing.", "/treatments/septoplasty-bg.webp", "ENT care"],
  ["ear-perforation", "Eardrum repair", "Learn about specialist care for eardrum conditions.", "/treatments/ear-bg.webp", "ENT care"],
  ["rhinoplasty", "Rhinoplasty", "Talk through functional and appearance-related concerns.", "/treatments/rhinoplasty-bg.webp", "Facial care"],
  ["gynecomastia", "Gynecomastia care", "Private, respectful guidance for men’s chest concerns.", "/treatments/gynecomastia-bg.webp", "Men’s health"],
  ["kidney-stone", "Kidney stone care", "Understand tests and treatment options with a specialist.", "/treatments/kidney-bg.webp", "Urology"],
  ["dental", "Dental care", "Find support for dental procedures and oral health needs.", "/treatments/dental-bg.webp", "Dental care"],
];

export default function ServicesPage() {
  return (
    <main className="interior-page service-directory-page">
      <section className="service-directory-hero"><div className="interior-shell"><p className="interior-eyebrow"><span /> Explore care, clearly</p><h1>Find a treatment that<br /><em>starts a conversation.</em></h1><p className="interior-intro">A thoughtful overview of the care pathways we help coordinate. Choose a treatment to learn more, then speak with our team about what may suit you.</p><div className="directory-count"><span>10</span><p>treatment pathways<br />to explore at your pace</p><HeartPulse size={24} /></div></div></section>
      <section className="service-directory-list"><div className="interior-shell"><div className="directory-section-heading"><div><p className="interior-eyebrow">Specialist-guided pathways</p><h2>Care that begins with <em>your questions.</em></h2></div><p>Every patient journey is different. A qualified doctor will advise on diagnosis and treatment after reviewing your needs.</p></div><div className="service-card-grid">{treatments.map(([slug,title,desc,image,category],index)=><Link href={`/services/${slug}`} className={`service-directory-card service-card-${index%4}`} key={slug}><div className="service-card-image"><img src={image} alt={`${title} care`} loading={index>3?"lazy":"eager"}/><span>{category}</span></div><div className="service-card-copy"><span className="service-card-index">{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{desc}</p><span className="service-card-link">Explore care <ArrowRight size={16}/></span></div></Link>)}</div><div className="directory-help"><div><span className="directory-help-icon"><HeartPulse size={20}/></span><p><strong>Not sure where to begin?</strong><small>Our care team can help you find the right specialist to speak with.</small></p></div><Link href="/free-consultation">Talk to our team <ArrowRight size={16}/></Link></div></div></section>
    </main>
  );
}
