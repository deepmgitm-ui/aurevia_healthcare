"use client";

import { useEffect } from "react";
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
      { opacity: 0, transform: "translateY(14px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 420,
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
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0.86, transform: "translateY(-8px)" },
    ],
    {
      duration: 160,
      easing: "cubic-bezier(.4, 0, .2, 1)",
      fill: "both",
    },
  );

  return animation.finished.catch(() => undefined);
}

export default function RouteAnimator() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
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

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || target === "_blank") return;
      if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("https://wa.me")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.hash) return;

      event.preventDefault();
      await animatePageOut();
      router.push(`${url.pathname}${url.search}${url.hash}`);
    };

    document.addEventListener("click", handleClick as unknown as EventListener);
    return () => document.removeEventListener("click", handleClick as unknown as EventListener);
  }, [router]);

  return null;
}
