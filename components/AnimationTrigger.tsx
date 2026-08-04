"use client";

import { useEffect } from "react";

export default function AnimationTrigger({ routeKey }: { routeKey: string }) {
  useEffect(() => {
    // Naya page load hone ke 150ms baad hum purane animations kill karke naye start karenge
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).refreshAureviaAnimations) {
        (window as any).refreshAureviaAnimations();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [routeKey]);

  return null; // Iska koi visual UI nahi hai
}