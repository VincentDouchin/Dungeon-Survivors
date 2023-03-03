import { Entity } from "../Globals/ECS"
import INPUTS from "../Constants/InputsNames"
import SpriteComponent from "../Components/SpriteComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import { inputManager } from "../Globals/Initialize"

const DpadInputEntity = () => {
	const dpad = new Entity('dpad')
	const dpadMesh = dpad.addComponent(new SpriteComponent(assets.UI.touchdpad, { scale: 2 }))
	dpad.addComponent(new UIPositionComponent({ x: -0.9, y: 0 }, { x: -1, y: 0.5 }))
	const center = new Entity('dpadCenter')
	center.addComponent(new SpriteComponent(assets.UI.touchdpadcenter, { scale: 2 }))
	const centerPosition = center.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: 0 }))
	dpad.addChildren(center)
	let enabled = false
	let touch: null | number = null
	let mouse: { x: null | number, y: null | number, } = { x: null, y: null }
	const downSubscriber = inputManager.eventBus.subscribe('down', (touchCoord: TouchCoord) => {
		if (touchCoord.uiObjects.includes(dpadMesh.mesh.id)) {
			enabled = true
			mouse.x = touchCoord.x
			mouse.y = touchCoord.y
			touch = touchCoord.identifier
		}
	})


	const moveSubscriber = inputManager.eventBus.subscribe('move', (touchCoord: TouchCoord) => {
		if (enabled && mouse.x && mouse.y && touch === touchCoord.identifier) {
			const centerX = (touchCoord.clientX - dpadMesh.mesh.position.x) / (dpadMesh.width)
			const centerY = (touchCoord.clientY - dpadMesh.mesh.position.y) / (dpadMesh.height)
			const angle = Math.atan2(centerY, centerX)
			const maxX = Math.abs(Math.cos(angle))
			const maxY = Math.abs(Math.sin(angle))
			const positionX = Math.max(-maxX, Math.min(maxX, centerX))
			const positionY = Math.max(-maxY, Math.min(maxY, centerY))
			centerPosition.relativePosition.x = positionX
			centerPosition.relativePosition.y = positionY
			inputManager.eventBus.publish(INPUTS.AXISX, positionX)
			inputManager.eventBus.publish(INPUTS.AXISY, positionY)
		}
	})
	const upSubscriber = inputManager.eventBus.subscribe('up', (touchCoord: TouchCoord) => {
		if (touch === touchCoord.identifier) {
			enabled = false
			centerPosition.relativePosition.x = 0
			centerPosition.relativePosition.y = 0
			inputManager.eventBus.publish(INPUTS.AXISX, 0)
			inputManager.eventBus.publish(INPUTS.AXISY, 0)
		}
	})
	dpad.onDestroy(() => {
		upSubscriber()
		moveSubscriber()
		downSubscriber()
	})
	return dpad
}

export default DpadInputEntity