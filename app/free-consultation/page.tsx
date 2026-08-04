import type { Metadata } from "next";
import FreeConsultationClient from "./FreeConsultationClient";

export const metadata: Metadata = {
  title: "Book Free Surgery Consultation – Aurevia Health Care",
  description:
    "Book a 100% free, no-obligation surgery consultation with Aurevia Health Care. Expert advice for LASIK, Cataract, ENT, Rhinoplasty, Gynecomastia, Dental & more.",
  openGraph: {
    title: "Book Free Surgery Consultation – Aurevia Health Care",
    description:
      "Talk to experienced surgeons and specialists. No fees, no hidden charges—just honest guidance.",
    url: "https://aureviahealthcare.com/free-consultation",
  },
  alternates: {
    canonical: "https://aureviahealthcare.com/free-consultation",
  },
};

export default function FreeConsultationPage() {
  return <FreeConsultationClient />;
}