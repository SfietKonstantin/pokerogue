import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple'
import path from 'node:path'

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			electron({
				main: { entry: "electron/main.ts" }
			})
		],
		server: { host: '0.0.0.0', port: 8000 },
		clearScreen: false,
		build: {
			minify: 'esbuild',
			sourcemap: true
		},
		esbuild: {
			pure: mode === 'production' ? [ 'console.log' ] : [],
			keepNames: true,
		},
	}
})
