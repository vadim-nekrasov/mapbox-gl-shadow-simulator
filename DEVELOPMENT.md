# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch

# Test in browser
python3 -m http.server 8080
# Then open: http://localhost:8080/examples/markers.html
```

## Making Changes

### 1. Edit Source Code
Edit `src/index.js` - the deobfuscated source file.

### 2. Build
```bash
npm run build
```

This creates:
- `dist/mapbox-gl-shadow-simulator.esm.js` - ES Module
- `dist/mapbox-gl-shadow-simulator.umd.min.js` - UMD for browsers

### 3. Test
Open `examples/markers.html` or `examples/map.html` in browser to verify changes.

## Code Navigation

The source code has 10 major sections (marked with `// ============================================`):

1. **ASYNC/AWAIT HELPER** (line 15) - Promise polyfills
2. **GEOMETRY UTILITIES** (line 81) - Point, Bounds, LatLng
3. **MAP CONSTANTS AND PROJECTIONS** (line 529) - Coordinate systems
4. **EVENT EMITTER** (line 634) - Event system
5. **EARCUT TRIANGULATION** (line 670) - Polygon triangulation
6. **BUILDING PROCESSOR** (line 1566) - GeoJSON processing
7. **HEIGHT MAP STATE** (line 2143) - Terrain state
8. **SHADEMAP BASE CLASS** (line 2680) - Core logic
9. **BUILDING RASTERIZER** (line 2145) - WebGL rendering
10. **TILE MERGER** (line 2447) - DEM tiles
11. **MAPBOX SHADEMAP** (line 2680) - Main class
12. **EXPORT** (line 3359) - Module exports

## Main Classes

### EventEmitter (line 637)
Base class for event handling. Provides:
- `on(event, callback)` - Subscribe to events
- `emit(event, ...args)` - Emit events
- `once(event, callback)` - Subscribe once
- `removeListener(event, callback)` - Unsubscribe

### ShadeMapBase (line 1569)
Core shadow simulation logic. Provides:
- Shadow calculation algorithms
- Height map management
- Sun position calculations
- Terrain processing

### MapboxShadeMap (line 2683) - **Main Export**
Mapbox-specific implementation. Public API:
- `constructor(options)` - Initialize with options
- `addTo(map)` - Add to Mapbox map
- `setDate(date)` - Update shadow date/time
- `setColor(color)` - Change shadow color
- `setOpacity(opacity)` - Change opacity
- `setSunExposure(enabled, options)` - Toggle sun exposure mode
- `isPositionInSun(x, y)` - Check if pixel is in sun
- `getHoursOfSun(x, y)` - Get hours of sunlight
- `remove()` - Remove from map

### BuildingRasterizer (line 2146)
WebGL shader program for rendering buildings as height maps.

### TileMerger (line 2450)
Fetches and merges DEM (Digital Elevation Model) tiles.

## Common Tasks

### Add Console Logs for Debugging
```javascript
// In src/index.js, add logs with JSON serialization:
console.log('DEBUG: value =', JSON.stringify(value, null, 2));

// Or for simple values:
console.log('DEBUG: x =', x, 'y =', y);
```

### Modify Shadow Algorithm
Look for `// SHADEMAP BASE CLASS` section and the shader code in `BuildingRasterizer`.

### Change Terrain Processing
Look for `updateHeightMap` function and `TileMerger.merge` method.

### Add New Features
Extend `MapboxShadeMap` class with new methods, then rebuild.

## Testing Workflow

1. Make changes in `src/index.js`
2. Run `npm run build`
3. Refresh `examples/markers.html` in browser (Cmd+Shift+R to clear cache)
4. Check browser console for errors
5. Test all functionality:
   - Shadow rendering
   - Time controls
   - Sun exposure mode
   - Marker detection

## Troubleshooting

### "ShadeMap is not a constructor"
- Check that `export default MapboxShadeMap` is at the end of src/index.js
- Verify rollup.config.js has `exports: 'default'` for UMD build
- Rebuild with `npm run build`

### Shadows not rendering
- Check browser console for WebGL errors
- Verify API key is valid
- Check that terrain source URLs are accessible
- Add debug logs in `_reset()` and `_draw()` methods

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 16+ 
- Verify no syntax errors in src/index.js

## Performance Tips

- The library uses WebGL for rendering - GPU intensive
- Height map calculations are cached (see `heightMapData`)
- Tile requests are batched and deduplicated
- Use `debug` option to monitor performance

## License & Attribution

Remember to:
- Keep copyright notice in source files
- Check with original author before redistribution
- Link to https://shademap.app/about/ for licensing

---

**Happy coding! 🚀**

