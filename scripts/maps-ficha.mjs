import { createRequire } from 'module';
const require = createRequire('/Users/joaomarcosom/Dev/Conexxio/proposta-kit/package.json');
const { chromium } = require('playwright');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ locale: 'pt-BR', viewport: { width: 1280, height: 900 } });
await p.goto(process.argv[2], { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(5000);
const lst = p.locator("a.hfpxzc"); if (await lst.count()) { await p.goto(await lst.first().getAttribute("href")); }
await p.waitForTimeout(6000);
const main = await p.evaluate(() => [...document.querySelectorAll('div[role="main"]')].map(m => m.innerText).join('\n=====\n'));
console.log(main?.slice(0, 4000));
const itens = await p.evaluate(() => [...document.querySelectorAll('[data-item-id]')].map(e => e.getAttribute('data-item-id') + ' | ' + (e.getAttribute('aria-label') || e.innerText) + ' | ' + (e.href || '')));
console.log('ITENS', itens);
const links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => !/google\./.test(h)));
console.log('LINKS', links, p.url());
await p.screenshot({ path: 'maps.png' });
await b.close();
