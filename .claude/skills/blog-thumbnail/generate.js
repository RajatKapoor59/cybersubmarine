#!/usr/bin/env node
// Renders one thumbnail from a JSON spec using kit.js, and rasterizes it to
// AVIF (+ WebP fallback) with sharp. Usage:
//   node generate.js '<json-spec>' <output-path-without-extension>
const fs = require("fs");
const sharp = require("sharp");
const k = require("./kit");

const [, , specArg, outPrefix] = process.argv;
if (!specArg || !outPrefix) {
  console.error("Usage: node generate.js '<json-spec>' <output-path-prefix>");
  process.exit(1);
}

const spec = JSON.parse(specArg);
const { CX, CY } = k;

const blobRadius = spec.blobRadius ?? 430;
const blobSeed = spec.seed ?? 0;
const blob = k.blobPath(CX, CY, blobRadius, { seed: blobSeed, amp: spec.blobAmp });

let backdrop = "";
const bp = spec.backdropParams || {};
switch (spec.backdrop) {
  case "radarRings":
    backdrop = k.radarRings(bp.r ?? blobRadius);
    break;
  case "scatterDots":
    backdrop = k.scatterDots(bp.r ?? blobRadius - 30, bp.count ?? 30, bp.seed ?? blobSeed);
    break;
  case "radiatingBurst":
    backdrop = k.radiatingBurst(bp.rInner ?? 100, bp.rOuter ?? blobRadius - 20, bp.count ?? 28);
    break;
  case "gridDots":
    backdrop = k.gridDots(bp.spacing ?? 46, bp.r ?? blobRadius + 10);
    break;
  default:
    backdrop = "";
}

const icons = (spec.icons || [])
  .map((i) => k.icon(i.name, i.x ?? CX, i.y ?? CY, i.scale ?? 1, i.opts))
  .join("\n");

const svg = k.wrap(backdrop + icons, blob, { seed: spec.marginSeed ?? blobSeed + 5 });

fs.writeFileSync(`${outPrefix}.svg`, svg);

Promise.all([
  sharp(Buffer.from(svg)).avif({ quality: spec.quality ?? 62 }).toFile(`${outPrefix}.avif`),
  sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(`${outPrefix}.webp`),
])
  .then(() => {
    console.log(JSON.stringify({ ok: true, svg: `${outPrefix}.svg`, avif: `${outPrefix}.avif`, webp: `${outPrefix}.webp` }));
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
