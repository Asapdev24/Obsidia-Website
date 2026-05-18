import { cpSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const outDir = join(process.cwd(), 'out');
const enDir = join(outDir, 'en');

if (!existsSync(enDir)) {
  console.log('No out/en/ folder found, skipping flatten.');
  process.exit(0);
}

// Copy everything from out/en/ into out/
cpSync(enDir, outDir, { recursive: true });

// Remove the now-redundant out/en/ folder
rmSync(enDir, { recursive: true, force: true });

console.log('Flattened out/en/ -> out/');
