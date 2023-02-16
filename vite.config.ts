import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
			manifest: {
				start_url: "index.html?fullscreen=true",
				display: "fullscreen",
				orientation: 'landscape',
				name: 'Dungeon Survivor',
				short_name: 'DungeonSurvivor',
				description: 'Dungeon Survivor',
				theme_color: '#000000',
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
					}
				]
			},
			devOptions: {
				enabled: true
			}
		})
	],
	base: "/Dungeon-Survivor/",
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