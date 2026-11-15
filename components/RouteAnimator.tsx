"use client";

import { useEffect, useRef, useState } from "react";

type AureviaWindow = Window & {
  aureviaLenis?: {
    scrollTo?: (target: number | string, options?: { immediate?: boolean; duration?: number }) => void;
    resize?: () => void;
  };
  refreshAureviaAnimations?: () => void;
};

function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToPageTop() {
  const aureviaWindow = window as AureviaWindow;

  aureviaWindow.history.scrollRestoration = "manual";

  if (aureviaWindow.aureviaLenis?.scrollTo) {
    aureviaWindow.aureviaLenis.scrollTo(0, { immediate: true, duration: 0 });
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function animatePageIn() {
  if (getMotionPreference()) return;

  const main = document.querySelector("main");
  if (!main) return;

  main.animate(
    [
      { opacity: 0, transform: "translate3d(0, 9px, 0)", filter: "blur(2px)" },
      { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0)" },
    ],
    {
      duration: 360,
      easing: "cubic-bezier(.22, 1, .36, 1)",
      fill: "both",
    },
  );
}

export default function RouteAnimator() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const navigationLockedRef = useRef(false);

  useEffect(() => {
    let enterTimer: number | null = null;
    let refreshTimer: number | null = null;

    try {
      if (window.sessionStorage.getItem("aurevia-route-transition") === "enter") {
        window.sessionStorage.removeItem("aurevia-route-transition");
        setIsEntering(true);
        enterTimer = window.setTimeout(() => setIsEntering(false), 620);
      }
    } catch {
      // The page still works when browser storage is unavailable.
    }

    const hash = window.location.hash;

    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: getMotionPreference() ? "auto" : "smooth" });
      }, 120);
    } else {
      scrollToPageTop();
    }

    animatePageIn();

    refreshTimer = window.setTimeout(() => {
      const aureviaWindow = window as AureviaWindow;
      aureviaWindow.refreshAureviaAnimations?.();
      aureviaWindow.aureviaLenis?.resize?.();
    }, 220);

    return () => {
      if (enterTimer !== null) window.clearTimeout(enterTimer);
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (navigationLockedRef.current) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || target === "_blank" || anchor.hasAttribute("download") || anchor.hasAttribute("data-no-transition")) return;
      if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("https://wa.me")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const isSameDocument = url.pathname === window.location.pathname && url.search === window.location.search;
      if (isSameDocument) return;

      event.preventDefault();
      navigationLockedRef.current = true;
      if (getMotionPreference()) {
        window.location.assign(url.href);
        return;
      }

      setIsLeaving(true);
      try {
        window.sessionStorage.setItem("aurevia-route-transition", "enter");
      } catch {
        // Continue with the outgoing transition even without session storage.
      }
      window.setTimeout(() => window.location.assign(url.href), 360);
    };

    document.addEventListener("click", handleClick as unknown as EventListener, true);
    return () => document.removeEventListener("click", handleClick as unknown as EventListener, true);
  }, []);

  return (
    <div aria-hidden="true" className={`aurevia-route-wipe${isLeaving ? " is-active" : ""}${isEntering ? " is-entering" : ""}`}>
      <div className="aurevia-route-screen">
        <div className="aurevia-route-glow aurevia-route-glow-one" />
        <div className="aurevia-route-glow aurevia-route-glow-two" />
        <div className="aurevia-route-lockup">
          <svg className="aurevia-route-emblem" viewBox="0 0 64 64" fill="none">
            <circle className="aurevia-route-ring" cx="32" cy="32" r="25" />
            <path className="aurevia-route-petal" d="M32 9c7 7 7 13 0 19-7-6-7-12 0-19Z" />
            <path className="aurevia-route-petal" d="M55 32c-7 7-13 7-19 0 6-7 12-7 19 0Z" />
            <path className="aurevia-route-petal" d="M32 55c-7-7-7-13 0-19 7 6 7 12 0 19Z" />
            <path className="aurevia-route-petal" d="M9 32c7-7 13-7 19 0-6 7-12 7-19 0Z" />
            <circle className="aurevia-route-core" cx="32" cy="32" r="5" />
          </svg>
          <span className="aurevia-route-wordmark">Aurevia <i>Healthcare</i></span>
          <span className="aurevia-route-caption">Care, coordinated around you</span>
        </div>
        <div className="aurevia-route-progress"><span /></div>
      </div>
    </div>
  );
}
