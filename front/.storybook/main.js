module.exports = {
  stories: ['../(internal|lib)/**/*.stories.mdx', '../(internal|lib)/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async (options) => {
    return ({
    ...options,
    plugins: [...options.plugins, ['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
  })},
};
