import fg from "fast-glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../public"); // adapte si besoin (ex: ../src/assets)

const files = await fg("**/*.{jpg,jpeg,png}", { cwd: ROOT });
for (const rel of files) {
  const inPath = path.join(ROOT, rel);
  const img = sharp(inPath).rotate();
  const meta = await img.metadata();
  const base = (meta.width ?? 0) > 1800 ? img.resize({ width: 1800 }) : img;

  await base.webp({ quality: 72 }).toFile(inPath.replace(/\.(jpe?g|png)$/i, ".webp"));
  await base.avif({ quality: 45 }).toFile(inPath.replace(/\.(jpe?g|png)$/i, ".avif"));
  console.log("✓", rel);
}
console.log("🎉 WebP/AVIF générés");
