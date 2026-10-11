#!/usr/bin/env node
// Recorre una app hecha con el kit y guarda capturas en teléfono y tablet, para revisarlas antes de publicar.
// Uso (desde la raíz del repo):
//   python3 -m http.server 8765 &                      (servidor local)
//   node kit/v1/tools/capturas.js http://localhost:8765/<app>/ <carpeta-salida>
// Necesita Playwright (en las sesiones en la nube: NODE_PATH=/opt/node22/lib/node_modules).
// Termina con código 1 si la página lanzó errores de JavaScript.
const { chromium } = require('playwright');
const fs = require('fs');

const [url, out = 'capturas'] = process.argv.slice(2);
if (!url) { console.error('Uso: node capturas.js <url-de-la-app> [carpeta]'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });

(async () => {
  const exe = fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined;
  const browser = await chromium.launch({ executablePath: exe });
  const errs = [];
  for (const [dev, viewport] of [['telefono', { width: 390, height: 844 }], ['tablet', { width: 1180, height: 820 }]]) {
    const page = await (await browser.newContext({ viewport, deviceScaleFactor: 1.5 })).newPage();
    page.on('pageerror', (e) => errs.push(`[${dev}] ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error' && !/favicon|fonts\.g/.test(m.text())) errs.push(`[${dev}] consola: ${m.text()}`); });
    const shot = async (name, full = false) => { await page.screenshot({ path: `${out}/${dev}-${name}.png`, fullPage: full }); console.log('📸', `${dev}-${name}`); };
    const click = (sel) => page.click(sel, { force: true }); // force: los elementos animados nunca están "quietos"
    const home = async () => { await page.goto(url); await page.waitForTimeout(1200); };

    await home(); await shot('inicio'); await shot('inicio-completo', true);
    const extras = await page.$$eval('[data-go]', (els) => els.map((e) => e.dataset.go).filter((g) => g !== 'passport'));
    await click('[data-journey]'); await page.waitForTimeout(3200); await shot('aprende');
    const nHs = await page.$$eval('.hs', (els) => els.length);
    if (nHs) { await click('.hs[data-hs="0"]'); await page.waitForTimeout(1200); await shot('dato'); await click('.sheet [data-close]'); await page.waitForTimeout(500); }
    // recorre todos los temas del primer grupo para ver cada escena con sus chispas
    const nOrbs = await page.$$eval('.orb', (els) => els.length);
    for (let k = 1; k < nOrbs; k++) { await click(`.orb[data-orb="${k}"]`); await page.waitForTimeout(3000); await shot(`aprende-${k + 1}`); }
    for (const game of ['quiz', 'order', 'sort', 'memory']) {
      await home();
      if (!(await page.$(`[data-game="${game}"]`))) continue;
      await click(`[data-game="${game}"]`); await page.waitForTimeout(600);
      if (await page.$('.modal [data-s]')) { await click('.modal [data-s]'); await page.waitForTimeout(900); }
      await shot(game);
      if (game === 'quiz') { await click('.opt:nth-child(1)'); await page.waitForTimeout(900); await shot('quiz-respuesta'); }
    }
    await home(); await click('[data-go="passport"]'); await page.waitForTimeout(900); await shot('pasaporte', true);
    for (const extra of extras) {
      await home(); await click(`[data-go="${extra}"]`); await page.waitForTimeout(1500); await shot(`extra-${extra}`, true);
    }
    await page.context().close();
  }
  await browser.close();
  if (errs.length) { console.error('❌ Errores:\n' + errs.join('\n')); process.exit(1); }
  console.log(`✅ Sin errores. Capturas en ${out}/`);
})();
