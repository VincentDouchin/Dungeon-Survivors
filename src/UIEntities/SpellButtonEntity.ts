import Coroutines from "../Globals/Coroutines"
import { Entity } from "../Globals/ECS"
import { SKILL } from "../Constants/InputsNames"
import SpriteComponent from "../Components/SpriteComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import { inputManager } from "../Globals/Initialize"
import waitFor from "../Utils/WaitFor"

const SpellButtonEntity = () => {
	const button = new Entity('active skill button')
	const sprite = button.addComponent(new SpriteComponent(assets.UI.button, { scale: 4 }))
	button.addComponent(new UIPositionComponent({ x: (window.innerWidth - 150) / window.innerWidth, y: (-window.innerHeight + 150) / window.innerHeight }))
	const icon = new Entity('active skill icon')
	icon.addComponent(new SpriteComponent(assets.icons.attack, { scale: 2.5 }))

	const iconPosition = icon.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: -1 / 8 }))
	button.addChildren(icon)
	const downSubscriber = inputManager.eventBus.subscribe('up', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id)) {
			Coroutines.add(function* () {
				sprite.renderShader!.uniforms.uTexture.value = assets.UI.buttonpressed.texture
				sprite.render()
				iconPosition.center.y = 0
				yield* waitFor(10)
				iconPosition.center.y = -1 / 8

				sprite.renderShader!.uniforms.uTexture.value = assets.UI.button.texture
				sprite.render()
				inputManager.eventBus.publish(SKILL, 1)
			})
		}

	})
	button.onDestroy(() => {
		inputManager.eventBus.unsubscribe('down', downSubscriber)
	})
	return button
}

export default SpellButtonEntity