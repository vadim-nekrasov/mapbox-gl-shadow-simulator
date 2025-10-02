/**
 * Deobfuscation script to rename minified variables to semantic names
 * Based on code analysis and type definitions from .d.ts
 */

const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "src", "index.beautified.js");
const OUTPUT_FILE = path.join(__dirname, "src", "index.deobfuscated.js");

// Read the file
let code = fs.readFileSync(INPUT_FILE, "utf8");

/**
 * Mapping of minified names to semantic names
 * Discovered through analysis of code patterns and .d.ts
 */
const renameMap = {
  // Utility functions
  t: "__asyncGenerator", // async/await helper
  e: "wrapValue", // wrap value in range
  r: "formatNumber", // format number with precision
  o: "isArray", // Array.isArray check
  n: "mathTrunc", // Math.trunc polyfill

  // Geometry classes
  i: "Point", // Point class (x, y coordinates)
  a: "toPoint", // convert to Point
  s: "Bounds", // Bounds class (rectangular bounds)
  u: "toBounds", // convert to Bounds
  l: "LatLngBounds", // LatLngBounds class
  h: "toLatLngBounds", // convert to LatLngBounds
  c: "crs", // Coordinate Reference System
  f: "LatLng", // LatLng class (latitude, longitude)
  d: "toLatLng", // convert to LatLng
  m: "TILE_SIZE", // constant 256 (tile size)

  // Sun calculation functions
  _: "EARTH_AXIS_TILT", // constant for earth axis tilt
  g: "dateToSunPosition", // convert date to sun position
  p: "timestampToSunPosition", // timestamp to sun position
  x: "randomId", // generate random ID
  E: "decodeHoursFromRGB", // decode hours from RGB color
  v: "getTimezoneOffset", // get timezone offset

  // Map wrapper
  T: "createMapWrapper", // create map wrapper for Mapbox/Leaflet

  // Main classes
  y: "EventEmitter", // Event emitter base class
  A: "earcut", // Earcut triangulation algorithm
  b: "buildEarcut", // build for earcut
  R: "removeEmptyRings", // remove empty rings
  M: "meshEarcut", // mesh earcut triangulation
  w: "isValidTriangle", // check if triangle is valid
  F: "isValidTriangleZ", // check if triangle is valid with Z-index
  L: "linkRings", // link polygon rings
  U: "splitPolygon", // split polygon
  D: "sortByX", // sort by X coordinate
  S: "findBridge", // find bridge between polygons
  P: "isValidBridge", // check if bridge is valid
  C: "zOrder", // Z-order curve value
  I: "getLeftmost", // get leftmost point
  B: "isInsideTriangle", // check if point is inside triangle
  N: "isValidDiagonal", // check if diagonal is valid
  O: "triangleArea", // calculate triangle area
  z: "pointsEqual", // check if two points are equal
  X: "segmentsIntersect", // check if segments intersect
  G: "isPointOnSegment", // check if point is on segment
  H: "sign", // get sign of number
  W: "isEar", // check if vertex is an ear
  j: "splitEarcut", // split earcut node
  Y: "insertNode", // insert node
  Z: "removeNode", // remove node
  K: "EarcutNode", // Earcut node constructor
  k: "signedArea", // calculate signed area
  V: "processBuildings", // process building features
  q: "projectLatLng", // project lat/lng to pixel coords
  $: "unprojectPixel", // unproject pixel to lat/lng

  // Height map and terrain
  J: "cachedTilesetString", // cached tileset for comparison
  Q: "heightMapData", // global height map data
  tt: "updateHeightMap", // update height map
  et: "rgbToColor", // convert RGB to color array
  rt: "updateShaderDate", // update shader date
  ot: "updateShaderDateRange", // update shader date range
  it: "updateShaderColor", // update shader color
  nt: "renderShade", // render shade on map
  at: "ShadeMapBase", // ShadeMap base class
  st: "setupTexture", // setup WebGL texture
  ut: "createShaderProgram", // create shader program
  lt: "BuildingRasterizer", // Building rasterizer class
  ht: "getTileCoords", // get tile coordinates
  ct: "TileMerger", // Tile merger class
  ft: "MapboxShadeMap", // Mapbox-specific ShadeMap implementation
};

/**
 * Smart replacement function that preserves context
 * Only replaces whole word matches, not partial matches
 */
function smartReplace(code, oldName, newName) {
  if (oldName === newName) return code;

  // Don't replace if it's part of a longer identifier
  // Use word boundaries and specific contexts
  const patterns = [
    // Function declarations: function oldName(
    new RegExp(`\\bfunction\\s+${oldName}\\s*\\(`, "g"),
    // Variable declarations: var/let/const oldName =
    new RegExp(`\\b(var|let|const)\\s+${oldName}\\s*=`, "g"),
    // Property access: .oldName or ['oldName']
    new RegExp(`\\.${oldName}\\b`, "g"),
    // Function parameters and calls: oldName(, (oldName,
    new RegExp(`\\b${oldName}\\s*\\(`, "g"),
    new RegExp(`\\(\\s*${oldName}\\s*[,\\)]`, "g"),
    // Standalone usage: oldName, oldName;, oldName)
    new RegExp(`([^a-zA-Z0-9_])${oldName}([^a-zA-Z0-9_])`, "g"),
  ];

  let result = code;
  patterns.forEach((pattern, index) => {
    if (index === 0) {
      result = result.replace(pattern, `function ${newName}(`);
    } else if (index === 1) {
      result = result.replace(pattern, `$1 ${newName} =`);
    } else if (index === 2) {
      result = result.replace(pattern, `.${newName}`);
    } else if (index === 3) {
      result = result.replace(pattern, `${newName}(`);
    } else if (index === 4) {
      result = result.replace(pattern, `(${newName}$2`);
    } else if (index === 5) {
      result = result.replace(pattern, `$1${newName}$2`);
    }
  });

  return result;
}

console.log("Starting deobfuscation...");
console.log(`Input: ${INPUT_FILE}`);
console.log(`Output: ${OUTPUT_FILE}`);

// Apply all renames
let totalReplacements = 0;
Object.entries(renameMap).forEach(([oldName, newName]) => {
  const before = code.length;
  code = smartReplace(code, oldName, newName);
  const after = code.length;
  const diff = Math.abs(after - before);
  if (diff > 0) {
    console.log(`✓ Renamed: ${oldName} -> ${newName} (${diff} chars changed)`);
    totalReplacements++;
  }
});

// Write the output
fs.writeFileSync(OUTPUT_FILE, code, "utf8");

console.log(`\n✨ Deobfuscation complete!`);
console.log(`   Applied ${totalReplacements} renames`);
console.log(`   Output written to: ${OUTPUT_FILE}`);
