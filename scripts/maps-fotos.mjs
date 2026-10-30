import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire('/Users/joaomarcosom/Dev/Conexxio/proposta-kit/package.json');
const { chromium } = require('playwright');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ locale: 'pt-BR', viewport: { width: 1280, height: 900 } });
await p.goto(process.argv[2], { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(7000); try { await p.locator('a[href*="/maps/place"]').first().click({ timeout: 4000 }); await p.waitForTimeout(5000); } catch {}
const srcs = new Set();
const grab = async () => (await p.evaluate(() => [...document.querySelectorAll('img, [style*="background-image"]')].map(e => e.src || (getComputedStyle(e).backgroundImage.match(/url\("?(.*?)"?\)/)||[])[1]).filter(s => s && /googleusercontent/.test(s)))).forEach(s => srcs.add(s));
await grab();
try { await p.locator('button[aria-label^="Foto"]').first().click({ timeout: 5000 }); } catch { try { await p.locator('div[role="main"] img').first().click({ timeout: 5000 }); } catch(e) { console.log('no click', e.message) } }
await p.waitForTimeout(5000);
for (let i = 0; i < 25; i++) { await grab(); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); }
await p.screenshot({ path: 'maps-galeria.png' });
const list = [...srcs].filter(s => !/w32-h32|=s32|w36|w40/.test(s));
console.log(list.length);
let n = 0;
for (const s of list) {
  const big = s.replace(/=w\d+-h\d+[^&]*$/, '=w1600-h1600-k-no').replace(/=s\d+[^&]*$/, '=s1600');
  try { const r = await p.request.get(big); const buf = await r.body(); if (buf.length > 8000) { fs.writeFileSync(`maps-fotos/m-${String(++n).padStart(2,'0')}.jpg`, buf); console.log(n, buf.length, big.slice(0,110)); } } catch(e) {}
}
await b.close();
