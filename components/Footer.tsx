"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import HealthcareBenefits from "@/components/HealthcareBenefits";
import { resolveSiteLocation, siteLocationDetails } from "@/lib/locationDetails";

export default function Footer({ languageHrefOverride, locale }: { languageHrefOverride?: string; locale?: "en" | "hi" } = {}) {
  const pathname = usePathname();
  const isHindi = locale === "hi" || pathname.startsWith("/hi/");
  const isCampaignPage = /(?:^|\/)(?:campaigns|gp)\//.test(pathname);
  const treatmentSlug = pathname.match(/^\/(?:hi\/)?(?:services|campaigns)\/([^/]+)/)?.[1];
  const eyeCare = treatmentSlug === "lasik" || treatmentSlug === "cataract";
  const routeLocationSlug = pathname.match(/^\/(?:hi\/)?locations\/([^/]+)/)?.[1]
    ?? pathname.match(/^\/(?:hi\/)?services\/[^/]+\/([^/]+)/)?.[1];
  const activeLocation = resolveSiteLocation(routeLocationSlug);
  const hasLocalizedRoute = /^\/(?:hi\/)?(?:locations|services|campaigns)(?:\/|$)/.test(pathname);
  const languageHref = languageHrefOverride ?? (hasLocalizedRoute
    ? isHindi ? pathname.replace(/^\/hi(?=\/|$)/, "") || "/" : `/hi${pathname === "/" ? "" : pathname}`
    : isHindi ? "/" : "/hi/");
  const openModal = () => {
    if (typeof window !== "undefined" && (window as any).openConsultationModal) {
      (window as any).openConsultationModal();
    }
  };

  const careLinks = [
    { href: "/treatments", label: isHindi ? "सभी उपचार" : "Explore treatments" },
    { href: "/how-it-works", label: isHindi ? "देखभाल कैसे आगे बढ़ती है" : "How care works" },
    { href: isHindi ? "/hi/locations" : "/locations", label: isHindi ? "अपने शहर के विकल्प देखें" : "Explore care by city" },
    { href: "/voices", label: isHindi ? "मरीजों के अनुभव" : "Patient stories" },
  ];

  return (
    <>
      {!isCampaignPage && <HealthcareBenefits locale={isHindi ? "hi" : "en"} eyeCare={eyeCare} location={activeLocation} />}

      {!isCampaignPage && (
        <section className="footer-contact-band" aria-labelledby="footer-contact-title" lang={isHindi ? "hi" : "en"}>
          <div className="footer-contact-inner">
            <div className="footer-contact-copy">
              <span className="footer-eyebrow">{activeLocation ? (isHindi ? `${activeLocation.fullLabel.hi} · आपके साथ` : `CARE IN ${activeLocation.fullLabel.en.toUpperCase()}`) : (isHindi ? "अगला कदम, साथ मिलकर" : "HERE WHEN YOU NEED US")}</span>
              <h2 id="footer-contact-title">{isHindi ? `${activeLocation ? `${activeLocation.fullLabel.hi} में ` : ""}देखभाल के विकल्प समझने के लिए बात करें` : `Talk through care options${activeLocation ? ` in ${activeLocation.fullLabel.en}` : ""}`}</h2>
              <p>{isHindi ? "हमारी केयर टीम से पूछें कि यहाँ कौन-से विकल्प उपलब्ध हो सकते हैं और आगे क्या करना होगा।" : `Our care team can help you understand what may be available${activeLocation ? ` in ${activeLocation.fullLabel.en}` : " in your city"} and what to expect next.`}</p>
            </div>
            <div className="footer-contact-actions">
              <button type="button" onClick={openModal} className="footer-primary-action">
                {isHindi ? "केयर टीम से बात करें" : "Talk to our care team"}<ArrowRight size={17} aria-hidden="true" />
              </button>
              <a href="tel:+919990959440" className="footer-secondary-action"><Phone size={16} aria-hidden="true" />+91 99909 59440</a>
            </div>
          </div>
        </section>
      )}

      <footer className="aurevia-site-footer" lang={isHindi ? "hi" : "en"}>
        <div className="aurevia-footer-shell">
          <div className="aurevia-footer-grid">
            <div className="aurevia-footer-brand">
              <Link href="/" className="aurevia-footer-logo" aria-label={isHindi ? "Aurevia Healthcare — होम" : "Aurevia Healthcare home"}>
                <Image src="/logo.png" alt="" width={42} height={48} className="object-contain" />
                <span>Aurevia <small>HEALTHCARE</small></span>
              </Link>
              <p>{isHindi
                ? "हम मरीजों को उपचार के विकल्प समझने, अस्पतालों से जुड़ने और अगले कदम तय करने में मदद करते हैं।"
                : "We help patients understand treatment options, connect with hospitals and navigate the next steps of care."}</p>
              <div className="aurevia-footer-socials" aria-label={isHindi ? "सोशल मीडिया" : "Social media"}>
                <a href="https://www.instagram.com/aureviahealthcare/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} aria-hidden="true" /></a>
                <a href="https://www.linkedin.com/company/aurevia-healthcare/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} aria-hidden="true" /></a>
              </div>
            </div>

            <nav className="aurevia-footer-nav" aria-label={isHindi ? "देखभाल के लिंक" : "Care links"}>
              <h2>{isHindi ? "देखभाल" : "Explore care"}</h2>
              <ul>
                {careLinks.map(({ href, label }) => <li key={href}><Link href={href}>{label}<ArrowRight size={13} aria-hidden="true" /></Link></li>)}
              </ul>
            </nav>

            <nav className="aurevia-footer-locations" aria-label={isHindi ? "क्षेत्र चुनें" : "Care locations"}>
              <h2>{isHindi ? "अपने शहर में" : "Care by location"}</h2>
              <ul>
                {siteLocationDetails.map((region) => (
                  <li key={region.slug}><Link href={`${isHindi ? "/hi" : ""}/locations/${region.slug}`} aria-current={activeLocation?.slug === region.slug ? "location" : undefined}><MapPin size={13} aria-hidden="true" />{region.fullLabel[isHindi ? "hi" : "en"]}</Link></li>
                ))}
              </ul>
            </nav>

            <div className="aurevia-footer-contact">
              <h2>{isHindi ? "हमसे संपर्क करें" : "Speak with us"}</h2>
              <p>{isHindi ? "सवाल हैं? हमारी टीम आपकी बात सुनने के लिए तैयार है।" : "Questions about care? Our team is here to listen."}</p>
              <a href="tel:+919990959440" className="footer-contact-link"><Phone size={16} aria-hidden="true" /><span><small>{isHindi ? "हमें कॉल करें" : "Call our care team"}</small>+91 99909 59440</span></a>
              <a href="mailto:info@aureviahealthcare.com" className="footer-contact-link"><Mail size={16} aria-hidden="true" /><span><small>{isHindi ? "ईमेल" : "Email us"}</small>info@aureviahealthcare.com</span></a>
              <a href="https://wa.me/919990959440" target="_blank" rel="noopener noreferrer" className="footer-whatsapp-link"><MessageCircle size={16} aria-hidden="true" />{isHindi ? "WhatsApp पर बात करें" : "Message us on WhatsApp"}</a>
            </div>
          </div>

          <div className="aurevia-footer-trustline">
            <span>{isHindi ? "सोच-समझकर फैसले लें। अपनी देखभाल टीम से हर विकल्प की पुष्टि करें।" : "Make informed decisions. Confirm each care option with your treating team."}</span>
            <Link href="/disclaimer">{isHindi ? "चिकित्सकीय जानकारी" : "Medical information"}</Link>
          </div>

          <div className="aurevia-footer-bottom">
            <span>© {new Date().getFullYear()} Aurevia Healthcare</span>
            <nav aria-label={isHindi ? "कानूनी जानकारी" : "Legal information"}>
              <Link href="/privacy-policy">{isHindi ? "गोपनीयता" : "Privacy"}</Link>
              <Link href="/terms-conditions">{isHindi ? "नियम व शर्तें" : "Terms"}</Link>
              <Link href="/disclaimer">{isHindi ? "अस्वीकरण" : "Disclaimer"}</Link>
              <Link href="/photo-credits">{isHindi ? "फ़ोटो क्रेडिट" : "Photo credits"}</Link>
              <Link href={languageHref}>{isHindi ? "English" : "हिन्दी"}</Link>
              <button type="button" onClick={() => window.dispatchEvent(new Event("aurevia:open-cookie-settings"))}>{isHindi ? "कुकी सेटिंग" : "Cookie settings"}</button>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
