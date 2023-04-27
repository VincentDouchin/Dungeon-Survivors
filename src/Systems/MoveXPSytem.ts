import BodyComponent from '../Components/BodyComponent'
import PositionComponent from '../Components/PositionComponent'
import XPComponent from '../Components/XPComponent'
import XPPickerComponent from '../Components/XPPickerComponent'
import type { Entity } from '../Globals/ECS'
import { ECS, System } from '../Globals/ECS'

class MoveXPSytem extends System {
	constructor() {
		super(XPComponent)
	}

	update(entities: Entity[]): void {
		const pickers = ECS.getEntitiesAndComponents(XPPickerComponent)
		entities.forEach((entity) => {
			pickers.forEach(([picker]) => {
				const position = entity.getComponent(PositionComponent)
				const pickerPosition = picker.getComponent(PositionComponent)
				const distance = position.position.distanceTo(pickerPosition.position)
				if (distance < 100) {
					const x = position.x - pickerPosition.x
					const y = position.y - pickerPosition.y
					const orientation = { x: x < 0 ? 1 : -1, y: y < 0 ? 1 : -1 }
					const body = entity.getComponent(BodyComponent)
					body.velocity.x = 1 / distance * orientation.x
					body.velocity.y = 1 / distance * orientation.y
				}
			})
		})
	}
}
export default MoveXPSytem
