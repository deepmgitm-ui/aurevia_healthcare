"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const consentKey = "aurevia-marketing-consent";
const allowedPaths = new Set(["/", "/about/", "/how-it-works/"]);

type PixelQueue = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; loaded: boolean; version: string };
type PixelWindow = Window & { fbq?: PixelQueue; _fbq?: PixelQueue };

export default function MetaPixel() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<"unknown" | "accepted" | "rejected">("unknown");
  const [showChoice, setShowChoice] = useState(false);
  const initialized = useRef(false);
  const lastTrackedPath = useRef("");
  const initialPath = useRef(pathname);

  useEffect(() => {
    if (!pixelId || !/^\d{6,20}$/.test(pixelId)) return;
    const saved = window.localStorage.getItem(consentKey);
    setChoice(saved === "accepted" ? "accepted" : saved === "rejected" ? "rejected" : "unknown");
    setShowChoice(!saved);
    const openSettings = () => setShowChoice(true);
    window.addEventListener("aurevia:open-cookie-settings", openSettings);
    return () => window.removeEventListener("aurevia:open-cookie-settings", openSettings);
  }, []);

  useEffect(() => {
    if (!pixelId || !/^\d{6,20}$/.test(pixelId) || choice !== "accepted") return;
    const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
    if (pathname !== initialPath.current || !allowedPaths.has(normalizedPath) || window.location.search || window.location.hash || lastTrackedPath.current === normalizedPath) return;
    try {
      const referrer = new URL(document.referrer);
      const referrerPath = referrer.pathname.endsWith("/") ? referrer.pathname : `${referrer.pathname}/`;
      if (referrer.origin === window.location.origin && !allowedPaths.has(referrerPath)) return;
    } catch {}
    const pixelWindow = window as PixelWindow;
    const trackPage = () => {
      pixelWindow.fbq?.("track", "PageView");
      lastTrackedPath.current = normalizedPath;
    };

    if (pixelWindow.fbq) {
      trackPage();
      return;
    }

    if (initialized.current) return;
    initialized.current = true;
    const queueFn = ((...args: unknown[]) => {
      if (queueFn.callMethod) queueFn.callMethod(...args);
      else queueFn.queue.push(args);
    }) as PixelQueue;
    queueFn.queue = [];
    queueFn.loaded = true;
    queueFn.version = "2.0";
    pixelWindow.fbq = queueFn;
    pixelWindow._fbq = queueFn;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    queueFn("set", "autoConfig", false, pixelId);
    queueFn("init", pixelId);
    queueFn("track", "PageView");
    lastTrackedPath.current = normalizedPath;
  }, [choice, pathname]);

  if (!pixelId || !/^\d{6,20}$/.test(pixelId) || !showChoice) return null;

  const choose = (next: "accepted" | "rejected") => {
    window.localStorage.setItem(consentKey, next);
    setChoice(next);
    setShowChoice(false);
  };

  return (
    <aside className="aurevia-cookie-choice" aria-label="Optional advertising measurement" role="region">
      <div>
        <strong>Cookie preferences</strong>
        <p>Allow optional Meta advertising measurement on selected informational pages. We never send form details or treatment choices.</p>
      </div>
      <div className="aurevia-cookie-actions">
        <button type="button" onClick={() => choose("rejected")}>No thanks</button>
        <button type="button" onClick={() => choose("accepted")}>Allow</button>
      </div>
    </aside>
  );
}
