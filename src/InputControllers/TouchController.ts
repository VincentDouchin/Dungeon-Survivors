
import MeshComponent from "../Components/MeshComponent"
import UIPosition from "../Components/UIPosition"
import { AXISX, AXISY } from "../Constants/InputsNames"
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
		this.dpad.addComponent(new UIPosition({ x: -0.95, y: -0.95 }, { x: -1, y: -1 }))
		const center = new Entity()
		center.addComponent(new MeshComponent(AssetManager.UI.touchdpadcenter, { scale: 2 }))
		const centerPosition = center.addComponent(new UIPosition({ x: 0, y: 0 }, { x: 0, y: 0 }))
		this.dpad.addChildren(center)
		let enabled = false
		let mouse: { x: null | number, y: null | number, } = { x: null, y: null }
		eventBus.subscribe('down', ({ x, y, uiObjects }: TouchCoord) => {
			if (uiObjects.includes(dpadMesh.mesh.id)) {
				enabled = true
				mouse.x = x
				mouse.y = y

			}
		})


		eventBus.subscribe('move', ({ clientX, clientY }: TouchCoord) => {
			if (enabled && mouse.x && mouse.y) {
				const centerX = (clientX - dpadMesh.mesh.position.x) / (dpadMesh.width / 2)
				const centerY = (clientY - dpadMesh.mesh.position.y) / (dpadMesh.height / 2)
				const angle = Math.atan2(centerY, centerX)
				const maxX = Math.abs(Math.cos(angle))
				const maxY = Math.abs(Math.sin(angle))
				const positionX = Math.max(-maxX, Math.min(maxX, centerX))
				const positionY = Math.max(-maxY, Math.min(maxY, centerY))
				centerPosition.relativePosition.x = positionX
				centerPosition.relativePosition.y = positionY
				eventBus.publish(AXISX, positionX)
				eventBus.publish(AXISY, positionY)
			}
		})
		eventBus.subscribe('up', () => {
			enabled = false
			centerPosition.relativePosition.x = 0
			centerPosition.relativePosition.y = 0
			eventBus.publish(AXISX, 0)
			eventBus.publish(AXISY, 0)

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