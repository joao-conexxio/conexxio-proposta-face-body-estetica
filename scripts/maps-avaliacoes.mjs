import { createRequire } from 'module';
const require = createRequire('/Users/joaomarcosom/Dev/Conexxio/proposta-kit/package.json');
const { chromium } = require('playwright');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ locale: 'pt-BR', viewport: { width: 1280, height: 900 } });
await p.goto(process.argv[2], { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(6000); try { await p.locator('a[href*="/maps/place"]').first().click({ timeout: 4000 }); await p.waitForTimeout(5000); } catch {}
await p.getByRole('tab', { name: /Sobre/ }).click(); await p.waitForTimeout(2500);
console.log('=== SOBRE\n', await p.evaluate(() => document.querySelector('div[role="main"]').innerText.slice(0, 3000)));
await p.getByRole('tab', { name: /Avalia/ }).click(); await p.waitForTimeout(3000);
for (let i = 0; i < 12; i++) { await p.evaluate(() => { const s = [...document.querySelectorAll('div[role="main"] div')].find(d => d.scrollHeight > d.clientHeight + 200 && getComputedStyle(d).overflowY !== 'visible'); if (s) s.scrollTop = s.scrollHeight; }); await p.waitForTimeout(1200); }
for (const btn of await p.locator('button:has-text("Mais")').all()) { try { await btn.click({ timeout: 500 }); } catch {} }
const revs = await p.evaluate(() => [...document.querySelectorAll('[data-review-id]')].filter(e => e.querySelector('.wiI7pd')).map(e => { const st = e.querySelector('[role="img"][aria-label*="estrela"]'); return (st?.getAttribute('aria-label')||'?') + ' | ' + (e.querySelector('.d4r55')?.innerText||'') + ' | ' + (e.querySelector('.rsqaWe')?.innerText||'') + ' | ' + e.querySelector('.wiI7pd').innerText.replace(/\n/g,' '); }));
console.log('=== AVALIACOES', revs.length); console.log([...new Set(revs)].join('\n'));
await b.close();
