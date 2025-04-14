const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: require.resolve('pdfjs-dist/build/pdf.worker.mjs'),
          to: 'pdf.worker.mjs',
        },
        {
          from: path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
          to: 'cmaps',
        },
      ],
    }),
  );

  return config;
});
