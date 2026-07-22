import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// Must be listed before the React plugin so it can transform route files.
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
			// Keep colocated *.test.tsx files in src/routes out of the route tree.
			routeFileIgnorePattern: '\\.test\\.',
		}),
		react(),
		tailwindcss(),
		imagetools(),
	],
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
	},
})
