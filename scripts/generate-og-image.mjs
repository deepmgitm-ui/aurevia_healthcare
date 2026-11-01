import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const output = path.join(process.cwd(), "public", "opengraph-image.png");
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e9f4ef"/><stop offset=".62" stop-color="#fbf7ee"/><stop offset="1" stop-color="#f3e4d9"/></linearGradient>
    <linearGradient id="orb" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#62a99b" stop-opacity=".22"/><stop offset="1" stop-color="#dfb18f" stop-opacity=".28"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#paper)"/>
  <circle cx="1080" cy="480" r="260" fill="url(#orb)"/>
  <circle cx="1060" cy="180" r="145" fill="#fff" fill-opacity=".35"/>
  <rect x="78" y="74" width="58" height="58" rx="18" fill="#fff"/>
  <path d="M107 87c-12 14-17 25-12 34 4 8 17 9 24 1 6-8 0-21-12-35Z" fill="#2b8179"/>
  <text x="156" y="115" fill="#19414f" font-family="Arial,sans-serif" font-size="30" font-weight="700">Aurevia Healthcare</text>
  <text x="78" y="293" fill="#173f4e" font-family="Georgia,serif" font-size="74" font-weight="400" letter-spacing="-2">Care, coordinated</text>
  <text x="78" y="378" fill="#287e78" font-family="Georgia,serif" font-size="74" font-style="italic" font-weight="400" letter-spacing="-2">around you.</text>
  <text x="82" y="452" fill="#58737a" font-family="Arial,sans-serif" font-size="26">Specialist guidance across India</text>
</svg>`;

await fs.mkdir(path.dirname(output), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(output);
console.log(`Generated ${output}`);
