import { readFile, writeFile, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const config = JSON.parse(await readFile(new URL('application-fields.json', root), 'utf8'));
const fields = config.applicationFields;
if (!Array.isArray(fields) || fields.length === 0 || fields.some((field) =>
  typeof field !== 'string' || !field.trim() || field !== field.trim() || field === 'all'
) || new Set(fields).size !== fields.length) {
  throw new Error('applicationFields must be a non-empty array of unique, trimmed strings. "all" is reserved for filters.');
}
const output = `// Generated from application-fields.json. Do not edit manually.\nexport const APPLICATION_FIELDS = ${JSON.stringify(fields, null, 2)} as const;\n\nexport type ApplicationField = (typeof APPLICATION_FIELDS)[number];\n`;
await mkdir(new URL('src/generated/', root), { recursive: true });
const target = new URL('src/generated/applicationFields.ts', root);
const previous = await readFile(target, 'utf8').catch(() => '');
if (previous !== output) await writeFile(target, output);
