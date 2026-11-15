"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
      { opacity: 0 },
      { opacity: 1 },
    ],
    {
      duration: 320,
      easing: "cubic-bezier(.22, 1, .36, 1)",
      fill: "both",
    },
  );
}

function animatePageOut() {
  if (getMotionPreference()) return Promise.resolve();

  const main = document.querySelector("main");
  if (!main) return Promise.resolve();

  const animation = main.animate(
    [
      { opacity: 1 },
      { opacity: 0.86 },
    ],
    {
      duration: 130,
      easing: "cubic-bezier(.4, 0, .2, 1)",
      fill: "both",
    },
  );

  return animation.finished.catch(() => undefined);
}

export default function RouteAnimator() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const navigationLockedRef = useRef(false);
  const navigationFailsafeRef = useRef<number | null>(null);

  useEffect(() => {
    navigationLockedRef.current = false;
    if (navigationFailsafeRef.current !== null) {
      window.clearTimeout(navigationFailsafeRef.current);
      navigationFailsafeRef.current = null;
    }
    const revealFrame = window.requestAnimationFrame(() => setIsLeaving(false));

    const hash = window.location.hash;

    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: getMotionPreference() ? "auto" : "smooth" });
      }, 120);
    } else {
      scrollToPageTop();
    }

    animatePageIn();

    const timer = window.setTimeout(() => {
      const aureviaWindow = window as AureviaWindow;
      aureviaWindow.refreshAureviaAnimations?.();
      aureviaWindow.aureviaLenis?.resize?.();
    }, 220);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
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
      // Let exported location pages use their real static URLs on shared hosting.
      // The regular anchors work even when a host does not serve Next's RSC payloads.
      if (/^\/(?:hi\/)?locations(?:\/|$)/.test(url.pathname)) return;

      event.preventDefault();
      navigationLockedRef.current = true;
      setIsLeaving(true);
      navigationFailsafeRef.current = window.setTimeout(() => {
        navigationLockedRef.current = false;
        setIsLeaving(false);
        navigationFailsafeRef.current = null;
      }, 8_000);
      await Promise.all([
        animatePageOut(),
        getMotionPreference()
          ? Promise.resolve()
          : new Promise<void>((resolve) => window.setTimeout(resolve, 190)),
      ]);
      // Reset the current document before mounting the destination so Lenis,
      // native history restoration, and the App Router cannot preserve a
      // stale scroll position between pages.
      scrollToPageTop();
      router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: !url.hash });
    };

    document.addEventListener("click", handleClick as unknown as EventListener, true);
    return () => document.removeEventListener("click", handleClick as unknown as EventListener, true);
  }, [router]);

  return (
    <div aria-hidden="true" className={`aurevia-route-wipe${isLeaving ? " is-active" : ""}`} />
  );
}
