import { createRequire } from 'module';
const require = createRequire('/Users/joaomarcosom/Dev/Conexxio/proposta-kit/package.json');
const { chromium } = require('playwright');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ locale: 'pt-BR', viewport: { width: 1280, height: 900 } });
await p.goto('https://www.instagram.com/facebodyestetica.bh/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(5000);
const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href*="/p/"],a[href*="/reel/"]')].map(a => a.href))]);
for (const l of links) { const q = await b.newPage(); try { await q.goto(l, { waitUntil: 'domcontentloaded' }); await q.waitForTimeout(1500); console.log('---', l.split('/').slice(-2,-1)[0], '\n', (await q.evaluate(() => document.querySelector('meta[property="og:title"]')?.content || ''))); } catch {} await q.close(); }
await b.close();
