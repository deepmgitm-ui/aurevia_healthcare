import { ArrowUpRight, Star } from "lucide-react";

const googleProfileUrl = "https://www.google.com/maps/place/Aurevia+HealthCare,+maruti+industrial+development+area,+Sector+18,+Gurugram,+Haryana+122015/@28.4898737,77.0620363,17z/data=!4m2!3m1!1s0x27da9535d6e66a7d:0x3c07f42f9d285c4";

export default function GoogleReviewsCarousel({ locale = "hi" }: { locale?: "en" | "hi" }) {
  const english = locale === "en";

  return (
    <section className="google-review-source-card" aria-label={english ? "Aurevia Google reviews" : "Aurevia Google reviews"}>
      <div className="google-review-source-rating" aria-label={english ? "5 out of 5 stars on Google" : "Google par 5 mein se 5 stars"}>
        <span className="google-review-google-mark" aria-hidden="true">G</span>
        <span className="google-review-source-score">5.0</span>
        <span className="google-review-source-stars" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill="currentColor" strokeWidth={1.5} />)}
        </span>
        <span className="google-review-source-count">47 {english ? "Google reviews" : "Google reviews"}</span>
      </div>

      <div className="google-review-source-copy">
        <p className="google-reviews-kicker">{english ? "SHARED DIRECTLY ON GOOGLE" : "GOOGLE पर साझा किया गया"}</p>
        <h3>{english ? "Read patient feedback in their own words." : "मरीजों का असली फीडबैक, उन्हीं के शब्दों में पढ़ें।"}</h3>
        <p>{english ? "Google hosts the original reviews. Open the profile to read the full feedback and see the latest updates directly from the source." : "Google पर मूल समीक्षाएँ देखें। पूरी प्रतिक्रिया और नए अपडेट सीधे स्रोत से पढ़ें।"}</p>
        <a className="google-review-source-link" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
          {english ? "Read reviews on Google" : "Google पर समीक्षाएँ पढ़ें"}<ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <p className="google-review-live-note">{english ? "Google shows the latest review count and original wording." : "Google पर ताज़ा समीक्षा संख्या और मूल शब्द देखें।"}</p>
      </div>
    </section>
  );
}
