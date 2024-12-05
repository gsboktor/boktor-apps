// const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
// const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');
// const { join } = require('path');

// module.exports = {
//   output: {
//     path: join(__dirname, '../../dist/packages/boktor-portfolio'),
//   },
//   devServer: {
//     port: 4200,
//     historyApiFallback: {
//       index: '/index.html',
//       disableDotRule: true,
//       htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
//     },
//   },
//   plugins: [
//     new NxAppWebpackPlugin({
//       tsConfig: './tsconfig.app.json',
//       compiler: 'babel',
//       main: './src/main.tsx',
//       index: './src/index.html',
//       baseHref: '/',
//       assets: ['./src/favicon.ico', './src/assets'],
//       styles: ['./src/styles.css'],
//       outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
//       optimization: process.env['NODE_ENV'] === 'production',
//     }),
//     new NxReactWebpackPlugin({
//       // Uncomment this line if you don't want to use SVGR
//       // See: https://react-svgr.com/
//       // svgr: false
//     }),
//   ],
// };

const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    // Update the webpack config as needed here.
    // e.g. config.plugins.push(new MyPlugin())
    // For more information on webpack config and Nx see:
    // https://nx.dev/packages/webpack/documents/webpack-config-setup
    return config;
  }
);
