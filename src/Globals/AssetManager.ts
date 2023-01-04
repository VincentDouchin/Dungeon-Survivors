import getBuffer from '../Utils/Buffer'
import imageSource from './../../assets/0x72_DungeonTilesetII_v1.4.png'
import normalsSource from './../../assets/0x72_DungeonTilesetII_v1.4-normals.png'
import hurtSource from './../../assets/0x72_DungeonTilesetII_v1.4-red.png'
import outlineSource from './../../assets/0x72_DungeonTilesetII_v1.4-outline.png'
import tilesList from './../../assets/tiles_list_v1.4.txt?raw'
import Tile from '../Utils/Tile'
import GUISource from './../../assets/GUI.png'
import GUIData from './../../assets/GUI.json'
import iconsSource from './../../assets/icons.png'
import iconsData from './../../assets/icons.json'
const loadImage = async (source: string) => {
	const img = new Image()
	img.src = source
	await new Promise(resolve => {
		img.onload = resolve
	})
	return img

}
const mainImage = await loadImage(imageSource)
const normalsImage = await loadImage(normalsSource)
const UI = await loadImage(GUISource)
const hurtImage = await loadImage(hurtSource)
const outlineImage = await loadImage(outlineSource)
const iconsImage = await loadImage(iconsSource)
const sliceTileset = (data: any, img: HTMLImageElement) => data.meta.slices.reduce((acc: any, slice: any) => {

	const { w, h, x, y }: Record<string, number> = slice.keys[0].bounds
	const buffer = getBuffer(w, h)
	buffer.drawImage(img, x, y, w, h, 0, 0, w, h)
	return { ...acc, [slice.name]: new Tile({ buffer }) }
}, {})
const UIImages = sliceTileset(GUIData, UI)
const icons = sliceTileset(iconsData, iconsImage)
const tiles = tilesList
	.split('\n')
	.map((tile: string) => tile.split(' '))
	.filter((tileList) => tileList.every(item => item))
	.reduce((acc, [tileName, top, left, width, height, frames = '1']) => {
		const totalWidth = parseInt(width) * parseInt(frames)
		// const buffer = getBuffer(totalWidth, parseInt(height))
		// const normalMap = getBuffer(totalWidth, parseInt(height))
		// buffer.drawImage(img, parseInt(top), parseInt(left), totalWidth, parseInt(height), 0, 0, totalWidth, parseInt(height))
		// normalMap.drawImage(normals, parseInt(top), parseInt(left), totalWidth, parseInt(height), 0, 0, totalWidth, parseInt(height))
		const [buffer, normalMap, hurt, outline] = [mainImage, normalsImage, hurtImage, outlineImage].map((img) => {
			const buffer = getBuffer(totalWidth, parseInt(height))
			buffer.drawImage(img, parseInt(top), parseInt(left), totalWidth, parseInt(height), 0, 0, totalWidth, parseInt(height))
			return buffer
		})
		const tile: Tile = new Tile({
			buffer,
			normalMap,
			hurt,
			outline,
			width: Number(width),
			height: Number(height),
			frames: Number(frames)
		})
		return { ...acc, [tileName]: tile }

	}, {})

const AssetManager = new class {
	tiles = tiles as Record<tileName, Tile>
	UI = UIImages as Record<string, Tile>
	icons = icons as Record<string, Tile>
}
export default AssetManager