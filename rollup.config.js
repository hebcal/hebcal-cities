const {nodeResolve} = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const banner = '/*! ' + pkg.name + ' v' + pkg.version + ' */';

module.exports = [
  {
    input: 'src/cities.js',
    output: [
      {file: pkg.main, format: 'cjs', name: pkg.name, banner},
    ],
    plugins: [
      json({compact: true, preferConst: true}),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            modules: false,
            targets: {
              node: '16.0.0',
            },
          }],
        ],
        exclude: ['node_modules/**'],
      }),
      nodeResolve(),
    ],
    external: ['@hebcal/core'],
  },
  {
    input: 'src/cities.js',
    output: [
      {file: pkg.module, format: 'es', name: pkg.name, banner},
    ],
    plugins: [
      json({compact: true, preferConst: true}),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            modules: false,
            targets: {
              node: '16.0.0',
            },
          }],
        ],
        exclude: ['node_modules/**'],
      }),
      nodeResolve(),
    ],
    external: ['@hebcal/core'],
  },
  {
    input: 'src/cities.js',
    output: [
      {
        file: 'dist/bundle.js',
        format: 'iife',
        globals: {
          '@hebcal/core': 'hebcal',
        },
        indent: false,
        banner,
      },
      {
        file: 'dist/bundle.min.js',
        format: 'iife',
        globals: {
          '@hebcal/core': 'hebcal',
        },
        plugins: [terser()],
        banner,
      },
    ],
    plugins: [
      json({compact: true, preferConst: true}),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            modules: false,
            targets: {
              chrome: '103',
              firefox: '91',
              edge: '84',
              safari: '15.6',
            },
            useBuiltIns: 'usage',
            corejs: 3,
          }],
        ],
        exclude: ['node_modules/**'],
      }),
      nodeResolve(),
      commonjs(),
    ],
    external: ['@hebcal/core'],
  },
];
