import { EntityInstance, LDTKMapDefinition, Level } from './../../ldtk'

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
	constructor(data: any, tile: Tile) {
		Object.assign(this, data)
		this.tile = tile
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