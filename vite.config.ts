import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		VitePWA({ registerType: 'autoUpdate' })
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