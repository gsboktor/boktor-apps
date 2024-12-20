const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config, { options, context }) => {
  config.devtool = 'eval-source-map';
  // Update the webpack config as needed here.
  // e.g. config.plugins.push(new MyPlugin())
  // For more information on webpack config and Nx see:
  // https://nx.dev/packages/webpack/documents/webpack-config-setup
  return config;
});
