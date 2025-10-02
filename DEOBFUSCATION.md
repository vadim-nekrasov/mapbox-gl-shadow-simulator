# Deobfuscation Notes

This codebase has been deobfuscated from the original minified distribution files.

## What Was Done

### 1. Structure & Organization
- ✅ Created `src/` directory with deobfuscated source
- ✅ Set up TypeScript configuration and build pipeline (Rollup)
- ✅ Added section markers and comments throughout the code
- ✅ Preserved original copyright and licensing information

### 2. Class Renaming
Major classes have been renamed for clarity:
- `y` → `EventEmitter` - Event emitter base class
- `at` → `ShadeMapBase` - ShadeMap base implementation  
- `ft` → `MapboxShadeMap` - Mapbox-specific implementation (exported as default)
- `lt` → `BuildingRasterizer` - WebGL building rasterization
- `ct` → `TileMerger` - DEM tile merging functionality

### 3. Code Documentation
- Added JSDoc comments to key functions
- Added explanatory comments for utility functions
- Marked low-level utilities that were kept with minified names for stability

### 4. Utility Functions
Low-level utility functions (`t`, `e`, `r`, `i`, `o`, `n`, etc.) were kept with their original names to:
- Avoid potential bugs from renaming complex geometric/mathematical operations
- Maintain stability of the working codebase
- These functions are now documented with comments explaining their purpose

### 5. Build Pipeline
```bash
# Build the project
npm run build

# Watch mode for development
npm run watch

# Production build (with minification)
npm run build:prod
```

## File Structure

```
src/
  └── index.js          # Main deobfuscated source (3300+ lines)

dist/
  ├── mapbox-gl-shadow-simulator.esm.js      # ES Module build
  ├── mapbox-gl-shadow-simulator.umd.min.js  # UMD build for browsers
  └── mapbox-gl-shadow-simulator.d.ts        # TypeScript definitions

examples/
  ├── markers.html      # Working example with shadows
  └── map.html          # Map example
```

## Key Sections in src/index.js

1. **ASYNC/AWAIT HELPER** - TypeScript polyfills
2. **GEOMETRY UTILITIES** - Point, Bounds, LatLng classes
3. **MAP CONSTANTS AND PROJECTIONS** - Coordinate transformations
4. **EVENT EMITTER** - Event system
5. **EARCUT TRIANGULATION** - Polygon triangulation algorithm
6. **BUILDING PROCESSOR** - GeoJSON building processing
7. **HEIGHT MAP STATE** - Terrain height map management
8. **SHADEMAP BASE CLASS** - Core shadow calculation logic
9. **BUILDING RASTERIZER** - WebGL rendering for buildings
10. **TILE MERGER** - DEM tile loading and merging
11. **MAPBOX SHADEMAP** - Main exported class

## Testing

The deobfuscated code has been tested with:
- ✅ `examples/markers.html` - All features working
- ✅ Shadow rendering
- ✅ Date/time controls
- ✅ Sun exposure mode
- ✅ Marker sun/shade detection

## Next Steps (Optional)

If further deobfuscation is needed:

1. **Split into modules** - Break `src/index.js` into separate files:
   - `src/geometry/Point.js`
   - `src/geometry/Bounds.js`
   - `src/sun/calculations.js`
   - `src/webgl/shaders.js`
   - etc.

2. **Add TypeScript types** - Convert utility functions to TypeScript

3. **Rename more variables** - Carefully rename remaining single-letter variables in utility functions (with comprehensive testing)

4. **Extract shaders** - Move WebGL shader code to separate files

## License

Original package: `mapbox-gl-shadow-simulator` v0.63.0  
Copyright: Ted Piotrowski 2025  
License: UNLICENSED (check with author for modification rights)  
For licensing: https://shademap.app/about/

