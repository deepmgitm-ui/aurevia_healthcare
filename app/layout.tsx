import type { Metadata } from "next";
import GlobalPopup from "@/components/GlobalPopup";
import DevSignature from "@/components/DevSignature";
import AIChatbot from "@/components/AIChatbot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteAnimator from "@/components/RouteAnimator"; // 👈 Naya Import
import "leaflet/dist/leaflet.css";
import "./globals.css";

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
