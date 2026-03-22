const config = {
    '*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --max-warnings=0'],
    '*.{css,scss}': ['prettier --write', 'stylelint --max-warnings=0'],
    '*.{json,md}': ['prettier --write'],
};

export default config;
