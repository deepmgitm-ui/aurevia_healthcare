import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import GoogleReviewsFeed from "@/components/GoogleReviewsFeed";

export const metadata = pageMetadata({
  title: "Patient voices and Google reviews",
  description: "Read patient feedback on Aurevia Healthcare’s Google Business Profile.",
  path: "/voices/",
});

export default function VoicesPage() {
  return (
    <main className="google-reviews-page" lang="en">
      <section className="google-reviews-hero">
        <div className="google-reviews-shell">
          <Link className="google-reviews-back" href="/"><ArrowLeft size={15} aria-hidden="true" /> Aurevia Home</Link>
          <p className="google-reviews-kicker">PATIENT EXPERIENCES · GOOGLE</p>
          <h1>Patient voices, shared on Google.</h1>
          <p className="google-reviews-intro">Read feedback in its original context on Aurevia Healthcare’s Google Business Profile.</p>

          <div className="google-reviews-summary" aria-label="Google rating, 5 out of 5 from 47 reviews">
            <span className="google-reviews-rating">5.0</span>
            <span className="google-reviews-summary-copy">
              <span className="google-reviews-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <span>47 Google reviews · Gurugram</span>
            </span>
          </div>
        </div>
      </section>

      <section className="google-reviews-list-section">
        <div className="google-reviews-shell">
          <div className="google-reviews-section-heading">
            <div>
              <p className="google-reviews-kicker">VERIFIED AT THE SOURCE</p>
              <h2>A few words that stayed with us</h2>
            </div>
          </div>
          <GoogleReviewsFeed />
        </div>
      </section>
    </main>
  );
}
