# Source Code Structure

This directory contains the **deobfuscated source code** for mapbox-gl-shadow-simulator.

## Main File

- **`index.js`** (3362 lines) - Complete deobfuscated source with:
  - Formatted and readable code structure
  - Section markers for easy navigation
  - JSDoc comments on key functions
  - Renamed main classes for clarity

## Deobfuscated Classes

| Original | Deobfuscated | Purpose |
|----------|--------------|---------|
| `y` | `EventEmitter` | Event system base class |
| `at` | `ShadeMapBase` | Core shadow calculation logic |
| `ft` | `MapboxShadeMap` | Main exported class (Mapbox integration) |
| `lt` | `BuildingRasterizer` | WebGL building rendering |
| `ct` | `TileMerger` | DEM tile loading and merging |

## Code Sections

Navigate through the code using these section markers:

1. **ASYNC/AWAIT HELPER** - TypeScript polyfills for async operations
2. **GEOMETRY UTILITIES** - Point, Bounds, LatLng classes and conversions
3. **MAP CONSTANTS AND PROJECTIONS** - Coordinate system transformations
4. **EVENT EMITTER** - Custom event system implementation
5. **EARCUT TRIANGULATION** - Polygon triangulation algorithm for buildings
6. **BUILDING PROCESSOR** - GeoJSON building feature processing
7. **HEIGHT MAP STATE** - Global state for terrain height maps
8. **SHADEMAP BASE CLASS** - Core shadow simulation logic
9. **BUILDING RASTERIZER** - WebGL shader programs for building rendering
10. **TILE MERGER** - DEM tile fetching and merging
11. **MAPBOX SHADEMAP** - Main class exported to users

## Building

```bash
npm run build        # Build both ESM and UMD
npm run build:prod   # Build with minification
npm run watch        # Watch mode for development
```

## Notes on Minified Names

Some low-level utility functions retain their original minified names (`t`, `e`, `r`, `i`, `o`, etc.) to:
- Avoid potential bugs from renaming complex mathematical operations
- Maintain proven stability of geometric calculations
- These functions are now documented with JSDoc comments

All **main classes and public APIs** have been given semantic names for clarity.

