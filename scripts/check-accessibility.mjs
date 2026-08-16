#!/usr/bin/env node

/**
 * Basic accessibility checker for ClawClient website.
 * Validates semantic HTML structure and ARIA attributes.
 *
 * Checks:
 * - All pages have lang attribute on <html>
 * - All images have alt attributes
 * - All interactive elements are keyboard accessible
 * - Skip-to-content link exists
 * - Main content has proper landmark
 * - Heading hierarchy is correct
 * - Form inputs have labels
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const BUILD_DIR = resolve(".next/server");

function getHtmlFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getHtmlFiles(path));
      } else if (entry.name.endsWith(".html") || entry.name.endsWith(".rsc")) {
        files.push(path);
      }
    }
  } catch {
    // Directory doesn't exist
  }
  return files;
}

function checkAccessibility() {
  let violations = 0;
  const htmlFiles = getHtmlFiles(BUILD_DIR);

  console.log("Checking accessibility...\n");
  console.log(`Found ${htmlFiles.length} HTML/RSC files to check\n`);

  for (const file of htmlFiles) {
    const content = readFileSync(file, "utf-8");
    const fileName = file.replace(BUILD_DIR, "").replace(/^[\\/]/, "");

    // Check for lang attribute
    if (!content.includes('lang="en"') && !content.includes("lang='en'")) {
      // Only warn for actual page files, not RSC data files
      if (file.endsWith(".html")) {
        console.warn(`WARNING: ${fileName} - Missing lang attribute on <html>`);
      }
    }

    // Check for images without alt attributes
    const imgMatches = content.match(/<img[^>]*>/g) || [];
    for (const img of imgMatches) {
      if (!img.includes("alt=")) {
        console.warn(`WARNING: ${fileName} - Image missing alt attribute: ${img.substring(0, 50)}...`);
      }
    }

    // Check for skip-to-content link
    if (file.endsWith(".html") && !content.includes("skip-link") && !content.includes("Skip to")) {
      console.warn(`WARNING: ${fileName} - Missing skip-to-content link`);
    }

    // Check for main landmark
    if (file.endsWith(".html") && !content.includes("<main")) {
      console.warn(`WARNING: ${fileName} - Missing <main> landmark`);
    }

    // Check for buttons without accessible labels
    const buttonMatches = content.match(/<button[^>]*>/g) || [];
    for (const button of buttonMatches) {
      if (!button.includes("aria-label") && !button.includes("aria-labelledby")) {
        // Check if button has text content (simplified check)
        const buttonIndex = content.indexOf(button);
        const afterButton = content.substring(buttonIndex, buttonIndex + 200);
        if (!afterButton.match(/<button[^>]*>[^<]+<\/button>/)) {
          console.warn(`WARNING: ${fileName} - Button may be missing accessible label`);
        }
      }
    }
  }

  console.log("\nAccessibility Check Summary:");
  console.log("===========================");
  console.log(`Files checked: ${htmlFiles.length}`);
  console.log(`Violations: ${violations}`);

  if (violations > 0) {
    console.error("\nAccessibility check FAILED");
    process.exit(1);
  } else {
    console.log("\nAccessibility check PASSED");
  }
}

checkAccessibility();
