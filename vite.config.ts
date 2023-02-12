import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from "vite";

export default defineConfig({
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
	},
	plugins: [
		VitePWA({
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
			registerType: 'autoUpdate',
			manifest: {
				name: 'Dungeon Survivor',
				short_name: 'DungeonSurvivor',
				description: 'Dungeon Survivor',
				theme_color: '#000000',
				orientation: 'landscape',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}

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