// gta6-meme-x-01 entry, Node 22, standard library only.
// The entry is the X post itself. This program hands the house the post's
// address: it reads POST.json from the repository root, checks it names a
// real X post URL, and writes the same bytes to the output directory where
// the gate reads it. No network, no clock, no files outside the repository.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const text = readFileSync(source, 'utf8');
const entry = JSON.parse(text) as { url?: unknown };

if (typeof entry.url !== 'string' || !/^https:\/\/(x|twitter)\.com\/[^/]+\/status\/\d+$/.test(entry.url)) {
  console.error('POST.json must name an X post: https://x.com/<handle>/status/<id>');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'POST.json'), text);
