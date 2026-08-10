import fs from "fs";
import path from "path";
import Script from "next/script";
import PortalFormMount from "@/components/PortalFormMount";
import AnimationTrigger from "@/components/AnimationTrigger"; // 👈 Naya import
import CoverageMapMount from "@/components/CoverageMapMount";

const pageTitle: Record<string, string> = {
  "index.html": "Aurevia Healthcare - Care you can trust",
  "about.html": "About - Aurevia Healthcare",
  "treatments.html": "Treatments - Aurevia Healthcare",
  "how-it-works.html": "How it works - Aurevia Healthcare",
  "locations.html": "Locations - Aurevia Healthcare",
  "voices.html": "Patient voices - Aurevia Healthcare",
};

const routeMap: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about/",
  "treatments.html": "/treatments/",
  "how-it-works.html": "/how-it-works/",
  "locations.html": "/locations/",
  "voices.html": "/voices/",
};

function getPageHtml(fileName: string) {
  const filePath = path.join(process.cwd(), "public", "aurevia", fileName);
  const html = fs.readFileSync(filePath, "utf8");
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const styles = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((match) => match[1])
    .join("\n");

  const bodyHtml = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/href="index\.html#contact"/g, 'href="/#contact"')
    .replace(/href="index\.html/g, 'href="/')
    .replace(
      /href="(about|treatments|how-it-works|locations|voices)\.html/g,
      (_, route) => `href="/${route}/`,
    )
    .replace(/src="assets\//g, 'src="/aurevia/assets/')
    .replace(/href="styles\.css"/g, 'href="/aurevia/styles.css"');

  // Keep the useful process labels (for example, "Step 01 · Talk") while
  // removing decorative section/index prefixes from the legacy static pages.
  const bodyHtmlCleaned = bodyHtml
    .replace(/>(\s*)\[\s*\d{2}\s*\]\s*/g, ">$1")
    .replace(/>(\s*)\/\s*\d{2}\s*(?:[—-]\s*)?/g, ">$1")
    .replace(/>(\s*)\d{2}\s*[—-]\s*/g, ">$1");

  return { bodyHtml: bodyHtmlCleaned, styles };
}

export default function StaticHtmlPage({ fileName }: { fileName: string }) {
  const { bodyHtml, styles } = getPageHtml(fileName);
  const pageSlug = fileName.replace(/\.html$/, "");

  const renderedBodyHtml = bodyHtml
    .replace(/<nav\b[^>]*class="nav"[^>]*>[\s\S]*?<\/nav>/i, "")
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, "")
    .replace(
      /<form\b[^>]*class="form[^>]*>[\s\S]*?<\/form>/i,
      '<div id="react-contact-form-portal"></div>'
    );

  return (
    <>
      <title>{pageTitle[fileName] ?? "Aurevia Healthcare"}</title>
      <link rel="stylesheet" href="/aurevia/styles.css" />
      {styles ? <style dangerouslySetInnerHTML={{ __html: styles }} /> : null}
      
      <main
        className={`aurevia-static-page aurevia-page-${pageSlug}`}
        dangerouslySetInnerHTML={{ __html: renderedBodyHtml }}
      />
      
      <PortalFormMount />
      {fileName === "locations.html" ? <CoverageMapMount /> : null}
      
      {/* 👇 NAYA TRIGGER YAHAN LAGA DIYA HAI 👇 */}
      <AnimationTrigger routeKey={fileName} />

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" strategy="afterInteractive" />
      <Script src="/aurevia/motion.js" strategy="afterInteractive" />
    </>
  );
}

export { routeMap };
