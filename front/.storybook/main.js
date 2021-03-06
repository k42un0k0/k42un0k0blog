const { defineConfig } = require('vite');
module.exports = {
  stories: ['../@(modules|pagesModules)/**/*.stories.mdx', '../@(modules|pagesModules)/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  viteFinal: async (config, { configType }) => {
    // return the customized config
    return defineConfig({
      ...config,
      esbuild: {
        jsxFactory: 'jsx',
        jsxInject: `import { jsx } from 'theme-ui'`,
      },
      define: {
        'window.global': { ...global, global: null },
        process: { env: process.env },
      },
    });
  },
};
