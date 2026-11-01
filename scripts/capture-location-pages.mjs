import fs from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportRoot = path.join(repoRoot, "out");
const screenshotRoot = path.join(repoRoot, "artifacts", process.argv.includes("--mobile-check") ? "mobile-page-screenshots" : "location-page-screenshots-current");
const browserPath = process.env.AUREVIA_BROWSER ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const locations = ["chandigarh", "delhi-ncr", "ghaziabad", "noida", "mumbai", "bangalore", "pune", "telangana", "ahmedabad"];
const treatments = ["cataract", "lasik", "sinus", "tonsillectomy", "septoplasty", "ear-perforation", "rhinoplasty", "gynecomastia", "kidney-stone", "dental"];
const routes = ["/locations/", "/hi/locations/"];
for (const location of locations) {
  routes.push(`/locations/${location}/`, `/hi/locations/${location}/`);
  for (const treatment of treatments) {
    routes.push(`/services/${treatment}/${location}/`, `/hi/services/${treatment}/${location}/`);
  }
}
const popupCheck = process.argv.includes("--popup-check");
const heroCheck = process.argv.includes("--hero-check");
const mapCheck = process.argv.includes("--map-check");
const mobileCheck = process.argv.includes("--mobile-check");
const desktopCheck = process.argv.includes("--desktop-check");
const viewportWidth = mobileCheck ? 390 : 1440;
const viewportHeight = mobileCheck ? 844 : 1000;
const selectedRoutes = heroCheck
  ? ["/"]
  : popupCheck
  ? ["/"]
  : mobileCheck
  ? ["/", "/treatments/", "/locations/", "/locations/mumbai/", "/services/cataract/mumbai/", "/services/cataract/delhi-ncr/", "/services/lasik/bangalore/"]
  : desktopCheck
  ? ["/services/cataract/mumbai/", "/services/cataract/delhi-ncr/", "/services/lasik/bangalore/"]
  : process.argv.includes("--map-check")
  ? ["/locations/", "/hi/locations/"]
  : process.argv.includes("--design-check")
  ? ["/", "/about/", "/treatments/", "/how-it-works/", "/voices/", "/locations/", "/hi/locations/", "/locations/mumbai/", "/services/cataract/mumbai/", "/services/cataract/delhi-ncr/", "/services/lasik/bangalore/", "/photo-credits/"]
  : process.argv.includes("--bangalore-check")
  ? ["/locations/bangalore/", "/hi/locations/bangalore/", "/services/lasik/bangalore/", "/hi/services/lasik/bangalore/"]
  : process.argv.includes("--city-layout-check")
  ? locations.flatMap((location) => [`/services/cataract/${location}/`, `/hi/services/cataract/${location}/`])
  : process.argv.includes("--delhi-treatments")
  ? treatments.flatMap((treatment) => [`/services/${treatment}/delhi-ncr/`, `/hi/services/${treatment}/delhi-ncr/`])
  : process.argv.includes("--location-treatment-check")
  ? ["/services/cataract/mumbai/", "/services/cataract/delhi-ncr/", "/hi/services/cataract/mumbai/", "/hi/services/cataract/delhi-ncr/", "/services/lasik/mumbai/", "/services/lasik/delhi-ncr/"]
  : process.argv.includes("--treatment-check")
  ? ["/services/cataract/mumbai/", "/services/lasik/mumbai/", "/services/sinus/mumbai/", "/services/rhinoplasty/mumbai/", "/hi/services/lasik/mumbai/"]
  : process.argv.includes("--mumbai-check")
  ? ["/locations/mumbai/", "/hi/locations/mumbai/", "/services/cataract/mumbai/", "/hi/services/cataract/mumbai/"]
  : process.argv.includes("--directories-only") ? routes.slice(0, 2)
  : process.argv.includes("--treatments-only") ? routes.filter((route) => route.includes("/services/"))
  : routes;
const useDevServer = process.argv.includes("--dev");
const useLiveStatic = process.argv.includes("--live-static");
const useRuntimeServer = useDevServer || useLiveStatic;

const mime = new Map([
  [".html", "text/html; charset=utf-8"], [".txt", "text/plain; charset=utf-8"], [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".png", "image/png"],
  [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"], [".webp", "image/webp"], [".svg", "image/svg+xml"], [".ico", "image/x-icon"],
]);

async function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

function safeFileForUrl(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  let requested = path.resolve(exportRoot, `.${decoded}`);
  if (!requested.startsWith(exportRoot + path.sep) && requested !== exportRoot) return null;
  return requested;
}

async function sendStatic(req, res) {
  const pathname = new URL(req.url, "http://local").pathname;
  let target = safeFileForUrl(pathname);
  if (!target) { res.writeHead(403).end("Forbidden"); return; }
  try {
    const stat = await fs.stat(target);
    if (stat.isDirectory()) target = path.join(target, "index.html");
  } catch {
    target = path.join(target, "index.html");
  }
  if (!target.startsWith(exportRoot + path.sep)) { res.writeHead(403).end("Forbidden"); return; }
  try {
    const body = await fs.readFile(target);
    res.writeHead(200, { "Content-Type": mime.get(path.extname(target).toLowerCase()) ?? "application/octet-stream", "Cache-Control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
}

const server = http.createServer((req, res) => { void sendStatic(req, res); });
const sitePort = await freePort();
const cdpPort = await freePort();
const profileDir = await fs.mkdtemp(path.join(os.tmpdir(), "aurevia-edge-capture-"));
let edge;
let nextDev;
let socket;
const pending = new Map();
const events = new Map();
let nextId = 0;

function cdp(method, params = {}) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

function waitForEvent(name, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { events.delete(name); reject(new Error(`Timed out waiting for ${name}`)); }, timeoutMs);
    events.set(name, (payload) => { clearTimeout(timer); resolve(payload); });
  });
}

async function openDebugSocket() {
  const versionUrl = `http://127.0.0.1:${cdpPort}/json/version`;
  let version;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { version = await (await fetch(versionUrl)).json(); break; } catch { await new Promise((resolve) => setTimeout(resolve, 250)); }
  }
  if (!version) throw new Error("Edge remote debugging endpoint did not start.");
  const target = await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, { method: "PUT" }).then((response) => response.json());
  socket = new WebSocket(target.webSocketDebuggerUrl);
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const item = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) item.reject(new Error(message.error.message));
      else item.resolve(message.result);
    } else if (message.method && events.has(message.method)) {
      const resolve = events.get(message.method);
      events.delete(message.method);
      resolve(message.params);
    }
  });
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  return target;
}

function safeFilename(route) {
  return route.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "__") || "locations-index";
}

try {
  await fs.mkdir(screenshotRoot, { recursive: true });
  if (useDevServer) {
    const nextCli = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next");
    nextDev = spawn(process.execPath, [nextCli, "dev", "--webpack", "--port", String(sitePort)], {
      cwd: repoRoot, stdio: "ignore", windowsHide: true,
    });
    let ready = false;
    for (let attempt = 0; attempt < 180; attempt++) {
      try {
        const response = await fetch(`http://127.0.0.1:${sitePort}/locations/mumbai/`);
        if (response.ok) { ready = true; break; }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (!ready) throw new Error("Next.js development server did not become ready.");
  } else {
    await new Promise((resolve) => server.listen(sitePort, "127.0.0.1", resolve));
  }
  edge = spawn(browserPath, [
    "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
    `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profileDir}`, "about:blank",
  ], { stdio: "ignore", windowsHide: true });
  edge.on("error", (error) => console.error(`Edge launch failed: ${error.message}`));
  await openDebugSocket();
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  if (!useRuntimeServer) await cdp("Emulation.setScriptExecutionDisabled", { value: true });
  await cdp("Emulation.setDeviceMetricsOverride", { width: viewportWidth, height: viewportHeight, deviceScaleFactor: 1, mobile: mobileCheck });
  await cdp("Emulation.setDefaultBackgroundColorOverride", { color: { r: 248, g: 250, b: 249, a: 1 } });

  for (const [index, route] of selectedRoutes.entries()) {
    const loaded = waitForEvent("Page.loadEventFired", useRuntimeServer ? 180000 : 20000);
    await cdp("Page.navigate", { url: `http://127.0.0.1:${sitePort}${route}` });
    await loaded;
    await cdp("Runtime.evaluate", {
      expression: "document.querySelectorAll('img[loading=lazy]').forEach(image => { image.loading = 'eager'; }); Promise.race([Promise.all(Array.from(document.images, image => image.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 1800))])",
      awaitPromise: true,
      returnByValue: true,
    });
    let width, height;
    if (useRuntimeServer) {
      await cdp("Runtime.evaluate", {
        expression: "Promise.race([Promise.all([document.fonts.ready, ...Array.from(document.images, image => image.decode().catch(() => {}))]), new Promise(resolve => setTimeout(resolve, 900))])",
        awaitPromise: true,
        returnByValue: true,
      });
      await cdp("Runtime.evaluate", {
        expression: "document.querySelectorAll('.js-reveal').forEach(node => { node.style.opacity = '1'; node.style.transform = 'none'; }); document.querySelectorAll('.js-split').forEach(node => { node.style.visibility = 'visible'; });",
        returnByValue: true,
      });
      if (!popupCheck) {
        await cdp("Runtime.evaluate", {
          expression: "window.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})); new Promise(resolve => setTimeout(resolve, 250))",
          awaitPromise: true,
          returnByValue: true,
        });
      } else {
        await cdp("Runtime.evaluate", {
          expression: "new Promise(resolve => setTimeout(resolve, 900))",
          awaitPromise: true,
          returnByValue: true,
        });
      }
      if (mapCheck) {
        await cdp("Runtime.evaluate", {
          expression: "new Promise(resolve => setTimeout(resolve, 5500))",
          awaitPromise: true,
          returnByValue: true,
        });
      }
      const metrics = await cdp("Runtime.evaluate", { expression: "({width: document.documentElement.scrollWidth, height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)})", returnByValue: true });
      ({ width, height } = metrics.result.value);
    } else {
      await cdp("Runtime.evaluate", {
        expression: "Promise.race([Promise.all(Array.from(document.images, image => image.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 2500))])",
        awaitPromise: true,
        returnByValue: true,
      });
      let metrics = await cdp("Page.getLayoutMetrics");
      width = metrics.cssContentSize.width;
      height = metrics.cssContentSize.height;
      await cdp("Emulation.setDeviceMetricsOverride", { width: viewportWidth, height: Math.min(Math.ceil(height), 16000), deviceScaleFactor: 1, mobile: mobileCheck });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      metrics = await cdp("Page.getLayoutMetrics");
      width = metrics.cssContentSize.width;
      height = metrics.cssContentSize.height;
    }
    const image = await cdp("Page.captureScreenshot", {
      format: "png", fromSurface: true, captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: Math.max(viewportWidth, width), height: heroCheck || popupCheck ? viewportHeight : height, scale: 1 },
    });
    const filename = popupCheck ? "consultation-popup" : heroCheck ? "homepage-hero" : safeFilename(route);
    await fs.writeFile(path.join(screenshotRoot, `${filename}.png`), Buffer.from(image.data, "base64"));
    if ((index + 1) % 20 === 0 || index + 1 === selectedRoutes.length) console.log(`Captured ${index + 1}/${selectedRoutes.length}: ${route}`);
  }
  console.log(`Saved ${selectedRoutes.length} full-page screenshots to ${screenshotRoot}`);
} finally {
  if (socket && socket.readyState === WebSocket.OPEN) socket.close();
  if (edge && !edge.killed) edge.kill();
  if (nextDev && !nextDev.killed) nextDev.kill();
  if (server.listening) await new Promise((resolve) => server.close(resolve));
  await fs.rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
