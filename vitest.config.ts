import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: './vitest.setup.ts',
		css: { modules: { classNameStrategy: 'non-scoped' } },
		server: {
			deps: {
				inline: ['@storyblok/react', '@storyblok/js'],
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
