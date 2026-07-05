// Modular thumbnail "asset kit" — small composable SVG pieces (blobs,
// backdrops, icons) that get mixed per-post instead of one fixed template.
const W = 1600, H = 1200, CX = 800, CY = 600;
const BG = "#E9EFE2", SURFACE = "#DEE7D3", BORDER = "#C9D5BA", FG = "#171911";

// ---------- blobs ----------
function blobPath(cx, cy, baseR, { points = 10, amp = [0.16, 0.08], seed = 0 } = {}) {
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = baseR * (1 + amp[0] * Math.sin(angle * 2 + seed) + amp[1] * Math.sin(angle * 5 + seed * 1.7));
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  const d = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    if (i === 0) d.push(`M ${p1[0].toFixed(2)} ${p1[1].toFixed(2)}`);
    d.push(`C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`);
  }
  d.push("Z");
  return d.join(" ");
}

// ---------- backdrops (optional — pick zero or one per thumbnail) ----------
function radarRings(r = 360) {
  const rings = [0.72, 0.55, 0.39, 0.22].map((f) => r * f);
  let s = rings.map((rr) => `<circle cx="${CX}" cy="${CY}" r="${rr.toFixed(1)}" stroke="${FG}" stroke-width="2.5" opacity="0.28" fill="none"/>`).join("\n");
  const rInner = r * 0.76, rOuter = r * 0.85;
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    s += `\n<line x1="${(CX + Math.cos(a) * rInner).toFixed(1)}" y1="${(CY + Math.sin(a) * rInner).toFixed(1)}" x2="${(CX + Math.cos(a) * rOuter).toFixed(1)}" y2="${(CY + Math.sin(a) * rOuter).toFixed(1)}" stroke="${FG}" stroke-width="2.5" opacity="0.28"/>`;
  }
  return s;
}

function scatterDots(r = 340, count = 26, seed = 1) {
  let s = "";
  let rand = seed;
  const next = () => (rand = (rand * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < count; i++) {
    const a = next() * Math.PI * 2;
    const dist = Math.sqrt(next()) * r;
    const x = CX + Math.cos(a) * dist, y = CY + Math.sin(a) * dist;
    const rr = 3 + next() * 5;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="${FG}" opacity="${(0.15 + next() * 0.2).toFixed(2)}"/>\n`;
  }
  return s;
}

function radiatingBurst(rInner = 90, rOuter = 340, count = 24) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const len = rOuter * (0.7 + 0.3 * Math.sin(i * 2.1));
    s += `<line x1="${(CX + Math.cos(a) * rInner).toFixed(1)}" y1="${(CY + Math.sin(a) * rInner).toFixed(1)}" x2="${(CX + Math.cos(a) * len).toFixed(1)}" y2="${(CY + Math.sin(a) * len).toFixed(1)}" stroke="${FG}" stroke-width="2.5" opacity="0.22"/>\n`;
  }
  return s;
}

function gridDots(spacing = 46, r = 380) {
  let s = "";
  for (let x = CX - r; x <= CX + r; x += spacing) {
    for (let y = CY - r; y <= CY + r; y += spacing) {
      if (Math.hypot(x - CX, y - CY) > r) continue;
      s += `<circle cx="${x}" cy="${y}" r="2.5" fill="${FG}" opacity="0.18"/>\n`;
    }
  }
  return s;
}

// ---------- margin fillers (fill the canvas outside the blob so it doesn't read empty) ----------
// Very faint full-bleed dot field, sparser than any in-blob backdrop, so the
// blob still reads as the focal shape.
function fieldTexture(seed = 3) {
  let s = "";
  let rand = seed;
  const next = () => (rand = (rand * 9301 + 49297) % 233280) / 233280;
  const spacing = 64;
  for (let x = spacing / 2; x < W; x += spacing) {
    for (let y = spacing / 2; y < H; y += spacing) {
      if (next() > 0.55) continue; // sparse, irregular — not a rigid grid
      const jx = x + (next() - 0.5) * 20, jy = y + (next() - 0.5) * 20;
      s += `<circle cx="${jx.toFixed(1)}" cy="${jy.toFixed(1)}" r="${(1.5 + next() * 1.5).toFixed(1)}" fill="${FG}" opacity="${(0.05 + next() * 0.05).toFixed(2)}"/>\n`;
    }
  }
  return s;
}

// Small corner registration/crosshair marks — an editorial, technical touch
// that anchors the composition to the full canvas instead of just the blob.
function cornerMarks(inset = 64, len = 22) {
  const corners = [[inset, inset], [W - inset, inset], [inset, H - inset], [W - inset, H - inset]];
  return corners
    .map(
      ([x, y]) => `<g stroke="${FG}" stroke-width="2.5" opacity="0.3">
        <line x1="${x - len}" y1="${y}" x2="${x + len}" y2="${y}"/>
        <line x1="${x}" y1="${y - len}" x2="${x}" y2="${y + len}"/>
      </g>`
    )
    .join("\n");
}

// ---------- icons (each centered on 0,0 — wrap in <g transform="translate(x,y) scale(s)">) ----------
const icons = {
  envelope: (badge = true) => `
    <rect x="-95" y="-62" width="190" height="124" rx="6" fill="${SURFACE}" stroke="${FG}" stroke-width="5"/>
    <path d="M -95 -62 L 0 18 L 95 -62" stroke="${FG}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${badge ? `<circle cx="78" cy="46" r="40" fill="${BG}" stroke="${FG}" stroke-width="5"/>
    <path d="M 78 28 L 78 48" stroke="${FG}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="78" cy="62" r="2.5" fill="${FG}"/>` : ""}
  `,
  monitor: () => `
    <rect x="-95" y="-65" width="190" height="130" rx="14" fill="${SURFACE}" stroke="${FG}" stroke-width="5"/>
    <path d="M -65 0 L -30 0 L -14 -34 L 10 30 L 28 0 L 65 0" stroke="${FG}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  shield: (check = true) => `
    <path d="M 0 -90 L 76 -60 V 20 C 76 68 40 96 0 108 C -40 96 -76 68 -76 20 V -60 Z" fill="${SURFACE}" stroke="${FG}" stroke-width="5" stroke-linejoin="round"/>
    ${check ? `<path d="M -30 8 L -8 32 L 34 -20" stroke="${FG}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
  `,
  document: (lines = 3) => `
    <rect x="-70" y="-95" width="140" height="190" rx="8" fill="${SURFACE}" stroke="${FG}" stroke-width="5"/>
    ${Array.from({ length: lines }).map((_, i) => `<line x1="-42" y1="${-30 + i * 34}" x2="42" y2="${-30 + i * 34}" stroke="${FG}" stroke-width="5" stroke-linecap="round"/>`).join("\n")}
  `,
  lock: (broken = false) => `
    ${broken
      ? `<path d="M -46 -10 V -50 C -46 -78 -10 -96 20 -80" stroke="${FG}" stroke-width="9" fill="none" stroke-linecap="round"/>`
      : `<path d="M -46 -10 V -50 C -46 -88 46 -88 46 -50 V -10" stroke="${FG}" stroke-width="9" fill="none" stroke-linecap="round"/>`}
    <rect x="-64" y="-10" width="128" height="98" rx="12" fill="${SURFACE}" stroke="${FG}" stroke-width="5"/>
    <circle cx="0" cy="30" r="9" fill="${FG}"/>
    <line x1="0" y1="38" x2="0" y2="58" stroke="${FG}" stroke-width="7" stroke-linecap="round"/>
  `,
  triangleAlert: () => `
    <path d="M 0 -95 L 92 80 H -92 Z" fill="${SURFACE}" stroke="${FG}" stroke-width="5" stroke-linejoin="round"/>
    <line x1="0" y1="-30" x2="0" y2="25" stroke="${FG}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="0" cy="52" r="4" fill="${FG}"/>
  `,
  networkNodes: () => `
    <line x1="0" y1="0" x2="-90" y2="-70" stroke="${FG}" stroke-width="4" opacity="0.5"/>
    <line x1="0" y1="0" x2="90" y2="-70" stroke="${FG}" stroke-width="4" opacity="0.5"/>
    <line x1="0" y1="0" x2="-90" y2="70" stroke="${FG}" stroke-width="4" opacity="0.5"/>
    <line x1="0" y1="0" x2="90" y2="70" stroke="${FG}" stroke-width="4" opacity="0.5"/>
    <circle cx="0" cy="0" r="22" fill="${SURFACE}" stroke="${FG}" stroke-width="5"/>
    <circle cx="-90" cy="-70" r="13" fill="${SURFACE}" stroke="${FG}" stroke-width="4.5"/>
    <circle cx="90" cy="-70" r="13" fill="${SURFACE}" stroke="${FG}" stroke-width="4.5"/>
    <circle cx="-90" cy="70" r="13" fill="${SURFACE}" stroke="${FG}" stroke-width="4.5"/>
    <circle cx="90" cy="70" r="13" fill="${SURFACE}" stroke="${FG}" stroke-width="4.5"/>
  `,
  key: () => `
    <circle cx="-40" cy="0" r="46" fill="${SURFACE}" stroke="${FG}" stroke-width="7"/>
    <line x1="6" y1="0" x2="90" y2="0" stroke="${FG}" stroke-width="7" stroke-linecap="round"/>
    <line x1="60" y1="0" x2="60" y2="26" stroke="${FG}" stroke-width="7" stroke-linecap="round"/>
    <line x1="84" y1="0" x2="84" y2="20" stroke="${FG}" stroke-width="7" stroke-linecap="round"/>
  `,
  magnifier: () => `
    <circle cx="-10" cy="-10" r="62" fill="${SURFACE}" stroke="${FG}" stroke-width="7"/>
    <line x1="36" y1="36" x2="88" y2="88" stroke="${FG}" stroke-width="9" stroke-linecap="round"/>
  `,
  cloud: () => `
    <path d="M -80 20 C -110 20 -110 -30 -76 -34 C -70 -66 -18 -70 0 -44 C 34 -58 76 -34 68 2 C 100 4 100 40 70 40 H -80 Z" fill="${SURFACE}" stroke="${FG}" stroke-width="5" stroke-linejoin="round"/>
  `,
  server: () => `
    <rect x="-80" y="-100" width="160" height="72" rx="8" fill="${SURFACE}" stroke="${FG}" stroke-width="5"/>
    <rect x="-80" y="-20" width="160" height="72" rx="8" fill="${SURFACE}" stroke="${FG}" stroke-width="5"/>
    <circle cx="-56" cy="-64" r="5" fill="${FG}"/>
    <circle cx="-56" cy="16" r="5" fill="${FG}"/>
    <line x1="-30" y1="-64" x2="40" y2="-64" stroke="${FG}" stroke-width="4" stroke-linecap="round"/>
    <line x1="-30" y1="16" x2="40" y2="16" stroke="${FG}" stroke-width="4" stroke-linecap="round"/>
  `,
  gauge: () => `
    <path d="M -84 20 A 84 84 0 0 1 84 20" fill="none" stroke="${FG}" stroke-width="7" stroke-linecap="round"/>
    <line x1="0" y1="20" x2="34" y2="-38" stroke="${FG}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="0" cy="20" r="8" fill="${FG}"/>
    <line x1="-84" y1="20" x2="-96" y2="20" stroke="${FG}" stroke-width="5" stroke-linecap="round"/>
    <line x1="84" y1="20" x2="96" y2="20" stroke="${FG}" stroke-width="5" stroke-linecap="round"/>
  `,
  fingerprint: () => `
    <path d="M 0 -70 C 44 -70 72 -38 72 4 C 72 34 64 58 50 76" fill="none" stroke="${FG}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 0 -70 C -44 -70 -72 -38 -72 4 C -72 30 -66 52 -54 70" fill="none" stroke="${FG}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 0 -46 C 26 -46 44 -26 44 4 C 44 30 36 50 22 66" fill="none" stroke="${FG}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 0 -46 C -26 -46 -44 -26 -44 4 C -44 24 -40 42 -30 58" fill="none" stroke="${FG}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 0 -20 C 12 -20 18 -10 18 4 C 18 22 12 38 0 50" fill="none" stroke="${FG}" stroke-width="6" stroke-linecap="round"/>
  `,
};

function icon(name, x, y, scale = 1, opts) {
  const body = typeof icons[name] === "function" ? icons[name](opts) : "";
  return `<g transform="translate(${x} ${y}) scale(${scale})" stroke="${FG}" stroke-width="5" fill="none">${body}</g>`;
}

function wrap(inner, blobD, { seed = 3 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${fieldTexture(seed)}
  ${cornerMarks()}
  ${blobD ? `<path d="${blobD}" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2.5"/>` : ""}
  ${inner}
</svg>`;
}

module.exports = { W, H, CX, CY, BG, SURFACE, BORDER, FG, blobPath, radarRings, scatterDots, radiatingBurst, gridDots, fieldTexture, cornerMarks, icon, wrap };
