import getBuffer from '../Utils/Buffer'
import imageSource from '/0x72_DungeonTilesetII_v1.4.png'
import tilesList from '/tiles_list_v1.4.txt?raw'

const img = new Image()
img.src = imageSource
await new Promise(resolve => {
	img.onload = resolve
})
// const tiles: Record<string, Tile> = new Map()
const tiles = tilesList
	.split('\n')
	.map((tile: string) => tile.split(' '))
	.filter((tileList) => tileList.every(item => item))
	.reduce((acc, [tileName, top, left, width, height, frames = '1']) => {
		const totalWidth = parseInt(width) * parseInt(frames)
		const buffer = getBuffer(totalWidth, parseInt(height))
		buffer.drawImage(img, parseInt(top), parseInt(left), totalWidth, parseInt(height), 0, 0, totalWidth, parseInt(height))
		const tile: Tile = {
			buffer,
			x: Number(top),
			y: Number(left),
			width: Number(width),
			height: Number(height),
			frames: Number(frames)
		}
		return { ...acc, [tileName]: tile }

	}, {})

const AssetManager = new class {
	image = img
	tiles = tiles as Record<tileName, Tile>
}
export default AssetManager