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

export default function RouteAnimator() {
  const [isEntering, setIsEntering] = useState(false);
  const navigationLockedRef = useRef(false);

  useEffect(() => {
    let refreshTimer: number | null = null;

    const hash = window.location.hash;

    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: getMotionPreference() ? "auto" : "smooth" });
      }, 120);
    } else {
      scrollToPageTop();
    }

    refreshTimer = window.setTimeout(() => {
      const aureviaWindow = window as AureviaWindow;
      aureviaWindow.refreshAureviaAnimations?.();
      aureviaWindow.aureviaLenis?.resize?.();
    }, 220);

    return () => {
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

      setIsEntering(true);
      window.setTimeout(() => window.location.assign(url.href), 2000);
    };

    document.addEventListener("click", handleClick as unknown as EventListener, true);
    return () => document.removeEventListener("click", handleClick as unknown as EventListener, true);
  }, []);

  return (
    <div aria-hidden="true" className={`aurevia-route-wipe${isEntering ? " is-entering" : ""}`}>
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
            <path className="aurevia-route-pulse" d="M13 33h9l5-9 8 17 6-11h10" />
          </svg>
          <span className="aurevia-route-wordmark">Aurevia <i>Healthcare</i></span>
          <span className="aurevia-route-caption">Care, coordinated around you</span>
        </div>
        <div className="aurevia-route-progress"><span /></div>
      </div>
    </div>
  );
}
