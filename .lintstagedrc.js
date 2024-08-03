const path = require('path');

const buildEslintCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ');
  return `next lint --file ${files}`;
};

const buildPrettierCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(' ');
  return `prettier ${files} --write`;
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{css,js,jsx,ts,tsx}': [buildPrettierCommand],
};
