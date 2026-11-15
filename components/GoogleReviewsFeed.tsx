import { ArrowUpRight, Star } from "lucide-react";

const googleProfileUrl = "https://www.google.com/maps/place/Aurevia+HealthCare/@28.4898737,77.0620363,17z/data=!4m6!3m5!1s0x27da9535d6e66a7d:0x3c07f42f9d285c4!8m2!3d28.4898737!4d77.0620363!16s%2Fg%2F11z59n8hsc?entry=ttu";

const reviews = [
  {
    name: "Ashish kumar Singh",
    initial: "A",
    date: "A month ago",
    excerpt: "The staff is very polite, professional, and supportive. The consultation was explained clearly, and I felt well taken care of throughout the process.",
  },
  {
    name: "Naveenreddy Sadi",
    initial: "N",
    date: "A month ago",
    excerpt: "Recently visited Aurevia for an eye check-up and was highly impressed by the professionalism of the staff. The facility was clean, and the service was prompt.",
  },
  {
    name: "Jyoti",
    initial: "J",
    date: "5 months ago",
    excerpt: "The staff was welcoming, professional, and always ready to help. The doctor took the time to listen to my concerns and explained everything clearly.",
  },
  {
    name: "Vikram Shing",
    initial: "V",
    date: "5 months ago",
    excerpt: "The team helped me choose the best eye hospital and surgeon. The entire experience was seamless.",
  },
  {
    name: "Aman Gupta",
    initial: "A",
    date: "5 months ago",
    excerpt: "I had my eye surgery through Aurevia Healthcare, and the entire team cared for me throughout the process. They guided me at every step.",
  },
];

export default function GoogleReviewsFeed() {
  return (
    <div className="google-reviews-feed" aria-label="Selected Google review excerpts">
      <div className="google-review-grid">
        {reviews.map((review) => (
          <article className="google-review-card" key={review.name}>
            <div className="google-review-feed-head">
              <div className="google-review-feed-avatar" aria-hidden="true">{review.initial}</div>
              <div className="google-review-feed-author">
                <strong>{review.name}</strong>
                <span>{review.date} · Google</span>
              </div>
              <span className="google-review-google-mark" aria-label="Google review">G</span>
            </div>
            <div className="google-review-feed-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" strokeWidth={1.5} />)}
            </div>
            <blockquote>“{review.excerpt}”</blockquote>
            <a className="google-review-feed-link" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
              Read on Google <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <p className="google-reviews-note"><Star size={14} fill="currentColor" aria-hidden="true" /> Selected excerpts from Google Maps. Reviewer photos and full reviews remain on Google; open the profile for the complete, latest listing.</p>
    </div>
  );
}
