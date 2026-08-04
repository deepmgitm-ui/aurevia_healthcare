import fs from "fs";
import path from "path";
import Link from "next/link";
import Script from "next/script";
import AnimationTrigger from "@/components/AnimationTrigger";
import PortalFormMount from "@/components/PortalFormMount";
import { orthopedicGeneralSurgeries, orthopedicSurgeryCategories } from "./treatmentsData";

function getTreatmentsFragments() {
  const filePath = path.join(process.cwd(), "public", "aurevia", "treatments.html");
  const html = fs.readFileSync(filePath, "utf8");
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const styles = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((match) => match[1])
    .join("\n");

  const startMarker = "<!-- 10 ORTHOPEDIC -->";

  let bodyHtml = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/href="index\.html#contact"/g, 'href="/#contact"')
    .replace(/href="index\.html/g, 'href="/')
    .replace(
      /href="(about|treatments|how-it-works|locations|voices)\.html/g,
      (_, route) => `href="/${route}/`,
    )
    .replace(/src="assets\//g, 'src="/aurevia/assets/')
    .replace(/href="styles\.css"/g, 'href="/aurevia/styles.css"')
    .replace(/<nav\b[^>]*class="nav"[^>]*>[\s\S]*?<\/nav>/i, "")
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, "")
    .replace(
      /<form\b[^>]*class="form[^>]*>[\s\S]*?<\/form>/i,
      '<div id="react-contact-form-portal"></div>',
    );

  const articleStart = bodyHtml.indexOf(startMarker);
  const articleEnd = articleStart >= 0 ? bodyHtml.indexOf("</article>", articleStart) + "</article>".length : -1;

  if (articleStart < 0 || articleEnd < 0) {
    throw new Error("Could not locate the final treatment article.");
  }

  return {
    beforeOrthopedic: bodyHtml.slice(0, articleStart),
    afterOrthopedic: bodyHtml.slice(articleEnd),
    styles,
  };
}

function SurgeryLink({ children }: { children: string }) {
  return (
    <Link href="/#contact" className="ortho-surgery-link">
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function OrthopedicArticle() {
  return (
    <article id="orthopedic" className="proc light">
      <div className="wrap">
        <div className="proc-head">
          <div className="num">/ 10 - Orthopedic surgery</div>
          <h2 className="js-split">
            Orthopedic <em>care</em>
          </h2>
          <div className="icon">
            <svg viewBox="0 0 64 64">
              <path d="M20 13 C26 19 28 27 27 36 C26 45 20 50 14 51" />
              <path d="M44 13 C38 19 36 27 37 36 C38 45 44 50 50 51" />
              <path d="M27 34 L37 34 M25 42 L39 42" />
              <circle cx="32" cy="34" r="5" />
            </svg>
          </div>
        </div>

        <figure className="proc-media js-reveal">
          <img
            src="/aurevia/treatments/orthopedic.png"
            alt="Orthopedic consultation with joint model and scan review"
            loading="lazy"
          />
          <figcaption>
            <span>Joint, spine and sports care</span>
            <span>Senior orthopedic pathways</span>
          </figcaption>
        </figure>

        <div className="proc-body">
          <p className="overview js-reveal">
            Orthopedic care covers bones, joints, ligaments, tendons, spine conditions, sports injuries, pediatric
            corrections and fracture management. Aurevia coordinates evaluation, imaging review, hospital planning and
            procedure guidance with senior orthopedic surgeons across replacement, arthroscopy, trauma and spine care.
          </p>
          <aside className="proc-aside js-reveal">
            <div className="row">
              <span className="k">Duration</span>
              <span className="v">Procedure-specific</span>
            </div>
            <div className="row">
              <span className="k">Technique</span>
              <span className="v">Open / arthroscopic</span>
            </div>
            <div className="row">
              <span className="k">Stay</span>
              <span className="v">Day-care to short stay</span>
            </div>
            <div className="row">
              <span className="k">Recovery</span>
              <span className="v">Guided rehab plan</span>
            </div>
            <div className="row">
              <span className="k">Success rate</span>
              <span className="v">High with right case selection</span>
            </div>
            <Link href="/#contact" className="cta">
              Book free consultation →
            </Link>
          </aside>
        </div>

        <div className="ortho-categories">
          {orthopedicSurgeryCategories.map((category) => (
            <section className="ortho-category" key={category.title}>
              <div className="k">{category.title}</div>
              <div className="ortho-surgery-grid">
                {category.items.map((item) => (
                  <SurgeryLink key={`${category.title}-${item}`}>{item}</SurgeryLink>
                ))}
              </div>
            </section>
          ))}

          <section className="ortho-category ortho-general">
            <div className="k">General / Uncategorized List</div>
            <div className="ortho-surgery-grid">
              {orthopedicGeneralSurgeries.map((item) => (
                <SurgeryLink key={`general-${item}`}>{item}</SurgeryLink>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

export default function TreatmentsPage() {
  const { beforeOrthopedic, afterOrthopedic, styles } = getTreatmentsFragments();

  return (
    <>
      <title>Treatments - Aurevia Healthcare</title>
      <link rel="stylesheet" href="/aurevia/styles.css" />
      {styles ? <style dangerouslySetInnerHTML={{ __html: styles }} /> : null}

      <main className="aurevia-static-page">
        <div dangerouslySetInnerHTML={{ __html: beforeOrthopedic }} />
        <OrthopedicArticle />
        <div dangerouslySetInnerHTML={{ __html: afterOrthopedic }} />
      </main>

      <PortalFormMount />
      <AnimationTrigger routeKey="treatments.html" />

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" strategy="afterInteractive" />
      <Script src="/aurevia/motion.js" strategy="afterInteractive" />
    </>
  );
}
