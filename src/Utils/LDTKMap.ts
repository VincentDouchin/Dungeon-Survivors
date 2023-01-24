import { EntityInstance, LDTKMapDefinition, Level } from './../../ldtk'

import AssetLoader from "../Globals/AssetLoader"
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
	static tiles: Record<string, Tile> = {}
	constructor(data: LDTKMap) {
		Object.assign(this, data)

	}
	static sources: Record<string, { default: string }> = import.meta.glob('/assets/**/_composite.png', { eager: true })
	static async load(path: string) {
		const data = await import(path)
		for (let level of data.levels) {
			const source = Object.entries(LDTKMap.sources).reduce<string>((acc, [path, source]) => {
				if (path.split('/').at(-2) == level.identifier) return source.default
				return acc
			}, '')
			this.tiles[level.identifier] = Tile.fromImage(await AssetLoader.loadImage(source))
		}
		return new LDTKMap(data)
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
				x: entityInstance.px[0] - level.pxWid / 2 + entityInstance.height / 2,
				y: -entityInstance.px[1] + level.pxHei / 2 - entityInstance.width / 2,
				width: entityInstance.width,
				height: entityInstance.height,
				id: entityInstance.iid
			})
		}
	}

}

export default LDTKMap