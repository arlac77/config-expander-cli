import builtins from "builtin-modules";
import cleanup from "rollup-plugin-cleanup";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import executable from "rollup-plugin-executable";
import json from "rollup-plugin-json";
import pkg from "./package.json";

const external = [
  ...builtins
];

export default Object.keys(pkg.bin || {}).map(name => {
  return {
    input: `src/${name}-cli.mjs`,
    output: {
      file: pkg.bin[name],
      format: "cjs",
      banner:
        "#!/usr/bin/env -S node --experimental-modules",
      interop: false
    },
    plugins: [
      commonjs(),
      resolve(),
      json({
        preferConst: true,
        compact: true
      }),
      cleanup(),
      executable()
    ],
    external
  };
});
