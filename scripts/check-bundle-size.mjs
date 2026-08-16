import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { exit } from "node:process";

const STATIC_DIR = join(import.meta.dirname, "..", ".next", "static");
const BUDGET_KB = {
  js: 600,
  css: 50,
  font: 60,
  image: 200,
  total: 800,
};

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1);
}

async function getFiles(dir, ext) {
  const results = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true, recursive: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const fullPath = join(entry.parentPath ?? entry.path, entry.name);
        if (!ext || fullPath.endsWith(ext)) {
          const s = await stat(fullPath);
          results.push({ path: fullPath, size: s.size });
        }
      }
    }
  } catch {
    // Directory may not exist
  }
  return results;
}

let hasViolation = false;

console.log("\n=== Bundle Size Budget Check ===\n");

const jsFiles = await getFiles(STATIC_DIR, ".js");
const cssFiles = await getFiles(STATIC_DIR, ".css");
const fontFiles = await getFiles(join(STATIC_DIR, "media"), ".woff2");
const imageFiles = await getFiles(join(STATIC_DIR, "media"), ".webp");

const totals = { js: 0, css: 0, font: 0, image: 0 };

for (const f of jsFiles) totals.js += f.size;
for (const f of cssFiles) totals.css += f.size;
for (const f of fontFiles) totals.font += f.size;
for (const f of imageFiles) totals.image += f.size;

const totalBytes = totals.js + totals.css + totals.font + totals.image;

for (const [type, bytes] of Object.entries(totals)) {
  const budget = BUDGET_KB[type];
  const actual = formatKB(bytes);
  const status = Number(actual) <= budget ? "OK" : "OVER";
  if (status === "OVER") hasViolation = true;
  console.log(`  ${type.toUpperCase().padEnd(8)} ${actual.padStart(8)} KB / ${budget} KB  [${status}]`);
}

const totalKB = formatKB(totalBytes);
const totalStatus = Number(totalKB) <= BUDGET_KB.total ? "OK" : "OVER";
if (totalStatus === "OVER") hasViolation = true;
console.log(`  ${"TOTAL".padEnd(8)} ${totalKB.padStart(8)} KB / ${BUDGET_KB.total} KB  [${totalStatus}]`);

console.log(`\n  JS chunks: ${jsFiles.length}`);
console.log(`  CSS files: ${cssFiles.length}`);

if (hasViolation) {
  console.error("\n❌ Bundle size budget exceeded. Reduce payload before merging.\n");
  exit(1);
} else {
  console.log("\n✅ All bundle sizes within budget.\n");
}
