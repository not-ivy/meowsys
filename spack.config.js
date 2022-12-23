const { config } = require('@swc/core/spack');

module.exports = config({
  entry: {
    index: __dirname + '/src/index.ts',
  },
  output: {
    path: __dirname + '/dist',
  },
  options: {
    minify: false,
    module: {
      type: 'commonjs',
      strict: true,
      strictMode: true,
      lazy: true,
      importInterop: 'swc',
    },
  },
});
