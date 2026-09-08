/**
 * Turns the raw facility photographs in ../photos into web-sized WebP in
 * public/facility.
 *
 *   node scripts/optimise-photos.mjs
 *
 * The originals are phone shots at 1200x1600 and 230-400 KB each. Shipping
 * eight of those would roughly triple the page weight for no visible gain: the
 * largest a photo is ever displayed is about 440 px wide, so 900 px covers a 2x
 * screen with room to spare.
 *
 * Only the photographs listed in SELECTED are published. The rest stay in
 * ../photos — see the note against each omission.
 */
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("../photos");
const DEST = path.resolve("public/facility");

// Ordered the way a visitor meets the place: street, entrance, reception, shop.
const SELECTED = [
  ["08-building-exterior.jpg", "building-exterior"],
  ["06-entrance-signage.jpg", "entrance"],
  ["07-reception-corridor.jpg", "reception"],
  ["03-jyoti-vmc-front.jpg", "vmc-front"],
  ["05-jyoti-vmc-side-shop-floor.jpg", "machining-bay"],
  ["01-coolant-tank-chip-conveyor.jpg", "coolant-chip-conveyor"],
];

// Deliberately not published, rather than overlooked:
//   02-shop-floor-igloo-machine  — a mobile number is handwritten across the
//                                  machine panel, and the frame is cluttered.
//   04-machine-window-warning-label — a misted window; no information in it.

await mkdir(DEST, { recursive: true });

const present = new Set(await readdir(SRC));
let total = 0;

for (const [file, name] of SELECTED) {
  if (!present.has(file)) {
    console.error(`missing source: ${file}`);
    process.exitCode = 1;
    continue;
  }
  const out = path.join(DEST, `${name}.webp`);
  const info = await sharp(path.join(SRC, file))
    .rotate() // honour EXIF orientation before it is stripped
    .resize({ width: 900, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);

  total += info.size;
  console.log(
    `${name.padEnd(24)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`
  );
}

console.log(`\n${SELECTED.length} photographs, ${(total / 1024).toFixed(0)} KB total.`);
