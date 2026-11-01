import type { Metadata } from "next";
import GlobalPopup from "@/components/GlobalPopup";
import DevSignature from "@/components/DevSignature";
import AIChatbot from "@/components/AIChatbot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteAnimator from "@/components/RouteAnimator"; // 👈 Naya Import
import MetaPixel from "@/components/MetaPixel";
import { DM_Sans, Newsreader, Noto_Sans_Devanagari } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Newsreader({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-display", display: "swap" });
const hindiFont = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-devanagari", display: "swap" });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aureviahealthcare.com").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aurevia Healthcare | Care, coordinated around you",
    template: "%s | Aurevia Healthcare",
  },
  description: "Explore treatment options and get help coordinating care with specialists and hospitals across India.",
  applicationName: "Aurevia Healthcare",
  category: "health",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    siteName: "Aurevia Healthcare",
    locale: "en_IN",
    title: "Aurevia Healthcare | Care, coordinated around you",
    description: "Explore treatment options and get help coordinating care with specialists and hospitals across India.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Aurevia Healthcare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurevia Healthcare | Care, coordinated around you",
    description: "Explore treatment options and get help coordinating care with specialists and hospitals across India.",
    images: ["/opengraph-image.png"],
  },
  icons: { icon: "/favicon.ico" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Aurevia Healthcare",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/aurevia/assets/logo.png`,
    description: "A healthcare facilitation platform connecting patients with specialists and hospitals in India.",
    email: "info@aureviahealthcare.com",
    telephone: "+91-99909-59440",
    areaServed: { "@type": "Country", name: "India" },
    sameAs: ["https://www.instagram.com/aureviahealthcare/", "https://www.linkedin.com/company/aurevia-healthcare/"],
    contactPoint: { "@type": "ContactPoint", telephone: "+91-99909-59440", contactType: "customer support", areaServed: "IN", availableLanguage: ["English", "Hindi"] },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Aurevia Healthcare",
    url: `${siteUrl}/`,
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": `${siteUrl}/#organization` },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-developer="TtStDeEp">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${hindiFont.variable} antialiased font-manrope`}>
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
          
          <Navbar /> 
          <RouteAnimator /> {/* 👈 Yahan Animator laga diya */}
          
          {children}
          
          <Footer />
          <GlobalPopup />
          <MetaPixel />
          <AIChatbot />
          <DevSignature />
        </>
      </body>
    </html>
  );
}
