// One-off asset step: converts the poster JPGs (used as CSS backgrounds and
// video posters) to WebP. Dish photos are served through next/image instead.
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const dir = fileURLToPath(new URL('../public/media/posters/', import.meta.url));
for (const f of readdirSync(dir).filter((f) => f.endsWith('.jpg'))) {
  const out = dir + f.replace(/\.jpg$/, '.webp');
  const info = await sharp(dir + f).webp({ quality: 80, effort: 6 }).toFile(out);
  console.log(f, '->', info.size, info.width + 'x' + info.height);
}
