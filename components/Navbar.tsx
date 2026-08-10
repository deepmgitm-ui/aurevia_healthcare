"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Scroll detect karne ke liye
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // System/Local Storage se theme check karna
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      setIsDark(true);
    }
  }, []);

  // Dark/Light Theme Toggle Function
  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Mobile menu open hone par background scroll band karna
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = useCallback(() => setOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ════════════ MAIN HEADER BAR ════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 font-manrope
          ${
            scrolled || open 
              ? "bg-white/95 backdrop-blur-xl border-b-[2px] border-gray-200 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.12)] py-3" 
              : "bg-transparent border-b-2 border-transparent py-4"
          } px-4 md:px-10`}
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full">
          
          {/* 1. LOGO */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3 relative z-[70]">
            <Image
              src="/logo.png"
              alt="Aurevia Healthcare"
              width={42} height={50}
              className="object-contain"
              priority
            />
            <div>
              <div className="font-newsreader font-bold text-[#03045E] text-[22px] tracking-tight leading-none nav-text">Aurevia</div>
              <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#03045E]/60 mt-1 nav-text-sub">healthcare facilitators</div>
            </div>
          </Link>

          {/* 2. DESKTOP LINKS */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/about" className="text-[14px] font-medium text-[#03045E]/70 hover:text-[#03045E] transition-colors nav-text">About</Link>
            <Link href="/treatments" className="text-[14px] font-medium text-[#03045E]/70 hover:text-[#03045E] transition-colors nav-text">Treatments</Link>
            <Link href="/how-it-works" className="text-[14px] font-medium text-[#03045E]/70 hover:text-[#03045E] transition-colors nav-text">How it works</Link>
            <Link href="/locations" className="text-[14px] font-medium text-[#03045E]/70 hover:text-[#03045E] transition-colors nav-text">Locations</Link>
            <Link href="/voices" className="text-[14px] font-medium text-[#03045E]/70 hover:text-[#03045E] transition-colors nav-text">Voices</Link>
          </nav>

          {/* 3. RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-[70]">
            
            {/* 🌙 DAY / NIGHT TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-11 h-11 md:w-10 md:h-10 rounded-full bg-gray-50 border border-gray-200 text-[#03045E] shadow-sm hover:bg-gray-100 transition-all duration-300 theme-btn"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
            </button>

            {/* Desktop Consultation Button */}
            <Link
              href="/#contact"
              onClick={closeMenu}
              className="hidden md:flex items-center justify-center gap-2 bg-transparent hover:bg-[#03045E]/5 text-[#03045E] px-4 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 border border-[#03045E]/10 nav-text nav-border"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] animate-pulse pulse-dot" />
              Free consultation
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-gray-50 border border-gray-200 text-[#03045E] shadow-sm theme-btn"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════ MOBILE DRAWER ════════════ */}
      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[50] md:hidden bg-white/95 backdrop-blur-xl w-screen h-[100dvh]
                    transition-all duration-300 ease-[cubic-bezier(0.6,0.1,0.2,1)] 
                    flex flex-col pt-[100px] px-5 sm:px-8 pb-[max(24px,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain drawer-bg
                    ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}`}
      >
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <Link href="/about" onClick={closeMenu} className="text-[18px] font-semibold text-[#03045E] py-3 border-b border-gray-100 block nav-text drawer-border">About</Link>
          <Link href="/treatments" onClick={closeMenu} className="text-[18px] font-semibold text-[#03045E] py-3 border-b border-gray-100 block nav-text drawer-border">Treatments</Link>
          <Link href="/how-it-works" onClick={closeMenu} className="text-[18px] font-semibold text-[#03045E] py-3 border-b border-gray-100 block nav-text drawer-border">How it works</Link>
          <Link href="/locations" onClick={closeMenu} className="text-[18px] font-semibold text-[#03045E] py-3 border-b border-gray-100 block nav-text drawer-border">Locations</Link>
          <Link href="/voices" onClick={closeMenu} className="text-[18px] font-semibold text-[#03045E] py-3 border-b border-gray-100 block nav-text drawer-border">Voices</Link>
          
          <Link href="/#contact" onClick={closeMenu} className="text-[18px] font-bold text-[#E85D04] py-3 border-b border-gray-100 flex items-center gap-2 nav-text-accent drawer-border">
            <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-pulse pulse-dot" />
            Free consultation
          </Link>
        </div>
      </div>
    </>
  );
}
