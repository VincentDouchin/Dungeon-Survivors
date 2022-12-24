import getBuffer from '../Utils/Buffer'
import imageSource from '/0x72_DungeonTilesetII_v1.4.png'
import tilesList from '/tiles_list_v1.4.txt?raw'

const img = new Image()
img.src = imageSource
await new Promise(resolve => {
	img.onload = resolve
})
interface Tile {
	buffer: CanvasRenderingContext2D
	x: number
	y: number
	width: number
	height: number
	frames: number
}
const tiles: Map<string, Tile> = new Map()
tilesList
	.split('\n')
	.map((tile: string) => tile.split(' '))
	.filter((tileList) => tileList.every(item => item))
	.forEach(([tileName, top, left, width, height, frames = 1]) => {
		const buffer = getBuffer(parseInt(width), parseInt(height))
		buffer.drawImage(img, parseInt(top), parseInt(left), parseInt(width), parseInt(height), 0, 0, parseInt(width), parseInt(height))
		const tile: Tile = {
			buffer,
			x: Number(top),
			y: Number(left),
			width: Number(width),
			height: Number(height),
			frames: Number(frames)
		}
		tiles.set(tileName, tile)

	})

const AssetManager = new class {
	image = img
	tiles = tiles

}
export default AssetManager