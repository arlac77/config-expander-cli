import cleanup from "rollup-plugin-cleanup";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import executable from "rollup-plugin-executable";
import json from "rollup-plugin-json";
import pkg from "./package.json";

export default Object.keys(pkg.bin || {}).map(name => {
  return {
    input: `src/${name}-cli.mjs`,
    output: {
      file: pkg.bin[name],
      format: "cjs",
      banner:
        "#!/usr/bin/env -S node --experimental-modules --experimental-worker",
      interop: false
    },
    plugins: [
      commonjs(),
      json({
        include: "package.json",
        preferConst: true,
        compact: true
      }),
      cleanup(),
      executable()
    ],
    external: ["os", "path", "config-expander", "caporal"]
  };
});
