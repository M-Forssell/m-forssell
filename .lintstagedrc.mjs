const config = {
    '*.{ts,tsx,js,jsx}': () => 'npm run lint -- --max-warnings=0',
    '*.{css,scss}': () => 'npm run lint:styles -- --max-warnings=0',
};

export default config;
