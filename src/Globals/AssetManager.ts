import getBuffer from '../Utils/Buffer'
import imageSource from './../../assets/0x72_DungeonTilesetII_v1.4.png'
import normalsSource from './../../assets/0x72_DungeonTilesetII_v1.4-normals.png'
import tilesList from './../../assets/tiles_list_v1.4.txt?raw'
import Tile from '../Utils/Tile'

const loadImage = async (source: string) => {
	const img = new Image()
	img.src = source
	await new Promise(resolve => {
		img.onload = resolve
	})
	return img

}
const img = await loadImage(imageSource)
const normals = await loadImage(normalsSource)
const UISources = import.meta.glob('./../../assets/UI/*.png', { eager: true })
const UIImages: Record<string, Tile> = {}
for (let path of Object.values(UISources).map((module: any) => module.default)) {
	const fileName = path.split('/').at(-1).split('.').at(-2)
	const image = await loadImage(path)
	const buffer = getBuffer(image.width, image.height)
	buffer.drawImage(image, 0, 0)
	UIImages[fileName] = new Tile({
		buffer: buffer
	})
}

const tiles = tilesList
	.split('\n')
	.map((tile: string) => tile.split(' '))
	.filter((tileList) => tileList.every(item => item))
	.reduce((acc, [tileName, top, left, width, height, frames = '1']) => {
		const totalWidth = parseInt(width) * parseInt(frames)
		const buffer = getBuffer(totalWidth, parseInt(height))
		const normalMap = getBuffer(totalWidth, parseInt(height))
		buffer.drawImage(img, parseInt(top), parseInt(left), totalWidth, parseInt(height), 0, 0, totalWidth, parseInt(height))
		normalMap.drawImage(normals, parseInt(top), parseInt(left), totalWidth, parseInt(height), 0, 0, totalWidth, parseInt(height))

		const tile: Tile = new Tile({
			buffer,
			normalMap,
			width: Number(width),
			height: Number(height),
			frames: Number(frames)
		})
		return { ...acc, [tileName]: tile }

	}, {})

const AssetManager = new class {
	image = img
	tiles = tiles as Record<tileName, Tile>
	UI = UIImages as Record<string, Tile>
}
export default AssetManager