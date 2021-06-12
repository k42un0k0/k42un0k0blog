module.exports = {
  stories: ['../internal/**/*.stories.mdx', '../internal/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async (options) => ({
    ...options,
    plugins: [...options.plugins, ['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
    // any extra options you want to set
  }),
};
