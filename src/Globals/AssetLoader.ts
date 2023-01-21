import Tile from '../Utils/Tile'
import getBuffer from '../Utils/Buffer'

class AssetLoader {
	async loadImage(source: string) {
		const img = new Image()
		img.src = source
		await new Promise(resolve => {
			img.onload = resolve
		})
		return img
	}
	async loadFromTileList(tileList: string, imageSource: string): Promise<Record<string, Tile>> {
		const image = await this.loadImage(imageSource)
		return tileList
			.split('\r\n')
			.map((tile: string) => tile.split(' '))
			.filter((tileList) => tileList.every(item => item))
			.reduce((acc, [tileName, top, left, width, height, frames = '1']) => {
				const totalWidth = parseInt(width) * parseInt(frames)
				const buffer = getBuffer(totalWidth, parseInt(height))
				buffer.drawImage(image, parseInt(top), parseInt(left), totalWidth, parseInt(height), 0, 0, totalWidth, parseInt(height))

				const tile: Tile = new Tile({
					buffer,
					width: Number(width),
					height: Number(height),
					frames: Number(frames),
					padding: tileName.includes('anim')
				})
				return { ...acc, [tileName]: tile }
			}, {})
	}
	async loadFromSlices(data: any, source: string, fn: (args: any) => any = x => x): Promise<Record<string, Tile>> {
		const img = await this.loadImage(source)
		return data.meta.slices.reduce((acc: any, slice: any) => {

			const { w, h, x, y }: Record<string, number> = slice.keys[0].bounds
			const buffer = getBuffer(w, h)
			buffer.drawImage(img, x, y, w, h, 0, 0, w, h)
			return { ...acc, [slice.name]: new Tile(fn({ buffer })) }
		}, {})
	}
	async loadFromGlob(glob: Record<string, { default: string }>) {
		const images = await Promise.all(Object.values(glob).map(async module => Tile.fromImage(await this.loadImage(module.default!))))
		return Object.keys(glob).reduce((acc, v, index) => {
			return { ...acc, [v.split(/[.\/]/).at(-2) as string]: images[index] }
		}, {})
	}
}
export default AssetLoader