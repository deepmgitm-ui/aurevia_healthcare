import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us – Aurevia Health Care",
  description:
    "Get in touch with Aurevia Health Care. Call, WhatsApp, or fill our form for free medical consultation. Available 24/7 for expert healthcare guidance.",
  openGraph: {
    title: "Contact Us – Aurevia Health Care",
    description:
      "Reach out to our medical experts 24/7. Free consultation for LASIK, Cataract, ENT, Dental & more.",
    url: "https://aureviahealthcare.com/contact",
  },
  alternates: {
    canonical: "https://aureviahealthcare.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}