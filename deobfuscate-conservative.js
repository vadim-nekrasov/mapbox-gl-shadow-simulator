/**
 * Conservative deobfuscation script
 * Only renames top-level classes and key exported functions
 * Preserves local variables to avoid breaking code
 */

const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "src", "index.beautified.js");
const OUTPUT_FILE = path.join(__dirname, "src", "index.ts");

let code = fs.readFileSync(INPUT_FILE, "utf8");

console.log("Starting conservative deobfuscation...");
console.log(
  "Step 1: Adding copyright and converting to TypeScript structure\n",
);

// Add header
const header = `/**
 * Mapbox GL Shadow Simulator - Deobfuscated Source
 * Original Package: mapbox-gl-shadow-simulator v0.63.0
 * Copyright Ted Piotrowski 2025
 * 
 * This is a deobfuscated version for development and modification purposes.
 * Original minified code has been reformatted and partially renamed for readability.
 * 
 * For licensing visit: https://shademap.app/about/
 */

import type { LngLatLike, Map as MapboxMap, MapboxGeoJSONFeature } from 'mapbox-gl';

`;

code = header + code;

// Step 2: Identify and document major sections with comments
console.log("Step 2: Adding section markers\n");

// Find key patterns and add comments
const sections = [
  {
    pattern: /^function t\(t, e, r, o\)/m,
    comment:
      "\n// ============================================\n// ASYNC/AWAIT HELPER (TypeScript __awaiter polyfill)\n// ============================================\n",
  },
  {
    pattern: /^var o =\s*Array\.isArray/m,
    comment:
      "\n// ============================================\n// GEOMETRY UTILITIES (Point, Bounds, LatLng)\n// ============================================\n",
  },
  {
    pattern: /^const m = 256/m,
    comment:
      "\n// ============================================\n// MAP CONSTANTS AND PROJECTIONS\n// ============================================\n",
  },
  {
    pattern: /^class y \{/m,
    comment:
      "\n// ============================================\n// EVENT EMITTER\n// ============================================\n",
  },
  {
    pattern: /^function A\(t, e, r\) \{/m,
    comment:
      "\n// ============================================\n// EARCUT TRIANGULATION ALGORITHM\n// ============================================\n",
  },
  {
    pattern: /^const V = \(t\)/m,
    comment:
      "\n// ============================================\n// BUILDING PROCESSOR\n// ============================================\n",
  },
  {
    pattern: /^let J, Q = \{/m,
    comment:
      "\n// ============================================\n// HEIGHT MAP STATE\n// ============================================\n",
  },
  {
    pattern: /^class at extends y \{/m,
    comment:
      "\n// ============================================\n// SHADEMAP BASE CLASS\n// ============================================\n",
  },
  {
    pattern: /^class lt \{/m,
    comment:
      "\n// ============================================\n// BUILDING RASTERIZER (WebGL)\n// ============================================\n",
  },
  {
    pattern: /^class ct \{/m,
    comment:
      "\n// ============================================\n// TILE MERGER (DEM Tiles)\n// ============================================\n",
  },
  {
    pattern: /^class ft extends at \{/m,
    comment:
      "\n// ============================================\n// MAPBOX SHADEMAP IMPLEMENTATION\n// ============================================\n",
  },
];

sections.forEach(({ pattern, comment }) => {
  code = code.replace(pattern, comment + "$&");
});

// Step 3: Fix the final export
console.log("Step 3: Fixing exports\n");

code = code.replace(
  /export \{ ft as default \};?$/,
  `
// Export the main ShadeMap class as default
export default ft;
export type { ShadeMapOptions };
`,
);

// Step 4: Add type annotations for main class
console.log("Step 4: Adding key type annotations\n");

// EventEmitter class rename
code = code.replace(/^class y \{/m, "class EventEmitter {");
code = code.replace(/extends y \{/g, "extends EventEmitter {");

// Main ShadeMap classes
code = code.replace(
  /^class at extends EventEmitter \{/m,
  "class ShadeMapBase extends EventEmitter {",
);
code = code.replace(/extends at \{/g, "extends ShadeMapBase {");
code = code.replace(
  /^class ft extends ShadeMapBase \{/m,
  "export class MapboxShadeMap extends ShadeMapBase {",
);

// WebGL classes
code = code.replace(/^class lt \{/m, "class BuildingRasterizer {");
code = code.replace(/^class ct \{/m, "class TileMerger {");

// Write output
fs.writeFileSync(OUTPUT_FILE, code, "utf8");

console.log("✨ Conservative deobfuscation complete!");
console.log(`   Output written to: ${OUTPUT_FILE}`);
console.log(`\nNext steps:`);
console.log(`   1. Review the code structure`);
console.log(`   2. Manually split into modules`);
console.log(`   3. Add proper TypeScript types`);
console.log(`   4. Incrementally rename more variables`);
