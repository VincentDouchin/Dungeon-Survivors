import { ECS, Entity } from '../Globals/ECS'

import INPUTS from '../Constants/InputsNames'
import SpriteComponent from '../Components/SpriteComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'
import { UIEVENTS } from '../Constants/Events'

const DpadInputEntity = () => {
	const dpad = new Entity('dpad')
	const dpadMesh = dpad.addComponent(new SpriteComponent(assets.UI.touchdpad, { scale: 2 }))
	const position = dpad.addComponent(new UIPositionComponent({ x: -0.9, y: -2 }, { x: -1, y: 0.5 }))
	position.moveTo(0, 20)
	const center = new Entity('dpadCenter')
	center.addComponent(new SpriteComponent(assets.UI.touchdpadcenter, { scale: 2 }))
	const centerPosition = center.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: 0 }))
	dpad.addChildren(center)
	let enabled = false
	let touch: null | number = null
	const mouse: { x: null | number; y: null | number } = { x: null, y: null }
	const downSubscriber = ECS.eventBus.subscribe('down', (touchCoord: TouchCoord) => {
		if (touchCoord.uiObjects.includes(dpadMesh.mesh.id)) {
			enabled = true
			mouse.x = touchCoord.x
			mouse.y = touchCoord.y
			touch = touchCoord.identifier
		}
	})

	const moveSubscriber = ECS.eventBus.subscribe('move', (touchCoord: TouchCoord) => {
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
			ECS.eventBus.publish(UIEVENTS.TOUCH, { input: positionX > 0 ? INPUTS.MOVERIGHT : INPUTS.MOVELEFT, amount: Math.abs(positionX), entity: dpad })
			ECS.eventBus.publish(UIEVENTS.TOUCH, { input: positionY > 0 ? INPUTS.MOVEUP : INPUTS.MOVEDOWN, amount: Math.abs(positionY), entity: dpad })
		}
	})
	const resetInputs = (touchCoord?: TouchCoord) => {
		if (!touchCoord || touch === touchCoord.identifier) {
			enabled = false
			centerPosition.relativePosition.x = 0
			centerPosition.relativePosition.y = 0
			for (const inputName of [INPUTS.MOVEDOWN, INPUTS.MOVELEFT, INPUTS.MOVERIGHT, INPUTS.MOVEUP]) {
				ECS.eventBus.publish(UIEVENTS.TOUCH, { input: inputName, amount: 0, entity: dpad })
			}
		}
	}
	const upSubscriber = ECS.eventBus.subscribe('up', resetInputs)
	dpad.onDestroy(() => {
		resetInputs()
		upSubscriber()
		moveSubscriber()
		downSubscriber()
	})
	return dpad
}

export default DpadInputEntity
