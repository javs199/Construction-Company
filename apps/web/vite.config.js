import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const allDeps = Object.keys(pkg.dependencies || {});

const isDev = process.env.NODE_ENV !== 'production';

console.warn = () => { };

const logger = createLogger()
const loggerError = logger.error

logger.error = (msg, options) => {
	if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		return;
	}

	loggerError(msg, options);
}

export default defineConfig({
	base: process.env.VITE_BASE_PATH || '/',
	optimizeDeps: {
		include: allDeps,
	},
	customLogger: logger,
	plugins: [
		react()
	],
	server: {
		port: 3000,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: [
			'.app-preview.com',
			'.app-preview.io',
		],
		fs: {
			strict: true,
			allow: [
				path.resolve(__dirname),
				path.join(path.resolve(__dirname, '../..'), 'node_modules'),
			],
		},
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: process.env.BUILD_OUT_DIR || 'dist',
		rollupOptions: {
			external: [
				'@babel/parser',
				'@babel/traverse',
				'@babel/generator',
				'@babel/types'
			],
			checks: {
				pluginTimings: false,
			}
		}
	}
});
