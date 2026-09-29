import { cp, mkdir, readdir } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const landingsSource = resolve(projectRoot, 'landing');
const landingsTarget = resolve(projectRoot, 'dist', 'landing');
const entries = await readdir(landingsSource, { withFileTypes: true });
const landingDirectories = entries.filter((entry) => entry.isDirectory() && entry.name !== 'dist');

await mkdir(landingsTarget, { recursive: true });

for (const landing of landingDirectories) {
  const source = resolve(landingsSource, landing.name);
  const target = resolve(landingsTarget, landing.name);

  await cp(source, target, {
    recursive: true,
    filter: (path) => basename(path) !== 'dist'
  });
}

console.log(`Landings copiadas: ${landingDirectories.map((landing) => landing.name).join(', ') || 'ninguna'}.`);
