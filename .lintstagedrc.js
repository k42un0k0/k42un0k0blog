module.exports = {
  "front/**/*.(ts|tsx)": [
    "yarn --cwd front eslint --fix ",
    "yarn --cwd front prettier --write "
  ],
};
