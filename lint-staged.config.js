module.exports = {
  'apps/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  'packages/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  'infra/**/*.tf': [
    'prettier --write'
  ]
};
