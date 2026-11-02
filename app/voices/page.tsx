import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel";

export const metadata = pageMetadata({
  title: "Google पर मरीजों की समीक्षाएँ",
  description: "Aurevia Healthcare के Google Business Profile पर साझा किए गए मरीजों के अनुभवों के हिंदी अनुवाद पढ़ें।",
  path: "/voices/",
});

const googleProfileUrl = "https://www.google.com/maps/place/Aurevia+HealthCare,+maruti+industrial+development+area,+Sector+18,+Gurugram,+Haryana+122015/@28.4898737,77.0620363,17z/data=!4m2!3m1!1s0x27da9535d6e66a7d:0x3c07f42f9d285c4";

export default function VoicesPage() {
  return (
    <main className="google-reviews-page" lang="hi">
      <section className="google-reviews-hero">
        <div className="google-reviews-shell">
          <Link className="google-reviews-back" href="/"><ArrowLeft size={15} /> Aurevia होम</Link>
          <p className="google-reviews-kicker">मरीजों का अनुभव · Google</p>
          <h1>मरीजों के अपने शब्दों में।</h1>
          <p className="google-reviews-intro">Aurevia HealthCare की Google प्रोफ़ाइल पर साझा किए गए अनुभवों में से कुछ।</p>

          <a className="google-reviews-summary" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
            <span className="google-reviews-rating">5.0</span>
            <span className="google-reviews-summary-copy">
              <span className="google-reviews-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <span>Google पर 49 समीक्षाएँ · गुरुग्राम</span>
            </span>
            <ArrowUpRight className="google-reviews-summary-arrow" size={19} />
          </a>
        </div>
      </section>

      <section className="google-reviews-list-section">
        <div className="google-reviews-shell">
          <div className="google-reviews-section-heading">
            <div>
              <p className="google-reviews-kicker">Google प्रोफ़ाइल से</p>
              <h2>मरीजों की हाल की समीक्षाएँ</h2>
            </div>
            <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="google-reviews-all-link">Google पर सभी समीक्षाएँ पढ़ें <ArrowUpRight size={16} /></a>
          </div>
          <GoogleReviewsCarousel />
        </div>
      </section>
    </main>
  );
}
