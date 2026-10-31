import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const locations = {
  chandigarh: { name: "Chandigarh", en: "Planned city · garden avenues", hi: "योजनाबद्ध शहर · हरे-भरे रास्ते", colors: ["#344657", "#2B445F", "#5A7897", "#ECF1F5", "#FAFCFD", "#687786", "#E4EDF4", "#F8FAFC"] },
  "delhi-ncr": { name: "Delhi NCR", en: "Capital region · sandstone avenues", hi: "राजधानी क्षेत्र · बलुआ पत्थर के रास्ते", colors: ["#493D42", "#493243", "#98523E", "#F2EAE5", "#FBF8F5", "#716365", "#F1E5DC", "#FCF8F2"] },
  ghaziabad: { name: "Ghaziabad", en: "Urban greenway · river corridor", hi: "शहरी हरित पट्टी · नदी किनारा", colors: ["#374739", "#3F5731", "#6B873E", "#F0F3E8", "#FBFCF8", "#67715D", "#E7EDD9", "#FAFBF4"] },
  noida: { name: "Noida", en: "Modern skyline · open green spaces", hi: "आधुनिक स्काईलाइन · खुले हरित क्षेत्र", colors: ["#224253", "#1D3E62", "#1A7288", "#E6F2F4", "#F6FAFB", "#597078", "#E1EEF3", "#F8FBFC"] },
  mumbai: { name: "Mumbai", en: "Coastal city · Arabian Sea", hi: "समुद्री शहर · अरब सागर", colors: ["#254453", "#183D59", "#A74550", "#E8F1F1", "#F7FAF9", "#5C7075", "#E5F0ED", "#FEF7F2"] },
  bangalore: { name: "Bengaluru", en: "Garden city · modern skyline", hi: "गार्डन सिटी · आधुनिक स्काईलाइन", colors: ["#33483E", "#244A3B", "#397B60", "#E8F2EB", "#F7FAF6", "#5F7267", "#E1EFE5", "#F8FBF4"] },
  pune: { name: "Pune", en: "Heritage gateway · Deccan hills", hi: "ऐतिहासिक धरोहर · दक्कन की पहाड़ियाँ", colors: ["#403F59", "#3F3A75", "#625F9B", "#EFEEF7", "#FAF9FC", "#68677B", "#ECEBF6", "#FCFBFE"] },
  telangana: { name: "Telangana", en: "Hyderabad · Deccan heritage", hi: "हैदराबाद · दक्कन की विरासत", colors: ["#463F58", "#393454", "#76527E", "#F0ECF3", "#FBF9FC", "#706777", "#EFE9F1", "#FCF9FC"] },
  ahmedabad: { name: "Ahmedabad", en: "Sabarmati riverfront · sandstone heritage", hi: "साबरमती रिवरफ्रंट · पत्थर की विरासत", colors: ["#4D4337", "#53402B", "#985A2B", "#F3EEE5", "#FBF9F4", "#73695B", "#F1E7D8", "#FCFAF4"] },
};

const treatmentScenes = {
  cataract: { image: "cataract-bg.webp", en: "Cataract care", hi: "मोतियाबिंद का उपचार", ink: "#23414A", navy: "#295A68", muted: "#5D7174", accent: "#2D8290", wash: "#E4F1F0", glow: "#F6FAF9" },
  lasik: { image: "lasik-bg.webp", en: "LASIK", hi: "लेसिक (LASIK)", ink: "#31395E", navy: "#354882", muted: "#626B89", accent: "#5968AC", wash: "#ECEFFC", glow: "#F8F8FD" },
  sinus: { image: "sinus-bg.webp", en: "Sinus care", hi: "साइनस की देखभाल", ink: "#324B42", navy: "#315F51", muted: "#5F7469", accent: "#438372", wash: "#E8F2EF", glow: "#F7FAF8" },
  tonsillectomy: { image: "tonsil-bg.jpg", en: "Tonsillectomy", hi: "टॉन्सिल सर्जरी", ink: "#40533B", navy: "#496344", muted: "#697664", accent: "#728C5B", wash: "#EDF2E8", glow: "#F9FAF5" },
  septoplasty: { image: "septoplasty-bg.jpg", en: "Septoplasty", hi: "सेप्टोप्लास्टी", ink: "#344B5A", navy: "#34576B", muted: "#5D737D", accent: "#53758F", wash: "#E8F0F2", glow: "#F7FAFA" },
  "ear-perforation": { image: "ear-bg.jpg", en: "Eardrum repair", hi: "कान के पर्दे की मरम्मत", ink: "#2C4D56", navy: "#305F6A", muted: "#5B7479", accent: "#308A99", wash: "#E5F1F3", glow: "#F7FBFC" },
  rhinoplasty: { image: "rhinoplasty-bg.jpg", en: "Rhinoplasty", hi: "राइनोप्लास्टी", ink: "#49394A", navy: "#654F68", muted: "#74677A", accent: "#90638D", wash: "#F0EAF1", glow: "#FBF8FC" },
  gynecomastia: { image: "gynecomastia-bg.jpg", en: "Gynecomastia care", hi: "गाइनेकोमैस्टिया का उपचार", ink: "#4E3A41", navy: "#73505A", muted: "#7C696E", accent: "#B36C74", wash: "#F5EAEB", glow: "#FCF8F8" },
  "kidney-stone": { image: "kidney-bg.jpg", en: "Kidney stone care", hi: "किडनी स्टोन का उपचार", ink: "#514331", navy: "#785536", muted: "#786A57", accent: "#A66F45", wash: "#F3ECE4", glow: "#FCF9F4" },
  dental: { image: "dental-bg.jpg", en: "Dental care", hi: "दंत चिकित्सा", ink: "#334844", navy: "#3D6D67", muted: "#60736E", accent: "#4A827D", wash: "#E8F1EF", glow: "#F7FAF9" },
};

const treatments = ["cataract", "lasik", "sinus", "tonsillectomy", "septoplasty", "ear-perforation", "rhinoplasty", "gynecomastia", "kidney-stone", "dental"];
const delhiTreatmentImages = {
  cataract: "/aurevia/treatments/cataract.webp",
  lasik: "/aurevia/treatments/lasik.webp",
  sinus: "/aurevia/treatments/sinus.webp",
  tonsillectomy: "/aurevia/treatments/tonsillectomy.webp",
  septoplasty: "/aurevia/treatments/rhinoplasty.webp",
  "ear-perforation": "/services/ear_02.PNG",
  rhinoplasty: "/services/rhinoplasty_02.PNG",
  gynecomastia: "/aurevia/treatments/gynecomastia.webp",
  "kidney-stone": "/aurevia/treatments/kidney-stones.webp",
  dental: "/services/dental_02.PNG",
};
const routes = ["locations", "hi/locations"];
for (const location of Object.keys(locations)) {
  routes.push(`locations/${location}`, `hi/locations/${location}`);
  for (const treatment of treatments) routes.push(`services/${treatment}/${location}`, `hi/services/${treatment}/${location}`);
}

const injectedCss = `<style id="location-scene-capture-styles">
.care-region-hero,.care-detail-hero{background:radial-gradient(circle at 82% 32%,rgba(255,255,255,.82),transparent 23rem),linear-gradient(125deg,var(--care-region-wash) 0%,var(--care-mint) 54%,var(--care-region-highlight) 100%)}
.care-region-hero h1,.care-detail-hero h1{color:var(--care-navy)!important}.care-region-kicker,.care-detail-eyebrow,.care-section-kicker{color:var(--care-teal)!important}.care-button-primary{background:var(--care-teal)!important}
.care-region-hero-art{width:min(100%,500px);aspect-ratio:1.12;justify-self:center;position:relative;overflow:hidden;border-radius:24px 76px 24px 24px;background:var(--care-region-wash);box-shadow:0 28px 66px color-mix(in srgb,var(--care-navy) 18%,transparent)}
.care-region-hero-image,.care-detail-image{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important}.care-region-hero-art:before{content:"";position:absolute;z-index:2;inset:14px;border:1px solid rgba(255,255,255,.46);border-radius:17px 62px 17px 17px;pointer-events:none}.care-region-photo-shade{position:absolute!important;inset:48% 0 0!important;background:linear-gradient(transparent,rgba(15,35,45,.48))!important}.care-region-art-label{position:absolute!important;z-index:3!important;left:25px!important;right:22px!important;bottom:23px!important;color:#fff!important;background:transparent!important;border:0!important;border-radius:0!important;padding:0!important;box-shadow:none!important;display:flex!important;align-items:baseline!important;justify-content:space-between!important;gap:12px!important;text-shadow:0 1px 8px rgba(0,0,0,.55)!important}.care-region-art-label strong{font-size:22px!important}.care-region-art-label span{font-size:12px!important}
.care-detail-image-wrap{background:var(--care-region-wash)!important;box-shadow:0 28px 65px color-mix(in srgb,var(--care-navy) 18%,transparent)!important}.care-image-caption{z-index:2}
.care-treatment-card-image{background-size:cover!important;background-position:center!important}.care-treatment-card-image>img{visibility:hidden!important}
.care-treatment-detail .care-detail-hero{background:radial-gradient(circle at 84% 23%,color-mix(in srgb,var(--care-location-accent) 14%,transparent),transparent 25rem),linear-gradient(125deg,var(--care-location-wash) 0%,var(--care-mint) 56%,var(--care-region-highlight) 100%)}.care-treatment-detail .care-detail-eyebrow,.care-treatment-detail .care-section-kicker{color:var(--care-location-accent)!important}.care-treatment-detail .care-button-primary{background:var(--care-location-accent)!important}.care-treatment-detail .care-detail-image-wrap{background:var(--care-location-wash)!important;box-shadow:0 28px 65px color-mix(in srgb,var(--care-location-accent) 20%,transparent)!important}.care-treatment-detail .care-next-card{background:color-mix(in srgb,var(--care-location-wash) 82%,white)!important;border:1px solid color-mix(in srgb,var(--care-location-accent) 18%,white)!important}.care-treatment-detail .care-next-icon{color:var(--care-location-accent)!important}.care-treatment-detail .care-process-section{background:color-mix(in srgb,var(--care-location-wash) 68%,white)!important}.care-treatment-detail .care-process-index{background:var(--care-location-accent)!important}.care-treatment-detail .care-image-caption span{color:var(--care-treatment-accent)!important}.care-treatment-detail .care-related-section{background:linear-gradient(120deg,var(--care-location-navy),color-mix(in srgb,var(--care-location-navy) 72%,var(--care-location-accent)))!important}.care-detail-location-stamp{position:absolute;z-index:2;top:18px;left:18px;display:flex;align-items:center;gap:10px;max-width:calc(100% - 36px);padding:8px 13px 8px 8px;border:1px solid rgba(255,255,255,.76);border-radius:16px;color:var(--care-location-navy);background:rgba(255,255,255,.9);box-shadow:0 10px 28px rgba(24,46,57,.12);backdrop-filter:blur(10px)}.care-detail-location-stamp img{width:58px;height:58px;flex:0 0 auto;object-fit:cover;border-radius:11px}.care-detail-location-stamp>span{display:grid;gap:3px;min-width:0}.care-detail-location-stamp strong{font-size:13px}.care-detail-location-stamp small{overflow:hidden;color:var(--care-location-accent);font-size:10px;text-overflow:ellipsis;white-space:nowrap}
@media(max-width:700px){.care-region-hero-art{width:min(78vw,290px);aspect-ratio:1.06;border-radius:18px 52px 18px 18px}.care-region-art-label{left:18px;right:16px;bottom:18px;display:block}.care-region-art-label span{display:block;margin-top:3px}}
</style>`;

function escapeAttr(value) { return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;"); }
function varStyle(colors) {
  const names = ["--care-ink", "--care-navy", "--care-teal", "--care-mint", "--care-soft", "--care-muted", "--care-region-wash", "--care-region-highlight"];
  return names.map((name, index) => `${name}:${colors[index]}`).join(";");
}

for (const route of routes) {
  const file = path.join(out, route, "index.html");
  const parts = route.split("/");
  const isHindi = parts[0] === "hi";
  const isTreatment = parts[0] === "services" || (isHindi && parts[1] === "services");
  const locationSlug = isTreatment ? parts[isHindi ? 3 : 2] : parts[isHindi ? 2 : 1];
  const treatmentSlug = isTreatment ? parts[isHindi ? 2 : 1] : "";
  const procedure = isTreatment ? treatmentScenes[treatmentSlug] : null;
  let html;
  try { html = await fs.readFile(file, "utf8"); }
  catch {
    if (locationSlug !== "bangalore") throw new Error(`Static export page is missing: ${route}`);
    const templateRoute = route.replaceAll("bangalore", "mumbai");
    html = await fs.readFile(path.join(out, templateRoute, "index.html"), "utf8");
    html = html.replaceAll("mumbai", "bangalore").replaceAll("Mumbai", "Bengaluru");
  }
  const location = locations[locationSlug];
  if (!location) continue;
  const alt = isHindi ? location.hi : location.en;
  const scene = `<img alt="${escapeAttr(alt)}" loading="eager" decoding="async" class="care-region-hero-image" src="/location-scenes/${locationSlug}.svg"/><div class="care-region-photo-shade"></div><div class="care-region-art-label"><strong>${location.name}</strong><span>${alt}</span></div>`;
  const procedurePalette = location.colors;
  const procedureVars = procedure ? `;--care-treatment-accent:${procedure.accent};--care-treatment-wash:${procedure.wash};--care-treatment-glow:${procedure.glow};--care-location-wash:${location.colors[6]};--care-location-accent:${location.colors[2]};--care-location-navy:${location.colors[1]}` : "";
  html = html.replace(/(<main class="care-landing[^\"]*)/,
    (match) => `${match} care-location-${locationSlug}${isHindi ? " care-landing-hi" : ""}" style="${varStyle(procedurePalette)}${procedureVars}"`);
  html = html.replace("</head>", `${injectedCss}</head>`);
  if (!isTreatment) {
    html = html.replace(/<div class="care-region-hero-art"[^>]*>[\s\S]*?<\/div><a class="care-language-switch"/,
      `<div class="care-region-hero-art" role="img" aria-label="${escapeAttr(alt)}">${scene}</div><a class="care-language-switch"`);
  } else {
    const treatmentLabel = isHindi ? procedure.hi : procedure.en;
    const treatmentAlt = `${treatmentLabel} · ${location.name}`;
    const locationCaption = isHindi ? location.hi : location.en;
    const treatmentImage = locationSlug === "delhi-ncr" ? delhiTreatmentImages[treatmentSlug] ?? `/treatments/${procedure.image}` : `/treatments/${procedure.image}`;
    html = html.replace(/(<div class="care-detail-image-wrap">)<img[^>]*class="care-detail-image"[^>]*\/>/,
      `$1<img alt="${escapeAttr(treatmentAlt)}" decoding="async" class="care-detail-image" src="${treatmentImage}"/>`);
    html = html.replace('<div class="care-image-caption">',
      `<div class="care-detail-location-stamp"><img alt="" src="/location-scenes/${locationSlug}.svg"/><span><strong>${location.name}</strong><small>${escapeAttr(locationCaption)}</small></span></div><div class="care-image-caption">`);
    html = html.replace(/<div class="care-image-caption"><span>[^<]*<\/span><strong>[^<]*<\/strong><\/div>/,
      `<div class="care-image-caption"><span>${treatmentLabel}</span><strong>${location.name}</strong></div>`);
  }
  html = html.replace(/<div class="care-treatment-card-image"><img([^>]*?)src="([^"]+)"([^>]*)>/g,
    (_match, before, src, after) => `<div class="care-treatment-card-image" style="background-image:url('${src}')"><img${before}src="${src}"${after}>`);
  html = html.replaceAll('loading="lazy"', 'loading="eager"');
  html = html.replaceAll("8 major regions", "9 major regions").replaceAll("8 क्षेत्रों", "9 क्षेत्रों");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html, "utf8");
}

for (const route of ["locations", "hi/locations"]) {
  const file = path.join(out, route, "index.html");
  let html = await fs.readFile(file, "utf8");
  if (!html.includes("/locations/bangalore/")) {
    const gridStart = html.indexOf('<div class="care-location-grid">');
    const gridEnd = html.indexOf("</div>", gridStart);
    const cards = html.slice(gridStart, gridEnd);
    const matches = [...cards.matchAll(/<a class="care-location-card"[\s\S]*?<\/a>/g)];
    if (!matches.length) throw new Error(`Could not find location cards in ${route}`);
    const template = matches[matches.length - 1][0];
    const newCard = template.replaceAll("ahmedabad", "bangalore").replaceAll("Ahmedabad", "Bengaluru");
    html = `${html.slice(0, gridEnd)}${newCard}${html.slice(gridEnd)}`;
  }
  html = html.replaceAll("8 major regions", "9 major regions").replaceAll("8 क्षेत्रों", "9 क्षेत्रों");
  await fs.writeFile(file, html, "utf8");
}

console.log(`Updated ${routes.length} exported pages with city scenes and local themes for screenshot capture.`);
