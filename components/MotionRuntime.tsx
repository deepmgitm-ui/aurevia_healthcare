"use client";

import { useEffect } from "react";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function MotionRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const idleWindow = window as IdleWindow;
    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const loadMotion = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;

        (window as Window & { gsap?: typeof gsap; ScrollTrigger?: unknown }).gsap = gsap;
        (window as Window & { gsap?: typeof gsap; ScrollTrigger?: unknown }).ScrollTrigger = ScrollTrigger;

        const script = document.createElement("script");
        script.src = "/aurevia/motion.js";
        script.async = true;
        document.body.appendChild(script);
      } catch {
        // Motion is decorative; the page content stays visible without it.
      }
    };

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(() => void loadMotion(), { timeout: 1400 });
    } else {
      timeoutHandle = window.setTimeout(() => void loadMotion(), 900);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  return null;
}
