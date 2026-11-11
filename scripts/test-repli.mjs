#!/usr/bin/env node
/* Vérifie que le site tient sans aucun hébergeur tiers.
   Prérequis : `npm run build`, puis le site servi (par défaut http://localhost:4180).
   Bloque tout hôte externe, puis contrôle que la page et la démo s'affichent en version locale ;
   rejoue ensuite avec les photos disponibles, une photo manquante et des photos trop lentes. */
import { createRequire } from "node:module";
import zlib from "node:zlib";
const { chromium } = createRequire(import.meta.url)("playwright");
const URL_SITE = process.env.SITE_URL ?? "http://localhost:4180/";

function png() {
  const t = [];
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  const crc = (b) => { let r = 0xffffffff; for (const x of b) r = t[(r ^ x) & 255] ^ (r >>> 8); return (r ^ 0xffffffff) >>> 0; };
  const bloc = (type, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(type), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ih = Buffer.alloc(13); ih.writeUInt32BE(2, 0); ih.writeUInt32BE(3, 4); ih[8] = 8; ih[9] = 6;
  const brut = Buffer.concat([0, 1, 2].map(() => Buffer.from([0, 200, 60, 60, 255, 200, 60, 60, 255])));
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), bloc("IHDR", ih), bloc("IDAT", zlib.deflateSync(brut)), bloc("IEND", Buffer.alloc(0))]);
}

const CAS = [
  { nom: "tous les hôtes tiers en panne", attendu: "locale", reponse: () => "panne" },
  { nom: "photos disponibles", attendu: "distante", reponse: () => "ok" },
  { nom: "une photo manquante", attendu: "locale", reponse: (n) => (n === 7 ? "404" : "ok") },
  { nom: "photos trop lentes (8 s)", attendu: "locale", reponse: () => "lent" },
];

const image = png();
const nav = await chromium.launch();
let echecs = 0;
for (const cas of CAS) {
  const page = await nav.newPage({ viewport: { width: 1280, height: 800 } });
  let n = 0;
  await page.route((u) => !u.href.startsWith(URL_SITE), async (r) => {
    if (!/cdn\.21st\.dev/.test(r.request().url())) return r.abort();
    const quoi = cas.reponse(++n);
    if (quoi === "panne") return r.abort();
    if (quoi === "404") return r.fulfill({ status: 404, body: "" });
    if (quoi === "lent") await new Promise((ok) => setTimeout(ok, 8000));
    return r.fulfill({ status: 200, contentType: "image/png", body: image }).catch(() => {});
  });
  await page.goto(URL_SITE);
  await page.evaluate(() => document.getElementById("demo").scrollIntoView());
  await page.waitForTimeout(9500);
  const rail = page.locator('[data-slot="clothing-rail-hero"]');
  const source = await rail.getAttribute("data-source");
  const pieces = await page.locator("[data-garment]").count();
  const titre = await page.locator("h1").innerText();
  const ok = source === cas.attendu && pieces === 10 && titre.length > 10;
  if (!ok) echecs++;
  console.log(`${ok ? "OK   " : "ÉCHEC"} ${cas.nom} : source=${source} (attendu ${cas.attendu}), pièces=${pieces}`);
  await page.close();
}
await nav.close();
process.exit(echecs ? 1 : 0);
