const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/index.js");
let code = fs.readFileSync(filePath, "utf8");

// Replace arrow function with __awaiter pattern
// const fn = (param) => t(void 0, void 0, void 0, function* () { ... });
// Replace with: const fn = async (param) => { ... };
code = code.replace(
  /const (\w+) = \(([^)]*)\) =>\s*t\(void 0, void 0, void 0, function\* \(\) \{/g,
  "const $1 = async ($2) => {",
);

// Replace inline anonymous function: t(void 0, void 0, void 0, function* () { ... })
// With: (async () => { ... })
code = code.replace(
  /t\(void 0, void 0, void 0, function\* \(\) \{/g,
  "(async () => {",
);

// Replace inline with 'this': t(this, void 0, void 0, function* () { ... })
// With: (async () => { ... })
code = code.replace(
  /t\(this, void 0, void 0, function\* \(\) \{/g,
  "(async () => {",
);

// Replace all yield with await
code = code.replace(/yield /g, "await ");

fs.writeFileSync(filePath, code, "utf8");
console.log("Fixed remaining __awaiter usage!");
