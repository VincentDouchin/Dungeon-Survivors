
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"
import { camera } from "../Globals/Initialize"
import getBuffer from "../Utils/Buffer"

const BackgroundEntity = () => {
	const background = new Entity()
	background.addComponent(new PositionComponent(0, 0))
	const width = camera.right * 4
	const height = camera.top * 4
	console.log(width, height)
	const buffer = getBuffer(width, height)
	const floorTiles: Array<[Tile, number]> = [
		[AssetManager.tiles.floor_1, 10],
		[AssetManager.tiles.floor_2, 1],
		[AssetManager.tiles.floor_3, 1],
		[AssetManager.tiles.floor_4, 1],
		[AssetManager.tiles.floor_5, 1],
		[AssetManager.tiles.floor_6, 1],
		[AssetManager.tiles.floor_7, 1],
		[AssetManager.tiles.floor_8, 1],
	]
	const totalWeight = floorTiles.reduce((acc, v) => acc + v[1], 0)
	const allTiles = floorTiles.flatMap(([tile, weight]) => new Array(weight).fill(tile))

	for (let x = 0; x < Math.ceil(width / 16) * 16; x += 16) {
		for (let y = 0; y < Math.ceil(height / 16) * 16; y += 16) {
			const randomTile = allTiles[Math.floor(totalWeight * Math.random())]
			buffer.drawImage(randomTile.buffer.canvas, x, y)
		}
	}
	// document.body.appendChild(buffer.canvas)
	const mesh = new MeshComponent(buffer)
	mesh.mesh.renderOrder = -1
	background.addComponent(mesh)
	return background
}
export default BackgroundEntity