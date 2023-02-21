import { AXISX, AXISY } from "../Constants/InputsNames"

import { Entity } from "../Globals/ECS"
import SpriteComponent from "../Components/SpriteComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import { inputManager } from "../Globals/Initialize"

const DpadInputEntity = () => {
	const dpad = new Entity('dpad')
	const dpadMesh = dpad.addComponent(new SpriteComponent(assets.UI.touchdpad, { scale: 2 }))
	dpad.addComponent(new UIPositionComponent({ x: -0.95, y: -0.95 }, { x: -1, y: -1 }))
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
			if (touchCoord.identifier !== null) {
				touch = touchCoord.identifier
			}
		}
	})


	const moveSubscriber = inputManager.eventBus.subscribe('move', (touchCoord: TouchCoord) => {
		if (enabled && mouse.x && mouse.y && touch === touchCoord.identifier) {
			const centerX = (touchCoord.clientX - dpadMesh.mesh.position.x) / (dpadMesh.width / 2)
			const centerY = (touchCoord.clientY - dpadMesh.mesh.position.y) / (dpadMesh.height / 2)
			const angle = Math.atan2(centerY, centerX)
			const maxX = Math.abs(Math.cos(angle))
			const maxY = Math.abs(Math.sin(angle))
			const positionX = Math.max(-maxX, Math.min(maxX, centerX))
			const positionY = Math.max(-maxY, Math.min(maxY, centerY))
			centerPosition.relativePosition.x = positionX
			centerPosition.relativePosition.y = positionY
			inputManager.eventBus.publish(AXISX, positionX)
			inputManager.eventBus.publish(AXISY, positionY)
		}
	})
	const upSubscriber = inputManager.eventBus.subscribe('up', (touchCoord: TouchCoord) => {
		if (touch === touchCoord.identifier) {
			enabled = false
			centerPosition.relativePosition.x = 0
			centerPosition.relativePosition.y = 0
			inputManager.eventBus.publish(AXISX, 0)
			inputManager.eventBus.publish(AXISY, 0)
		}
	})
	dpad.onDestroy(() => {
		inputManager.eventBus.unsubscribe('up', upSubscriber)
		inputManager.eventBus.unsubscribe('move', moveSubscriber)
		inputManager.eventBus.unsubscribe('down', downSubscriber)
	})
	return dpad
}

export default DpadInputEntity