import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from "vite";

export default defineConfig({
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
	},
	plugins: [
		// VitePWA({
		// 	injectRegister: 'auto',
		// 	registerType: 'autoUpdate',
		// 	includeAssets: ['./assets/icon.png'],
		// 	manifest: {
		// 		orientation: 'landscape',
		// 		name: 'Dungeon Survivor',
		// 		short_name: 'Dungeon Survivor',
		// 		description: 'Dungeon Survivor',
		// 		theme_color: '#000000',
		// 		icons: [
		// 			{
		// 				src: './assets/icon.png',
		// 				sizes: '64x64',
		// 				type: 'image/png'
		// 			}
		// 		]
		// 	},
		// })
		VitePWA({
			base: '/Dungeon-Survivor/',
			// buildBase: '/Dungeon-Survivor/',
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg'],
			filename: 'custom-sw.ts',
			srcDir: 'src',
			manifest: {
				name: 'PWA Router',
				short_name: 'PWA Router',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png', // <== don't add slash, for testing
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/pwa-512x512.png', // <== don't remove slash, for testing
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png', // <== don't add slash, for testing
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
			injectManifest: {
				injectionPoint: undefined,
			},
		}),
	],
	base: "/Dungeon-Survivor/",
	server: {
		host: true
	},
	build: {
		target: 'esnext',
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.split('/').at(-1) == '_composite.png') {
						const splitPath = assetInfo.name?.split('/')
						return `assets/${splitPath.at(-2)}[extname]`
					}
					return 'assets/[name]-[hash][extname]'
				}
			}

		}
	}
})