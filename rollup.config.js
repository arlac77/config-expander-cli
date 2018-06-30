import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import executable from 'rollup-plugin-executable';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  ...Object.keys(pkg.bin || {}).map(name => {
    return {
      input: `src/${name}.mjs`,
      output: {
        file: pkg.bin[name],
        format: 'cjs',
        banner: '#!/usr/bin/env node',
        interop: false
      },
      plugins: [resolve(), commonjs(), json(), executable()],
      external: ['os', 'path', 'config-expander']
    };
  })
];
