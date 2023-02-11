import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		VitePWA({
			injectRegister: 'auto',
			registerType: 'autoUpdate',
			includeAssets: ['./assets/icon.png'],
			manifest: {
				orientation: 'landscape',
				name: 'Dungeon Survivor',
				short_name: 'Dungeon Survivor',
				description: 'Dungeon Survivor',
				theme_color: '#000000',
				icons: [
					{
						src: 'p./assets/icon.png',
						sizes: '64x64',
						type: 'image/png'
					}
				]
			}
		})
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