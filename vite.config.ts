import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
			manifest: {
				start_url: 'index.html?fullscreen=true',
				display: 'fullscreen',
				orientation: 'landscape',
				name: 'Dungeon Survivor',
				short_name: 'DungeonSurvivor',
				description: 'Dungeon Survivor',
				theme_color: '#000000',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
				],
				screenshots: [
					{
						src: 'Screenshots/Screenshot 1.png',
						sizes: '1414x734',
						type: 'image/png',
						platform: 'wide',
					},
					{
						src: 'Screenshots/Screenshot 2.png',
						sizes: '1414x732',
						type: 'image/png',
						platform: 'wide',
					},
					{
						src: 'Screenshots/Screenshot 2.png',
						sizes: '1414x732',
						type: 'image/png',
						platform: 'wide',
					},
				],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
	base: '/',
	build: {
		target: 'esnext',
	},
})
