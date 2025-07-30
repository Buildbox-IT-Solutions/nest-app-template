const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/core-api'),
  },
  resolve: {
    alias: {
      '@ce-monorepo/shared': join(__dirname, '../../libs/shared/src/index.ts'),
    },
  },
  externals: [
    'hbs',
    '@nestjs/microservices',
    '@nestjs/websockets',
    'class-transformer/storage',
  ],
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [
        {
          glob: '**/*',
          input: './src/common/i18n',
          output: 'common/i18n',
        },
      ],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
    }),
  ],
};
