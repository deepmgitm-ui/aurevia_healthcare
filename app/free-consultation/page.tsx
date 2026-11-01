import FreeConsultationClient from "./FreeConsultationClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Request a free consultation", description: "Share your contact details and treatment question with Aurevia's care team to arrange a consultation conversation.", path: "/free-consultation/" });

export default function FreeConsultationPage() {
  return <FreeConsultationClient />;
}
