import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'src/content/legal/documents.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
export const { legalDocuments, legalVersion, legalNotice } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

if (process.argv.includes('--export')) {
  const dir = path.join(root, 'docs/legal');
  fs.mkdirSync(dir, { recursive: true });
  const text = [`# GentleBook – Rechtstextpaket\n\n${legalNotice}\n\nVersion: ${legalVersion}. Nicht freigegeben.\n`,
    ...Object.entries(legalDocuments).map(([id, doc]) => `## ${doc.title}\n\nWebsite: /${id}\n\n${doc.sections.map(s => `### ${s.title}\n\n${s.text.join('\n\n')}`).join('\n\n')}`)
  ].join('\n\n');
  fs.writeFileSync(path.join(dir, 'RECHTSTEXTE_ENTWURF.md'), text + '\n');
  const placeholders = [...new Set(source.match(/\[[A-ZÄÖÜ_]+\]/g))].sort();
  fs.writeFileSync(path.join(dir, 'OFFENE_ANGABEN.md'), `# Offene Angaben\n\n${legalNotice}\n\nVor Veröffentlichung und Vertragsannahme ausfüllen oder nach begründeter Prüfung entfernen. Werte nicht aus Vermutungen ableiten.\n\n${placeholders.map(p => `- ${p}`).join('\n')}\n`);
  console.log(`Exportiert: ${Object.keys(legalDocuments).length} Dokumente, ${placeholders.length} offene Angaben.`);
}
