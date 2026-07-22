/// <reference types="vite/client" />

// Handle image imports with vite-imagetools query parameters
// Suppress TS2307 errors for vite-imagetools generated imports
declare module './assets/food-images/*' {
	const content: string
	export default content
}
