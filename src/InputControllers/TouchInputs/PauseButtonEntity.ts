import Coroutines from "../../Globals/Coroutines"
import { Entity } from "../../Globals/ECS"
import EventBus from "../../Utils/EventBus"
import { PAUSE } from "../../Constants/InputsNames"
import SpriteComponent from "../../Components/SpriteComponent"
import UIPositionComponent from "../../Components/UIPositionComponent"
import assets from "../../Globals/Assets"
import waitFor from "../../Utils/WaitFor"

const PauseButtonEntity = (eventBus: EventBus) => {
	const pause = new Entity('pause Button')
	const sprite = pause.addComponent(new SpriteComponent(assets.UI.button, { scale: 2 }),)
	pause.addComponent(new UIPositionComponent({ x: 1, y: 1 }, { x: 1, y: 1 }))
	const icon = new Entity('pause Icon')
	icon.addComponent(new SpriteComponent(assets.UI.pauseicon, { scale: 1.5 }))
	const iconPosition = icon.addComponent(new UIPositionComponent())
	pause.addChildren(icon)
	const downSubscriber = eventBus.subscribe('down', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id)) {
			Coroutines.add(function* () {
				sprite.renderShader!.uniforms.uTexture.value = assets.UI.buttonpressed.texture
				sprite.render()
				iconPosition.center.y = 1 / 8
				yield* waitFor(10)
				iconPosition.center.y = 0
				sprite.renderShader!.uniforms.uTexture.value = assets.UI.button.texture
				sprite.render()
				eventBus.publish(PAUSE, true)

			})
		}
	})

	pause.onDestroy(() => {
		eventBus.unsubscribe('down', downSubscriber)
	})
	return pause
}
export default PauseButtonEntity