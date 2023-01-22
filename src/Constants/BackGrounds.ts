import { Color } from "three"
import ColumnEntity from "../Entities/ColumnEntity"
import { Entity } from "../Globals/ECS"
import Tile from "../Utils/Tile"
import { assets } from "../Globals/Initialize"

export interface Background {
	tiles: [Tile, number][]
	detailHook?: (buffer: CanvasRenderingContext2D) => (x: number, y: number) => void
	childrenHook?: (background: Entity) => void
	lightColor?: Color
}
const BACKGROUNDS: Record<string, Background> = {
	DUNGEON: {
		tiles: [
			[assets.tiles.floor_1, 10],
			[assets.tiles.floor_2, 1],
			[assets.tiles.floor_3, 1],
			[assets.tiles.floor_4, 1],
			[assets.tiles.floor_5, 1],
			[assets.tiles.floor_6, 1],
			[assets.tiles.floor_7, 1],
			[assets.tiles.floor_8, 1],
		],
		childrenHook: background => {
			const width = window.innerWidth
			const height = window.innerHeight
			for (let x = 0; x < width; x += 256) {
				for (let y = 0; y < height; y += 256) {
					background.addChildren(ColumnEntity(x - width / 2, y - height / 2))
				}
			}
		},
		lightColor: new Color('hsl(0,0%,4%)')
	},
	FOREST: {
		tiles: [
			[assets.tiles.grass_1, 10],
			[assets.tiles.grass_2, 1],
			[assets.tiles.grass_3, 1],
			[assets.tiles.grass_4, 1],
			[assets.tiles.grass_5, 1],
		],
		detailHook: buffer => (x, y) => {
			const details = [
				assets.tiles.grass_detail_1,
				assets.tiles.grass_detail_2,
				assets.tiles.grass_detail_3,
				assets.tiles.grass_detail_4,
				assets.tiles.grass_detail_5,
				assets.tiles.grass_detail_6,
				assets.tiles.grass_detail_7,
				assets.tiles.grass_detail_8,
			]
			if (Math.random() < 0.05) buffer.drawImage(details[Math.floor(details.length * Math.random())].buffer.canvas, x, y)

		},
		lightColor: new Color('hsl(0,0%,60%)')
	}

}
export default BACKGROUNDS