import { EntityInstance, LDTKMapDefinition, Level } from './../../ldtk'

import AssetLoader from "./AssetLoader"
import { BACKGROUND } from '../Constants/BackGrounds'
import Tile from "./Tile"
import { node } from '../Components/PathNodeComponent'

interface LDTKMap extends LDTKMapDefinition {

}
interface entityInstanceFormatted {
	id: string
	x: number
	y: number
	width: number
	height: number
}
export type ldtkNode = entityInstanceFormatted & node
class LDTKMap implements LDTKMapDefinition {
	tile: Tile
	static tiles: Record<string, Tile> = {}
	static data: Record<BACKGROUND, any> = {}
	constructor(data: LDTKMap, tile: Tile) {
		Object.assign(this, data)
		this.tile = tile
	}

	static async load(glob: Record<string, { default: string } | any>) {
		Object.entries(glob)
		const maps: Record<BACKGROUND, LDTKMap> = {}
		debugger

		for (const [path, data] of Object.entries(glob)) {
			const pathSplit = path.split(/[\/.]/)
			if (pathSplit.at(-1) === 'json') {
				const name = pathSplit.at(-2) as BACKGROUND
				const tilePath = Object.entries(glob).find(([path, _]) => {
					return path.includes(name) && path.split('.').at(-1) === 'png'
				})?.[1].default
				const tile = tilePath ? Tile.fromImage(await AssetLoader.loadImage(tilePath)) : Tile.empty(1024, 1024)
				maps[name] = new LDTKMap(data, tile)
			}

		}
		return maps

	}
	static getPropertiesOfEntity(level: Level,) {
		return (entityInstance: EntityInstance) => {
			return entityInstance.fieldInstances.reduce<entityInstanceFormatted>((props, fieldInstance) => {
				const getValue = () => {
					switch (fieldInstance.__type) {
						case 'EntityRef': return fieldInstance.__value?.entityIid
						default: return fieldInstance.__value
					}
				}
				return { ...props, [fieldInstance.__identifier]: getValue() }
			}, {
				x: entityInstance.px[0] - level.pxWid / 2,
				y: -entityInstance.px[1] + level.pxHei / 2,
				width: entityInstance.width,
				height: entityInstance.height,
				id: entityInstance.iid
			})
		}
	}

}

export default LDTKMap