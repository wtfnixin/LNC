const { chromium } = require('playwright');

/**
 * Site Discovery Engine
 * Maps out the attack surface of a Given URL.
 */
async function discoverAttackSurface(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const surface = {
    url,
    title: '',
    forms: [],
    links: [],
    inputs: [],
    headers: {}
  };

  try {
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    surface.title = await page.title();
    surface.headers = response.headers();

    // Find all forms and their inputs
    surface.forms = await page.$$eval('form', forms => {
      return forms.map(f => ({
        action: f.action,
        method: f.method,
        inputs: Array.from(f.querySelectorAll('input, textarea, select')).map(i => ({
          name: i.name,
          type: i.type,
          placeholder: i.placeholder
        }))
      }));
    });

    // Find all links (potential API routes or pages)
    surface.links = await page.$$eval('a', links => links.map(l => l.href).filter(h => h.startsWith('http')));

    // Find all standalone inputs (could be search bars, JS-driven, etc.)
    surface.inputs = await page.$$eval('input:not(form input)', inputs => {
      return inputs.map(i => ({
        name: i.name || i.id,
        type: i.type,
        placeholder: i.placeholder
      }));
    });

  } catch (err) {
    console.error('[CRAWL ERROR]', err);
  } finally {
    await browser.close();
  }

  return surface;
}

module.exports = { discoverAttackSurface };
