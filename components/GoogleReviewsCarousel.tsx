"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Star } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    name: "Shivani",
    quote: { hi: "डॉक्टरों को अपने काम की अच्छी जानकारी थी। उन्होंने धैर्य से मेरी बात सुनी और हर बात साफ़-साफ़ समझाई।", en: "The doctors were knowledgeable. They listened patiently and explained everything clearly." },
  },
  {
    name: "Priyanka Kumari",
    quote: { hi: "स्टाफ़ सहयोगी था और वहाँ का माहौल भी अच्छा लगा।", en: "The staff were helpful and the atmosphere felt welcoming." },
  },
];

const googleProfileUrl = "https://www.google.com/maps/place/Aurevia+HealthCare,+maruti+industrial+development+area,+Sector+18,+Gurugram,+Haryana+122015/@28.4898737,77.0620363,17z/data=!4m2!3m1!1s0x27da9535d6e66a7d:0x3c07f42f9d285c4";

const motionPreferenceQuery = "(prefers-reduced-motion: reduce)";
const subscribeToMotionPreference = (callback: () => void) => {
  const query = window.matchMedia(motionPreferenceQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getMotionPreference = () => window.matchMedia(motionPreferenceQuery).matches;
const getServerMotionPreference = () => true;

export default function GoogleReviewsCarousel({ locale = "hi" }: { locale?: "en" | "hi" }) {
  const english = locale === "en";
  const [activeReview, setActiveReview] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [isPlaying, prefersReducedMotion]);

  const showReview = (index: number) => {
    setActiveReview((index + reviews.length) % reviews.length);
  };

  return (
    <div className="google-review-carousel" aria-roledescription="carousel" aria-label={english ? "Patient reviews on Google" : "Google पर मरीजों की समीक्षाएँ"}>
      <div
        className="google-review-window"
        aria-live="polite"
        onFocusCapture={() => setIsPlaying(false)}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          if (start !== null && end !== undefined && Math.abs(start - end) > 48) {
            showReview(activeReview + (start > end ? 1 : -1));
          }
          touchStartX.current = null;
        }}
      >
        <div className="google-review-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
          {reviews.map((review, index) => (
            <article className="google-review-card" key={review.name} aria-roledescription="slide" aria-label={`${index + 1} / ${reviews.length}`} aria-hidden={index !== activeReview}>
              <div className="google-review-topline">
                <span className="google-review-stars" aria-label={english ? "5 out of 5 stars" : "5 में से 5 स्टार"}>★★★★★</span>
                <span className="google-review-source">{english ? "Google review · translated" : "Google समीक्षा का अनुवाद"}</span>
              </div>
              <blockquote lang={english ? "en" : "hi"}>“{review.quote[locale]}”</blockquote>
              <div className="google-review-author">
                <strong>{review.name}</strong>
                <small>{english ? "Shared on Google" : "Google पर साझा की गई समीक्षा"}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="google-review-controls">
        <button type="button" className="google-review-arrow" onClick={() => showReview(activeReview - 1)} aria-label={english ? "Previous review" : "पिछली समीक्षा"}>
          <ChevronLeft size={19} />
        </button>
        <div className="google-review-dots" aria-label={english ? "Choose a review" : "समीक्षा चुनें"}>
          {reviews.map((review, index) => (
            <button
              type="button"
              key={review.name}
              className={`google-review-dot${index === activeReview ? " is-active" : ""}`}
              onClick={() => showReview(index)}
              aria-label={english ? `Show review ${index + 1}` : `समीक्षा ${index + 1} दिखाएँ`}
              aria-current={index === activeReview ? "true" : undefined}
            />
          ))}
        </div>
        <span className="google-review-count">{activeReview + 1} / {reviews.length}</span>
        {!prefersReducedMotion && (
          <button type="button" className="google-review-arrow" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? (english ? "Pause reviews" : "समीक्षाएँ रोकें") : (english ? "Play reviews" : "समीक्षाएँ चलाएँ")}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
        <button type="button" className="google-review-arrow" onClick={() => showReview(activeReview + 1)} aria-label={english ? "Next review" : "अगली समीक्षा"}>
          <ChevronRight size={19} />
        </button>
      </div>
      <p className="google-review-translation-note"><Star size={14} fill="currentColor" /> {english ? "Translations of reviews shared on Google." : "ये Google पर उपलब्ध समीक्षाओं के हिंदी अनुवाद हैं।"}</p>
      <Link className="campaign-google-profile-link" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">{english ? "Read all 49 reviews on Google" : "Google पर सभी 49 समीक्षाएँ पढ़ें"}<ArrowUpRight size={14} /></Link>
    </div>
  );
}
