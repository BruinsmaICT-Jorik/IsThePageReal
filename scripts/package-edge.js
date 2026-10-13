#!/usr/bin/env node

/**
 * Package IsThePageReal for Microsoft Edge distribution.
 * Creates dist/IsThePageReal-edge.zip with only runtime extension files.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const stagingDir = path.join(distDir, "edge-staging");
const zipPath = path.join(distDir, "IsThePageReal-edge.zip");

const includePaths = [
  "manifest.json",
  "blocked.html",
  "scripts",
  "popup",
  "options",
  "config",
  "rules",
  "images",
  "styles",
];

const excludeNamePatterns = [
  /^\./,
  /\.map$/,
  /\.test\.js$/,
  /node_modules/,
];

function shouldSkip(name) {
  return excludeNamePatterns.some((pattern) => pattern.test(name));
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (shouldSkip(entry)) {
        continue;
      }
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function assertManifest() {
  const manifestPath = path.join(rootDir, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!manifest.name || !manifest.version) {
    throw new Error("manifest.json mist name of version");
  }
  console.log(`Packaging ${manifest.name} v${manifest.version} for Edge...`);
}

function main() {
  assertManifest();

  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.rmSync(zipPath, { force: true });
  fs.mkdirSync(stagingDir, { recursive: true });

  for (const rel of includePaths) {
    const src = path.join(rootDir, rel);
    if (!fs.existsSync(src)) {
      throw new Error(`Vereist pad ontbreekt: ${rel}`);
    }
    copyRecursive(src, path.join(stagingDir, rel));
  }

  // Prefer system zip for a store-compatible archive
  execFileSync("zip", ["-r", "-q", zipPath, "."], { cwd: stagingDir });

  fs.rmSync(stagingDir, { recursive: true, force: true });

  const sizeKb = Math.round(fs.statSync(zipPath).size / 1024);
  console.log(`✓ Geschreven: ${zipPath} (${sizeKb} KB)`);
  console.log("");
  console.log("Volgende stappen:");
  console.log("  1. Upload naar Edge Add-ons Partner Center, of");
  console.log("  2. Gebruik voor private force_install / update feed");
  console.log("  3. Zie docs/edge-deployment.md");
}

main();
