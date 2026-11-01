import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="interior-page" style={{ minHeight: "68vh", display: "grid", placeItems: "center", padding: "140px 24px 80px" }}>
      <section style={{ maxWidth: 620, textAlign: "center" }}>
        <p className="interior-eyebrow" style={{ justifyContent: "center" }}>Aurevia Healthcare</p>
        <h1 style={{ margin: "20px 0 12px", fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(42px, 7vw, 68px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-.04em" }}>We couldn’t find that page.</h1>
        <p style={{ color: "#5d7378", lineHeight: 1.75 }}>The address may have changed. Return home or browse the treatment guide to find the information you need.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-[#237f7c] px-5 text-sm font-semibold text-white">Go to home</Link>
          <Link href="/services/" className="inline-flex min-h-12 items-center rounded-full border border-[#b8d0c9] bg-white px-5 text-sm font-semibold text-[#285566]">Explore treatments</Link>
        </div>
      </section>
    </main>
  );
}
