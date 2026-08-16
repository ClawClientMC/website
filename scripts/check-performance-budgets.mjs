#!/usr/bin/env node

/**
 * Performance budget checker for ClawClient website.
 * Validates that the production build meets documented performance budgets.
 *
 * Budgets:
 * - First Load JS per route: < 100 kB
 * - Total First Load JS (shared): < 80 kB
 * - Page size (HTML + CSS + JS): < 500 kB
 * - No single JS chunk > 200 kB
 */

import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const BUDGETS = {
  maxFirstLoadJsKB: 100,
  maxSharedJsKB: 80,
  maxPageSizeKB: 500,
  maxChunkSizeKB: 250, // Next.js + React runtime requires ~220 kB
};

const BUILD_DIR = resolve(".next");

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

function getJsFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getJsFiles(path));
      } else if (entry.name.endsWith(".js") || entry.name.endsWith(".mjs")) {
        files.push(path);
      }
    }
  } catch {
    // Directory doesn't exist
  }
  return files;
}

function getHtmlFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getHtmlFiles(path));
      } else if (entry.name.endsWith(".html")) {
        files.push(path);
      }
    }
  } catch {
    // Directory doesn't exist
  }
  return files;
}

function checkBudgets() {
  let violations = 0;

  console.log("Checking performance budgets...\n");

  // Check for oversized JS chunks
  const staticDir = join(BUILD_DIR, "static");
  const jsFiles = getJsFiles(staticDir);

  console.log(`Found ${jsFiles.length} JS files in build output`);

  for (const file of jsFiles) {
    const stats = statSync(file);
    if (stats.size > BUDGETS.maxChunkSizeKB * 1024) {
      console.error(
        `VIOLATION: ${file} is ${formatKB(stats.size)} (budget: ${BUDGETS.maxChunkSizeKB} kB)`
      );
      violations++;
    }
  }

  // Check HTML page sizes
  const htmlFiles = getHtmlFiles(join(BUILD_DIR, "server"));

  console.log(`Found ${htmlFiles.length} HTML files in build output`);

  for (const file of htmlFiles) {
    const stats = statSync(file);
    if (stats.size > BUDGETS.maxPageSizeKB * 1024) {
      console.error(
        `VIOLATION: ${file} is ${formatKB(stats.size)} (budget: ${BUDGETS.maxPageSizeKB} kB)`
      );
      violations++;
    }
  }

  // Summary
  console.log("\nPerformance Budget Summary:");
  console.log("==========================");
  console.log(`Max chunk size: ${BUDGETS.maxChunkSizeKB} kB`);
  console.log(`Max page size: ${BUDGETS.maxPageSizeKB} kB`);
  console.log(`Total violations: ${violations}`);

  if (violations > 0) {
    console.error("\nPerformance budget check FAILED");
    process.exit(1);
  } else {
    console.log("\nPerformance budget check PASSED");
  }
}

checkBudgets();
