import type { Metadata } from "next";
import GlobalPopup from "@/components/GlobalPopup";
import DevSignature from "@/components/DevSignature";
import AIChatbot from "@/components/AIChatbot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteAnimator from "@/components/RouteAnimator"; // 👈 Naya Import
import { DM_Sans, Newsreader, Noto_Sans_Devanagari } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Newsreader({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-display", display: "swap" });
const hindiFont = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-devanagari", display: "swap" });

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
    <html lang="en" data-developer="TtStDeEp">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${hindiFont.variable} antialiased font-manrope`}>
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
