import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { createFilter } from "@rollup/pluginutils";

const production = process.env.NODE_ENV === "production";

// Simple plugin to strip type imports from JS files
const stripTypeImports = () => {
  const filter = createFilter("**/*.js");
  return {
    name: "strip-type-imports",
    transform(code, id) {
      if (!filter(id)) return null;
      // Remove type-only imports
      const transformed = code.replace(/^import\s+type\s+.*?;?\s*$/gm, "");
      return { code: transformed, map: null };
    },
  };
};

export default [
  // ESM build
  {
    input: "src/index.js",
    output: {
      file: "dist/mapbox-gl-shadow-simulator.esm.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [resolve(), stripTypeImports()],
    external: ["mapbox-gl", "suncalc"],
  },
  // UMD build
  {
    input: "src/index.js",
    output: {
      file: "dist/mapbox-gl-shadow-simulator.umd.min.js",
      format: "umd",
      name: "ShadeMap",
      sourcemap: true,
      exports: "default", // Export only the default export
      globals: {
        "mapbox-gl": "mapboxgl",
        suncalc: "SunCalc",
      },
    },
    plugins: [resolve(), stripTypeImports(), production && terser()],
    external: ["mapbox-gl", "suncalc"],
  },
];
