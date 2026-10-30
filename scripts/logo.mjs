import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire('/Users/joaomarcosom/Dev/Conexxio/proposta-kit/package.json');
const { chromium } = require('playwright');
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ deviceScaleFactor: 4, viewport: { width: 900, height: 900 } });
const rec = 'data:image/jpeg;base64,' + fs.readFileSync('maps-fotos/m-03.jpg').toString('base64');
await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Lato:wght@400&display=block" rel="stylesheet"><style>
body{margin:0;background:transparent}
#logo{display:inline-block;padding:2px 4px;font:400 44px/1 'Lato';letter-spacing:.06em;color:#8A5631;white-space:nowrap}
#logo .amp{color:#6E3B2A}
#c1,#c2{overflow:hidden;position:relative;background:#eee}
#c1{width:360px;height:520px}#c2{width:600px;height:450px}
#c1 img,#c2 img{position:absolute;left:0;width:100%}
#c1 img{top:-120px}#c2 img{top:-400px}
</style></head><body>
<div id="logo">FACE <span class="amp">&amp;</span> BODY</div>
<div id="c1"><img src="${rec}"></div>
<div id="c2"><img src="${rec}"></div>
</body></html>`);
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
await p.locator('#logo').screenshot({ path: 'brand/logo.png', omitBackground: true });
await p.setViewportSize({ width: 900, height: 900 });
const p2 = await b.newPage({ deviceScaleFactor: 2, viewport: { width: 900, height: 1200 } });
await p2.setContent(await p.content());
await p2.waitForTimeout(500);
await p2.locator('#c1').screenshot({ path: 'midia/recepcao.jpg', type: 'jpeg', quality: 82 });
await p2.locator('#c2').screenshot({ path: 'midia/recepcao-placa.jpg', type: 'jpeg', quality: 82 });
await b.close();
