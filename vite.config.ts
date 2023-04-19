import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import { internalIpV4 } from 'internal-ip'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig(async () => {
	const host = await internalIpV4()

	/** @type {import('vite').UserConfig} */
	const config = {
		plugins: [
			wasm(),
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
		server: {
			host: '0.0.0.0', // listen on all addresses
			port: 5173,
			strictPort: true,
			hmr: {
				protocol: 'ws',
				host,
				port: 5183,
			},
		},
	}

	return config
})
