import { createRequire } from 'module';
const require = createRequire('/Users/joaomarcosom/Dev/Conexxio/proposta-kit/package.json');
const { chromium } = require('playwright');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ locale: 'pt-BR', viewport: { width: 1280, height: 900 } });
await p.goto('https://www.instagram.com/facebodyestetica.bh/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(5000);
try { await p.getByText('mais', { exact: true }).first().click({ timeout: 4000 }); await p.waitForTimeout(1000); } catch (e) { console.log('sem mais') }
const t = await p.evaluate(() => document.body.innerText);
console.log(t.slice(0, t.indexOf('Capilar') + 10));
const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href*="/p/"],a[href*="/reel/"]')].map(a => a.href))]);
console.log('N', links.length);
for (const l of links.slice(5, 24)) { const q = await b.newPage(); try { await q.goto(l, { waitUntil: 'domcontentloaded' }); await q.waitForTimeout(1500); console.log('---', l.split('/').slice(-2,-1)[0], '\n', (await q.evaluate(() => document.querySelector('meta[property="og:title"]')?.content || '')).slice(60, 600)); } catch {} await q.close(); }
const q = await b.newPage(); try { await q.goto('https://bit.ly/faceebody', { waitUntil: 'domcontentloaded', timeout: 20000 }); await q.waitForTimeout(3000); console.log('BITLY ->', q.url()); } catch (e) { console.log('bitly', e.message.slice(0,200)) }
await b.close();
