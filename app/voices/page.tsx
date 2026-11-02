import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Star } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Google reviews",
  description: "Read patient feedback on Aurevia Healthcare’s Google Business Profile.",
  path: "/voices/",
});

const googleProfileUrl = "https://www.google.com/maps/place/Aurevia+HealthCare,+maruti+industrial+development+area,+Sector+18,+Gurugram,+Haryana+122015/@28.4898737,77.0620363,17z/data=!4m2!3m1!1s0x27da9535d6e66a7d:0x3c07f42f9d285c4";

const reviews = [
  {
    name: "Shivani",
    date: "4 months ago",
    quote: "The doctors were knowledgeable, patient, and explained everything clearly.",
  },
  {
    name: "Priyanka Kumari",
    date: "4 months ago",
    quote: "The staff is supportive, and the overall environment is welcoming.",
  },
];

export default function VoicesPage() {
  return (
    <main className="google-reviews-page">
      <section className="google-reviews-hero">
        <div className="google-reviews-shell">
          <Link className="google-reviews-back" href="/"><ArrowLeft size={15} /> Aurevia home</Link>
          <p className="google-reviews-kicker">Patient feedback · Google</p>
          <h1>Care, in their own words.</h1>
          <p className="google-reviews-intro">A small selection from the feedback shared on Aurevia HealthCare’s Google profile.</p>

          <a className="google-reviews-summary" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
            <span className="google-g-mark" aria-hidden="true">G</span>
            <span className="google-reviews-rating">5.0</span>
            <span className="google-reviews-summary-copy">
              <span className="google-reviews-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <span>49 Google reviews · Gurugram</span>
            </span>
            <ArrowUpRight className="google-reviews-summary-arrow" size={19} />
          </a>
        </div>
      </section>

      <section className="google-reviews-list-section">
        <div className="google-reviews-shell">
          <div className="google-reviews-section-heading">
            <div>
              <p className="google-reviews-kicker">From the Google profile</p>
              <h2>Recent patient feedback</h2>
            </div>
            <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="google-reviews-all-link">Read all reviews on Google <ArrowUpRight size={16} /></a>
          </div>
          <div className="google-review-grid">
            {reviews.map((review) => (
              <article className="google-review-card" key={review.name}>
                <div className="google-review-topline">
                  <span className="google-review-stars" aria-label="5 out of 5 stars">★★★★★</span>
                  <span className="google-review-source"><span aria-hidden="true">G</span> Google</span>
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <div className="google-review-author">
                  <span className="google-review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
                  <span><strong>{review.name}</strong><small>{review.date}</small></span>
                </div>
              </article>
            ))}
          </div>
          <p className="google-reviews-note"><Star size={14} fill="currentColor" /> Ratings and review count can change. Open Google to see the latest feedback.</p>
        </div>
      </section>
    </main>
  );
}
