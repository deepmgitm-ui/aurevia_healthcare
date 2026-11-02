"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Star } from "lucide-react";

const reviews = [
  {
    name: "Shivani",
    quote: "डॉक्टरों को अपने काम की अच्छी जानकारी थी। उन्होंने धैर्य से मेरी बात सुनी और हर बात साफ़-साफ़ समझाई।",
  },
  {
    name: "Priyanka Kumari",
    quote: "स्टाफ़ सहयोगी था और वहाँ का माहौल भी अच्छा लगा।",
  },
];

const motionPreferenceQuery = "(prefers-reduced-motion: reduce)";
const subscribeToMotionPreference = (callback: () => void) => {
  const query = window.matchMedia(motionPreferenceQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getMotionPreference = () => window.matchMedia(motionPreferenceQuery).matches;
const getServerMotionPreference = () => true;

export default function GoogleReviewsCarousel() {
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
    <div className="google-review-carousel" aria-roledescription="carousel" aria-label="Google पर मरीजों की समीक्षाएँ">
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
                <span className="google-review-stars" aria-label="5 में से 5 स्टार">★★★★★</span>
                <span className="google-review-source">Google समीक्षा का हिंदी अनुवाद</span>
              </div>
              <blockquote lang="hi">“{review.quote}”</blockquote>
              <div className="google-review-author">
                <strong>{review.name}</strong>
                <small>Google पर साझा की गई समीक्षा</small>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="google-review-controls">
        <button type="button" className="google-review-arrow" onClick={() => showReview(activeReview - 1)} aria-label="पिछली समीक्षा">
          <ChevronLeft size={19} />
        </button>
        <div className="google-review-dots" aria-label="समीक्षा चुनें">
          {reviews.map((review, index) => (
            <button
              type="button"
              key={review.name}
              className={`google-review-dot${index === activeReview ? " is-active" : ""}`}
              onClick={() => showReview(index)}
              aria-label={`समीक्षा ${index + 1} दिखाएँ`}
              aria-current={index === activeReview ? "true" : undefined}
            />
          ))}
        </div>
        <span className="google-review-count">{activeReview + 1} / {reviews.length}</span>
        {!prefersReducedMotion && (
          <button type="button" className="google-review-arrow" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? "समीक्षाएँ रोकें" : "समीक्षाएँ चलाएँ"}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
        <button type="button" className="google-review-arrow" onClick={() => showReview(activeReview + 1)} aria-label="अगली समीक्षा">
          <ChevronRight size={19} />
        </button>
      </div>
      <p className="google-review-translation-note"><Star size={14} fill="currentColor" /> ये Google पर उपलब्ध समीक्षाओं के हिंदी अनुवाद हैं।</p>
    </div>
  );
}
