const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/packages/lio-services'),
  },
  plugins: [
    new Dotenv({
      path: (() => {
        console.info('CURRENT_ENV:', process.env.NODE_ENV);
        return process.env.NODE_ENV === 'production'
          ? './.env.production'
          : process.env.NODE_ENV === 'local'
          ? './.env'
          : './.env.development';
      })(),
    }),
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: true,
      outputHashing: 'none',
      sourceMap: false,
      generatePackageJson: false,
    }),
  ],
};
