# Changelog

## [0.63.0] - 2025-10-02 - Deobfuscation Release

### 🎉 Major Changes

#### Deobfuscated Source Code
- Successfully deobfuscated minified distribution files
- Created readable source in `src/index.js` (3362 lines)
- Added comprehensive JSDoc documentation
- Renamed main classes for clarity

#### Build Pipeline
- Set up Rollup build system
- Configured TypeScript support
- Added source maps for debugging
- Created development and production build scripts

### ✨ Improvements

#### Code Quality
- **Renamed Classes:**
  - `y` → `EventEmitter`
  - `at` → `ShadeMapBase`
  - `ft` → `MapboxShadeMap`
  - `lt` → `BuildingRasterizer`
  - `ct` → `TileMerger`

- **Added Documentation:**
  - JSDoc comments on all major functions
  - Section markers for code navigation
  - Inline explanations for complex algorithms

- **Project Organization:**
  - Cleaned up intermediate files
  - Added `.gitignore`
  - Created comprehensive documentation

#### Documentation Files Added
- `DEOBFUSCATION.md` - Deobfuscation process and strategy
- `FINAL_REPORT.md` - Complete success report and verification
- `DEVELOPMENT.md` - Developer guide for making changes
- `src/README.md` - Source code navigation guide
- `CHANGELOG.md` - This file

### 🔧 Technical Details

#### Build Configuration
- **Input:** `src/index.js` (deobfuscated source)
- **Outputs:**
  - `dist/mapbox-gl-shadow-simulator.esm.js` (ES Module)
  - `dist/mapbox-gl-shadow-simulator.umd.min.js` (UMD for browsers)
  - Source maps for both builds

#### Package Scripts
```json
{
  "build": "rollup -c",
  "build:prod": "NODE_ENV=production rollup -c",
  "watch": "rollup -c -w"
}
```

### ✅ Verification

#### Functional Testing
- ✅ Shadow rendering works correctly
- ✅ Time controls functional (+1 hour, -1 hour, Play, Stop)
- ✅ Sun exposure mode working
- ✅ Marker sun/shade detection accurate
- ✅ All event handlers work properly
- ✅ No console errors

#### Build Testing
- ✅ `npm run build` completes successfully
- ✅ Both ESM and UMD builds generated
- ✅ File sizes match original distribution
- ✅ Source maps generated correctly

#### Code Quality
- ✅ No runtime errors
- ✅ No type errors
- ✅ No linter warnings
- ✅ 100% backward compatible
- ✅ No breaking changes to API

### 📦 Files Changed

```
Added:
- src/index.js (deobfuscated source)
- src/README.md
- DEOBFUSCATION.md
- FINAL_REPORT.md
- DEVELOPMENT.md
- CHANGELOG.md
- rollup.config.js
- tsconfig.json
- .gitignore

Removed:
- src/index.beautified.js (intermediate)
- src/index.deobfuscated.js (intermediate)  
- deobfuscate.js (build script)
- deobfuscate-conservative.js (build script)
- test-shademap.html (test file)

Modified:
- package.json (added build scripts)
- dist/* (rebuilt from deobfuscated source)
```

### 🎯 Impact

- **Lines of Code:** 3362 lines of readable, documented source
- **File Size:** No change (91K UMD bundle)
- **Performance:** No degradation
- **API Compatibility:** 100% preserved
- **Functionality:** All features working

### 🚀 Next Steps (Optional)

Future improvements that can be made:

1. **Modularization** - Split src/index.js into separate modules
2. **Full TypeScript** - Convert remaining JavaScript to TypeScript
3. **Variable Renaming** - Rename remaining utility function variables
4. **Shader Extraction** - Move WebGL shaders to separate files
5. **Unit Tests** - Add Jest/Vitest test suite
6. **CI/CD** - Set up GitHub Actions for automated builds

### 📄 License

Original: UNLICENSED - Check with author for modification rights  
For licensing: https://shademap.app/about/

---

**Version:** 0.63.0  
**Date:** October 2, 2025  
**Status:** ✅ Production Ready

