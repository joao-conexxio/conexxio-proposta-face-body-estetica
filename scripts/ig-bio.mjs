import { createRequire } from 'module';
const require = createRequire('/Users/joaomarcosom/Dev/Conexxio/proposta-kit/package.json');
const { chromium } = require('playwright');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ locale: 'pt-BR', viewport: { width: 1280, height: 900 } });
await p.goto('https://www.instagram.com/facebodyestetica.bh/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(5000);
const html = await p.content();
const m = html.match(/"biography":"(.*?)","/); console.log('BIO', m && JSON.parse('"' + m[1] + '"'));
try { await p.locator('header').getByText(/^mais$/).first().click({ timeout: 4000 }); await p.waitForTimeout(1200); console.log((await p.locator('header').innerText()).slice(0, 800)); } catch (e) { console.log('nomais', e.message.slice(0, 100)) }
const hl = await p.evaluate(() => [...document.querySelectorAll('img')].map(i => i.alt + ' | ' + i.src.slice(0, 80)).slice(0, 40));
console.log(hl.join('\n'));
await b.close();
