import { ECS, Entity } from "../Globals/ECS"

import { Background } from "../Constants/BackGrounds"
import ColumnEntity from "./ColumnEntity"
import ECSEVENTS from "../Constants/ECSEvents"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import Tile from "../Utils/Tile"
import getBuffer from "../Utils/Buffer"

const BackgroundEntity = (backgroundDefinition: Background) => {
	const background = new Entity()
	const position = new PositionComponent(0, 0)
	background.addComponent(position)
	const width = Math.floor(window.innerWidth / 16) * 16
	const height = Math.floor(window.innerHeight / 16) * 16

	const buffer = getBuffer(width, height)
	const floorTiles = backgroundDefinition.tiles

	const totalWeight = floorTiles.reduce((acc, v) => acc + v[1], 0)
	const allTiles = floorTiles.flatMap(([tile, weight]) => new Array(weight).fill(tile))

	for (let x = 0; x < Math.ceil(width / 16) * 16; x += 16) {
		for (let y = 0; y < Math.ceil(height / 16) * 16; y += 16) {
			const randomTile = allTiles[Math.floor(totalWeight * Math.random())]
			buffer.drawImage(randomTile.buffer.canvas, x, y)
			backgroundDefinition.detailHook && backgroundDefinition.detailHook(buffer)(x, y)
		}
	}
	backgroundDefinition.childrenHook && backgroundDefinition.childrenHook(background)
	const mesh = new SpriteComponent(new Tile({ buffer }), { renderOrder: 0 })
	ECS.eventBus.subscribe(ECSEVENTS.CAMERAMOVE, ({ x, y }: { x: number, y: number }) => {
		mesh.texture.offset.x = x / mesh.width
		mesh.texture.offset.y = y / mesh.height
		position.x = x
		position.y = y
	})
	background.addComponent(mesh)
	return background
}
export default BackgroundEntity