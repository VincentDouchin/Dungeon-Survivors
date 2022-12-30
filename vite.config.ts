import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
	plugins: [
		VitePWA({ registerType: 'autoUpdate' })
	],
	base: "/Dungeon-Survivor/",
	build: {
		target: 'esnext'
	},
	server: {
		host: true
	}
})