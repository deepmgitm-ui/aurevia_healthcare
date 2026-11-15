import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel";

export const metadata = pageMetadata({
  title: "Patient voices and Google reviews",
  description: "Read patient feedback on Aurevia Healthcare’s Google Business Profile.",
  path: "/voices/",
});

const googleProfileUrl = "https://www.google.com/maps/place/Aurevia+HealthCare,+maruti+industrial+development+area,+Sector+18,+Gurugram,+Haryana+122015/@28.4898737,77.0620363,17z/data=!4m2!3m1!1s0x27da9535d6e66a7d:0x3c07f42f9d285c4";

export default function VoicesPage() {
  return (
    <main className="google-reviews-page" lang="en">
      <section className="google-reviews-hero">
        <div className="google-reviews-shell">
          <Link className="google-reviews-back" href="/"><ArrowLeft size={15} aria-hidden="true" /> Aurevia Home</Link>
          <p className="google-reviews-kicker">PATIENT EXPERIENCES · GOOGLE</p>
          <h1>Patient voices, shared on Google.</h1>
          <p className="google-reviews-intro">Read feedback in its original context on Aurevia Healthcare’s Google Business Profile.</p>

          <a className="google-reviews-summary" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
            <span className="google-reviews-rating">5.0</span>
            <span className="google-reviews-summary-copy">
              <span className="google-reviews-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <span>49 Google reviews · Gurugram</span>
            </span>
            <ArrowUpRight className="google-reviews-summary-arrow" size={19} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="google-reviews-list-section">
        <div className="google-reviews-shell">
          <div className="google-reviews-section-heading">
            <div>
              <p className="google-reviews-kicker">VERIFIED AT THE SOURCE</p>
              <h2>Reviews from the original source</h2>
            </div>
            <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="google-reviews-all-link">Open Aurevia on Google <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <GoogleReviewsCarousel locale="en" />
        </div>
      </section>
    </main>
  );
}
