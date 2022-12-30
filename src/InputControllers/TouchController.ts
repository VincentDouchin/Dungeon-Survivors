
import MeshComponent from "../Components/MeshComponent"
import UIPosition from "../Components/UIPosition"
import { MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"
import EventBus from "../Utils/EventBus"
interface TouchInput {

	destroy: () => void
}

class dpadTouchInput implements TouchInput {
	dpad: Entity
	constructor(eventBus: EventBus) {
		this.dpad = new Entity()
		const dpadMesh = this.dpad.addComponent(new MeshComponent(AssetManager.UI.touchdpad, { scale: 2 }))
		this.dpad.addComponent(new UIPosition({ x: -0.95, y: 0.95 }, { x: -1, y: 1 }))
		const center = new Entity()
		center.addComponent(new MeshComponent(AssetManager.UI.touchdpadcenter, { scale: 2 }))
		const centerPosition = center.addComponent(new UIPosition())
		this.dpad.addChildren(center)
		let enbled = false
		let mouse: { x: null | number, y: null | number } = { x: null, y: null }
		eventBus.subscribe('down', ({ x, y, intersects }: { x: number, y: number, intersects: number[] }) => {
			if (intersects.includes(dpadMesh.mesh.id)) {
				enbled = true
				mouse.x = x
				mouse.y = y

			}
		})
		// window.addEventListener('touchstart', () => console.log('start'))
		// window.addEventListener('touchend', () => console.log('end'))
		// window.addEventListener('touchmove', () => console.log('move'))

		eventBus.subscribe('move', ({ x, y }: { x: number, y: number, intersects: number[] }) => {
			if (enbled && mouse.x && mouse.y) {
				centerPosition.relativePosition.x = (- mouse.x + x)
				centerPosition.relativePosition.y = (-mouse.y + y)
				const delta = 0.1
				eventBus.publish(MOVERIGHT, mouse.x < x - delta)
				eventBus.publish(MOVELEFT, mouse.x > x + delta)
				eventBus.publish(MOVEUP, mouse.y < y - delta)
				eventBus.publish(MOVEDOWN, mouse.y > y + delta)
			} else {
				eventBus.publish(MOVERIGHT, false)
				eventBus.publish(MOVELEFT, false)
				eventBus.publish(MOVEUP, false)
				eventBus.publish(MOVEDOWN, false)
			}
		})
		eventBus.subscribe('up', () => {
			enbled = false
			centerPosition.relativePosition.x = 0
			centerPosition.relativePosition.y = 0
			eventBus.publish(MOVERIGHT, false)
			eventBus.publish(MOVELEFT, false)
			eventBus.publish(MOVEUP, false)
			eventBus.publish(MOVEDOWN, false)
		})


	}
	destroy() {
		this.dpad.destroy()
	}
}

class TouchController implements InputController {
	eventBus: EventBus
	inputs: Record<string, Constructor<TouchInput>> = {
		dpad: dpadTouchInput
	}
	enabledInputs: Map<string, TouchInput> = new Map()
	constructor(eventBus: EventBus) {
		this.eventBus = eventBus
		this.eventBus.subscribe('enable', (input: string) => {
			this.enabledInputs.set(input, new this.inputs[input](eventBus))
		})
		this.eventBus.subscribe('disable', (input: string) => {
			this.enabledInputs.get(input)?.destroy()
			this.enabledInputs.delete(input)
		})

	}

}
export default TouchController