import getBuffer from "./Buffer";
import loadImage from "./LoadImage";
import Tile from "./Tile";
const indexToCoord = (index: number, columns: number, width: number, height?: number) => {
	height = height ?? width
	return [index % columns * width, Math.floor(index / columns) * height]
}


const sources = import.meta.glob(['/assets/**/*.png', '/assets/**/*.json'], { eager: true })

class TiledMap {
	tile: Tile
	map: TiledMapData
	tilesets: TiledMapTileset[]
	objects: Map<string, any>
	constructor(tile: Tile, map: TiledMapData, tilesets: TiledMapTileset[], objects: Map<string, any>) {
		this.tile = tile
		this.map = map
		this.tilesets = tilesets
		this.objects = objects
	}
	static async load(source: string) {
		const tilesets: TiledMapTileset[] = []
		const folder = source.split('/').slice(0, -1).join('/') + '/'
		const map = await import(source) as TiledMapData
		if (map?.tilesets.length) {
			for (let tileset of map.tilesets) {
				const base = import.meta.env.BASE_URL
				const path = folder + tileset.source
				const loadedTileset = sources[path.replace(base, '/')] as TiledMapTileset

				const img = await loadImage(sources[loadedTileset.image.replace('../', folder).replace(base, '/')] as string)
				tilesets.push({ ...loadedTileset, firstgid: tileset.firstgid, img })
			}
		}
		const buffer = getBuffer(map.width * map.tilewidth, map.height * map.tileheight)
		const objects: Map<string, any> = new Map()
		map.layers.forEach(layer => {
			if (layer.data) {
				layer.data.forEach((tileIndex, i) => {
					if (tileIndex === 0) return
					const tileset = tilesets.find(tileset => tileset?.firstgid <= tileIndex && tileIndex <= tileset.firstgid + tileset.tilecount - 1)
					if (!tileset) return
					const [sx, sy] = indexToCoord(tileIndex - tileset.firstgid, tileset.columns, tileset.tilewidth, tileset.tileheight)
					const [dx, dy] = indexToCoord(i, map.width, map.tilewidth, map.tileheight)
					buffer.drawImage(tileset.img,
						sx, sy, map.tilewidth, map.tileheight,
						dx, dy, tileset.tilewidth, tileset.tileheight)
				})
			}
			if (layer.objects) {
				layer.objects.forEach(object => {
					if (!object.class) return
					if (!objects.has(object.class)) objects.set(object.class, [])
					objects.get(object.class).push(
						Object.entries(object).reduce((finalObject, [key, val]) => {
							if (key == 'properties') {
								return {
									...finalObject, ...val.reduce((props: any, prop: TiledProperty) => ({ ...props, [prop.name]: prop.value }), {})
								}
							}
							if (key == 'x') {
								return { ...finalObject, x: val - map.width * map.tilewidth / 2 + map.tilewidth / 2 }
							}
							if (key == 'y') {
								return { ...finalObject, y: -val + map.height * map.tileheight / 2 - map.tileheight / 2 }
							}
							return { ...finalObject, [key]: val }
						}, {})
					)
				})
			}
		})
		return new TiledMap(new Tile({ buffer }), map, tilesets, objects)
	}

}

export default TiledMap