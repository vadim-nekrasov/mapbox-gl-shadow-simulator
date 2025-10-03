import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const production = process.env.NODE_ENV === "production";

export default [
  // ESM build
  {
    input: "src/index.ts",
    output: {
      file: "dist/mapbox-gl-shadow-simulator.esm.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        rootDir: "src",
      }),
    ],
    external: ["mapbox-gl", "suncalc"],
  },
  // UMD build
  {
    input: "src/index.ts",
    output: {
      file: "dist/mapbox-gl-shadow-simulator.umd.min.js",
      format: "umd",
      name: "ShadeMap",
      sourcemap: true,
      exports: "default",
      globals: {
        "mapbox-gl": "mapboxgl",
        suncalc: "SunCalc",
      },
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      production && terser(),
    ],
    external: ["mapbox-gl", "suncalc"],
  },
];
