import ContactPageClient from "./ContactPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact Aurevia Healthcare", description: "Contact Aurevia's care coordination team by phone, WhatsApp or form to ask about treatment and consultation options.", path: "/contact/" });

export default function ContactPage() {
  return <ContactPageClient />;
}
