module.exports = {
  "front/**/*.(ts|tsx)": [
    "yarn --cwd front lint:fix",
    "yarn --cwd front format"
  ],
};
