"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const openModal = () => {
    if (typeof window !== "undefined" && (window as any).openConsultationModal) {
      (window as any).openConsultationModal();
    }
  };

  return (
    <footer className="bg-[#03045E] text-white font-urbanist">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 pt-14 pb-8">

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1.2fr] gap-10 pb-12 border-b border-white/10">

          {/* ── Brand Column ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity mb-5">
              <Image src="/logo.png" alt="Aurevia Healthcare" width={46} height={55} className="object-contain" />
              <span className="text-[30px] font-black tracking-tight text-white leading-none">Aurevia</span>
            </Link>
            <p className="text-[13.5px] text-[#CAF0F8]/58 max-w-[310px] leading-relaxed">
              A trusted healthcare facilitation platform connecting patients with senior specialists, reputed hospitals and cashless treatment across 8 major regions in India.
            </p>
          </div>

          {/* ── Care Column ── */}
          <div>
            <h6 className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#CAF0F8]/45 mb-5">Care</h6>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/treatments", label: "All treatments" },
                { href: "/how-it-works", label: "How it works" },
                { href: "/locations", label: "Locations" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={openModal} className="text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200 text-left">
                  Free consultation
                </button>
              </li>
            </ul>
          </div>

          {/* ── Aurevia Column ── */}
          <div>
            <h6 className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#CAF0F8]/45 mb-5">Aurevia</h6>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/voices", label: "Patient voices" },
                { href: "/about#careers", label: "Careers" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={openModal} className="text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200 text-left">
                  Insurance partners
                </button>
              </li>
            </ul>
          </div>

          {/* ── Reach Column ── */}
          <div>
            <h6 className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#CAF0F8]/45 mb-5">Reach</h6>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+919990959440" className="flex items-center gap-2.5 text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200 group">
                  <Phone size={14} className="text-[#CAF0F8]/35 group-hover:text-[#90E0EF] transition-colors flex-shrink-0" strokeWidth={2} />
                  +91 99909 59440
                </a>
              </li>
              <li>
                <a href="mailto:info@aureviahealthcare.com" className="flex items-center gap-2.5 text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200 group break-all">
                  <Mail size={14} className="text-[#CAF0F8]/35 group-hover:text-[#90E0EF] transition-colors flex-shrink-0" strokeWidth={2} />
                  info@aureviahealthcare.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/919990959440" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200 group">
                  <MessageCircle size={14} className="text-[#CAF0F8]/35 group-hover:text-[#90E0EF] transition-colors flex-shrink-0" strokeWidth={2} />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href="mailto:info@aureviahealthcare.com" className="flex items-center gap-2.5 text-[13.5px] text-[#CAF0F8]/80 hover:text-[#90E0EF] transition-colors duration-200 group">
                  <Mail size={14} className="text-[#CAF0F8]/35 group-hover:text-[#90E0EF] transition-colors flex-shrink-0" strokeWidth={2} />
                  Press &amp; partnerships
                </a>
              </li>
            </ul>

            {/* ── Social Icons ── */}
            <div className="mt-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#CAF0F8]/38 mb-4">
                Follow us
              </p>
              <div className="flex items-center gap-3">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aureviahealthcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Aurevia on Instagram"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/15 text-[#CAF0F8]/65 overflow-hidden transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-lg hover:shadow-pink-500/20"
                >
                  {/* Instagram gradient bg on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
                  <Instagram size={22} strokeWidth={1.75} className="relative z-10 group-hover:text-white transition-colors duration-300" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/aurevia-healthcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Aurevia on LinkedIn"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-2xl border border-white/15 text-[#CAF0F8]/65 overflow-hidden transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-lg hover:shadow-[#0077b5]/30"
                >
                  {/* LinkedIn blue bg on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0077b5]" />
                  <Linkedin size={22} strokeWidth={1.75} className="relative z-10 group-hover:text-white transition-colors duration-300" />
                </a>

              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-[#CAF0F8]/40">
          <span>© 2026 Aurevia Healthcare. All rights reserved.</span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-[#90E0EF] transition-colors duration-200">Privacy</Link>
            <span className="opacity-30">·</span>
            <Link href="/terms-conditions" className="hover:text-[#90E0EF] transition-colors duration-200">Terms</Link>
            <span className="opacity-30">·</span>
            <Link href="/disclaimer" className="hover:text-[#90E0EF] transition-colors duration-200">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
