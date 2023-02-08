import { assets, inputManager } from "../Globals/Initialize"

import { Entity } from "../Globals/ECS"
import { PAUSE } from "../Constants/InputsNames"
import SpriteComponent from "../Components/SpriteComponent"
import UIPositionComponent from "../Components/UIPositionComponent"

const PauseButtonEntity = () => {
	const pause = new Entity('pause Button')
	const sprite = pause.addComponent(new SpriteComponent(assets.UI.button, { scale: 2 }),)
	pause.addComponent(new UIPositionComponent({ x: 1, y: 1 }, { x: 1, y: 1 }))
	const icon = new Entity('pause Icon')
	icon.addComponent(new SpriteComponent(assets.UI.pauseicon, { scale: 1.5 }))
	icon.addComponent(new UIPositionComponent())
	pause.addChildren(icon)
	inputManager.eventBus.subscribe('down', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id)) {
			inputManager.eventBus.publish(PAUSE, true)
		}
	})
	inputManager.eventBus.subscribe(PAUSE, (state: boolean) => {
		if (state) {
			sprite.uniforms.uTexture = assets.UI.buttonpressed.textures[0]
		} else {
			sprite.uniforms.uTexture = assets.UI.button.textures[0]
		}
	})
	return pause
}
export default PauseButtonEntity