import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import eslint from '@rollup/plugin-eslint';
import del from 'rollup-plugin-delete';
import merge from 'lodash/mergeWith';
import { parcel } from './package.json';

const BUILD_PATH = '.';
const {
  exports,
  externals
} = parcel;

function rollupMerge(base, source) {
  let config = merge({}, base, source, (obj, src, key) => {
    // 合并数组
    if (Array.isArray(obj) || Array.isArray(src)) {
      return [].concat(obj, src).filter(Boolean);
    }
  });

  return config;
}

function base() {
  return {
    external: externals,
    plugins: [
      del({
      	targets: ['index.js', 'vue.js', 'common.js']
      }),
      eslint({
        fix: true,
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**/*.js'],
        configFile: '.eslintrc.js'
      }),
      // nodeResolve(),
      commonjs(),
      json()
      // terser()
    ]
  };
}

const parcels = [{
  input: ['src/index.js', 'src/vue.js'],
  output: {
    dir: BUILD_PATH,
    exports,
    chunkFileNames: 'common.js',
    format: 'cjs'				// commonjs module
  }
}];

export default parcels.map(parcel => rollupMerge(base(), parcel));