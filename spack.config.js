/* eslint-disable */
const { config } = require('@swc/core/spack');

module.exports = config({
  entry: {
    index: __dirname + '/src/index.ts',
  },
  output: {
    path: __dirname + '/dist',
  },
  options: {
    minify: true,
    jsc: {
      target: 'es2016',
    },
  },
});
