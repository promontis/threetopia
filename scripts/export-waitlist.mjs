import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
let remote = false;
let output = `.context/waitlist-${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--remote') remote = true;
  else if (args[i] === '--out' && args[i + 1]) output = args[++i];
  else throw new Error('Usage: pnpm waitlist:export [--remote] [--out path.csv]');
}
const root = fileURLToPath(new URL('../', import.meta.url));
const query = `SELECT email, project_url, x_handle,
  datetime(created_at / 1000, 'unixepoch') AS created_at,
  datetime(confirmed_at / 1000, 'unixepoch') AS confirmed_at
  FROM waitlist WHERE confirmed_at IS NOT NULL ORDER BY confirmed_at, email`;
const raw = execFileSync(process.execPath, [resolve(root, 'node_modules/wrangler/bin/wrangler.js'),
  'd1', 'execute', 'WAITLIST_DB', remote ? '--remote' : '--local', '--command', query, '--json'], {
  cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
});
const result = JSON.parse(raw);
if (!Array.isArray(result) || result.some(item => item.success === false || !Array.isArray(item.results))) throw new Error('Could not read the waitlist.');
const rows = result.flatMap(item => item.results);
const columns = ['email', 'project_url', 'x_handle', 'created_at', 'confirmed_at'];
// Quoting alone does not stop a spreadsheet from evaluating a formula.
const cell = value => {
  const text = String(value ?? '');
  const safe = /^[\s]*[=+@-]|^[\t\r\n]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
};
const csv = [columns.map(cell).join(','), ...rows.map(row => columns.map(key => cell(row[key])).join(','))].join('\r\n') + '\r\n';
const path = resolve(root, output);
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, csv, { mode: 0o600, flag: 'wx' });
console.log(`Exported ${rows.length} confirmed signup(s) from ${remote ? 'production' : 'local development'} to ${path}`);
