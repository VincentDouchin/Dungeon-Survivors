import { Color } from "three"

export type backgroundName = 'FOREST' | 'DUNGEON' | 'CAMP'

export interface Background {
	// tiles: [Tile, number][]
	// detailHook?: (buffer: CanvasRenderingContext2D) => (x: number, y: number) => void
	// childrenHook?: (background: Entity) => void
	level: string
	lightColor?: Color
}
const BACKGROUNDS: Record<backgroundName, Background> = {
	DUNGEON: {
		level: 'DUNGEON',
		lightColor: new Color('hsl(0,0%,4%)')

		// tiles: [
		// 	[assets.tiles.floor_1, 10],
		// 	[assets.tiles.floor_2, 1],
		// 	[assets.tiles.floor_3, 1],
		// 	[assets.tiles.floor_4, 1],
		// 	[assets.tiles.floor_5, 1],
		// 	[assets.tiles.floor_6, 1],
		// 	[assets.tiles.floor_7, 1],
		// 	[assets.tiles.floor_8, 1],
		// ],
		// childrenHook: background => {
		// 	const width = window.innerWidth
		// 	const height = window.innerHeight
		// 	for (let x = 0; x < width; x += 256) {
		// 		for (let y = 0; y < height; y += 256) {
		// 			background.addChildren(ColumnEntity(x - width / 2, y - height / 2))
		// 		}
		// 	}
		// },
	},
	FOREST: {
		level: 'FOREST',
		lightColor: new Color('hsl(0,0%,100%)')
		// tiles: [
		// 	[assets.tiles.grass_1, 10],
		// 	[assets.tiles.grass_2, 1],
		// 	[assets.tiles.grass_3, 1],
		// 	[assets.tiles.grass_4, 1],
		// 	[assets.tiles.grass_5, 1],
		// ],
		// detailHook: buffer => (x, y) => {
		// 	const details = [
		// 		assets.tiles.grass_detail_1,
		// 		assets.tiles.grass_detail_2,
		// 		assets.tiles.grass_detail_3,
		// 		assets.tiles.grass_detail_4,
		// 		assets.tiles.grass_detail_5,
		// 		assets.tiles.grass_detail_6,
		// 		assets.tiles.grass_detail_7,
		// 		assets.tiles.grass_detail_8,
		// 	]
		// 	if (Math.random() < 0.05) buffer.drawImage(details[Math.floor(details.length * Math.random())].buffer.canvas, x, y)

		// },
	},
	CAMP: {
		level: 'CAMP',
		lightColor: new Color('hsl(0,0%,100%)')
	}

}
export default BACKGROUNDS