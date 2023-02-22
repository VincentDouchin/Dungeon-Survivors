import Coroutines from "../Globals/Coroutines"
import { Entity } from "../Globals/ECS"
import { PAUSE } from "../Constants/InputsNames"
import SpriteComponent from "../Components/SpriteComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import { inputManager } from "../Globals/Initialize"
import waitFor from "../Utils/WaitFor"

const PauseButtonEntity = () => {
	const pause = new Entity('pause Button')
	const sprite = pause.addComponent(new SpriteComponent(assets.UI.button, { scale: 2 }),)
	pause.addComponent(new UIPositionComponent({ x: 1, y: 1 }, { x: 1, y: 1 }))
	const icon = new Entity('pause Icon')
	icon.addComponent(new SpriteComponent(assets.UI.pauseicon, { scale: 1.5 }))
	const iconPosition = icon.addComponent(new UIPositionComponent())
	pause.addChildren(icon)

	let down = false
	const downSubscriber = inputManager.eventBus.subscribe('down', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id) && !down) {
			Coroutines.add(function* () {
				down = true
				sprite.renderShader!.uniforms.uTexture.value = assets.UI.buttonpressed.texture
				sprite.render()
				iconPosition.center.y = 1 / 8
				yield* waitFor(10)
				iconPosition.center.y = 0
				sprite.renderShader!.uniforms.uTexture.value = assets.UI.button.texture
				sprite.render()
				inputManager.eventBus.publish(PAUSE, true)
				down = false

			})
		}
	})

	pause.onDestroy(() => {
		inputManager.eventBus.unsubscribe('down', downSubscriber)
	})
	return pause
}
export default PauseButtonEntity