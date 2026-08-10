import type { Metadata } from "next";
import { Manrope, Newsreader, JetBrains_Mono, Urbanist, Playfair_Display } from "next/font/google";
import GlobalPopup from "@/components/GlobalPopup";
import DevSignature from "@/components/DevSignature";
import AIChatbot from "@/components/AIChatbot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteAnimator from "@/components/RouteAnimator"; // 👈 Naya Import
import "leaflet/dist/leaflet.css";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const newsreader = Newsreader({ subsets: ["latin"], style: ['normal', 'italic'], variable: "--font-newsreader" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });
const trustDisplay = Playfair_Display({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-trust-display" });

export const metadata: Metadata = {
  title: "Aurevia Healthcare",
  description: "Care you can trust.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-developer="TtStDeEp" className={`${manrope.variable} ${newsreader.variable} ${jetbrains.variable} ${urbanist.variable} ${trustDisplay.variable}`}>
      <body className="antialiased font-manrope">
        <>
          
          <Navbar /> 
          <RouteAnimator /> {/* 👈 Yahan Animator laga diya */}
          
          {children}
          
          <Footer />
          <GlobalPopup />
          <AIChatbot />
          <DevSignature />
        </>
      </body>
    </html>
  );
}
