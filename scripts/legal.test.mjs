import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { legalDocuments, legalVersion, legalNotice } from './legal-review.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('every legal document has a public route and meaningful sections', () => {
  for (const [id, document] of Object.entries(legalDocuments)) {
    const route = fs.readFileSync(path.join(root, `src/app/[locale]/${id}/page.tsx`), 'utf8');
    assert.ok(route.includes(`page="${id}"`), `Wrong or missing route for ${id}`);
    assert.ok(document.sections.length > 0);
    for (const section of document.sections) {
      assert.ok(section.title && section.text.every(p => p.length > 20));
    }
  }
});
test('app canonical legal targets exist on the website', () => {
  const config = fs.readFileSync(path.resolve(root, '../../Gentle.Book.UI/lib/config.ts'), 'utf8');
  const targets = [...config.matchAll(/\$\{legalSiteUrl\}\/([a-z0-9-]+)/g)].map(m => m[1]);
  assert.ok(targets.length >= 10);
  for (const target of targets) assert.ok(legalDocuments[target], `Broken canonical target ${target}`);
});
test('review drafts preserve confirmed business model and have no B2C withdrawal document', () => {
  const agb = JSON.stringify(legalDocuments.agb);
  assert.match(agb, /14 Tage/);
  assert.match(agb, /ohne automatische Umwandlung/);
  assert.match(agb, /278,00/);
  assert.match(agb, /566,00/);
  assert.equal(legalDocuments.widerruf, undefined);
  assert.match(legalVersion, /entwurf/);
  assert.equal(legalNotice, 'Entwurf zur anwaltlichen Prüfung – keine Rechtsberatung.');
});
test('renderer visibly labels every draft and renders text without raw HTML injection', () => {
  const renderer = fs.readFileSync(path.join(root, 'src/components/layout/LegalPage.tsx'), 'utf8');
  assert.ok(renderer.includes('{legalNotice}'));
  assert.ok(renderer.includes('{legalVersion}'));
  assert.ok(!renderer.includes('dangerouslySetInnerHTML'));
});
test('all documents are linked from the existing footer', () => {
  const footer = fs.readFileSync(path.join(root, 'src/components/layout/Footer.tsx'), 'utf8');
  const site = fs.readFileSync(path.join(root, 'src/lib/siteConfig.ts'), 'utf8');
  for (const id of Object.keys(legalDocuments)) {
    const direct = footer.includes(`p("/${id}")`);
    const configKey = [...site.matchAll(/(\w+):\s*["']\/([^"']+)["']/g)].find(m => m[2] === id)?.[1];
    assert.ok(direct || (configKey && footer.includes(`p(siteConfig.routes.${configKey})`)), `Missing footer link: ${id}`);
  }
});
test('new app redirects use the central domain configuration', () => {
  for (const [route, key] of Object.entries({ sepa: 'sepa', testphase: 'trial', kuendigung: 'cancellation', auftragsverarbeitung: 'processing', unterauftragsverarbeiter: 'subprocessors', nutzungsrichtlinien: 'acceptableUse', loeschkonzept: 'retention', tom: 'securityMeasures', cookies: 'cookies' })) {
    const content = fs.readFileSync(path.resolve(root, `../../Gentle.Book.UI/app/${route}/page.tsx`), 'utf8');
    assert.ok(content.includes(`redirect(legalConfig.${key})`));
  }
});
