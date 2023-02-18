import Coroutines from "../../Globals/Coroutines"
import { Entity } from "../../Globals/ECS"
import EventBus from "../../Utils/EventBus"
import { SWITCH } from "../../Constants/InputsNames"
import SpriteComponent from "../../Components/SpriteComponent"
import UIPositionComponent from "../../Components/UIPositionComponent"
import assets from "../../Globals/Assets"
import waitFor from "../../Utils/WaitFor"

const SwitchButtonEntity = (eventBus: EventBus) => {
	const button = new Entity('switch Button')
	const sprite = button.addComponent(new SpriteComponent(assets.UI.button, { scale: 4 }))
	button.addComponent(new UIPositionComponent({ x: 0.7, y: -0.7 }))
	const icon = new Entity('switch button icon')
	icon.addComponent(new SpriteComponent(assets.UI.character, { scale: 4 }))
	const iconPosition = icon.addComponent(new UIPositionComponent())
	button.addChildren(icon)
	const downSubscriber = eventBus.subscribe('down', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id)) {
			Coroutines.add(function* () {
				sprite.renderShader!.uniforms.uTexture.value = assets.UI.buttonpressed.texture
				sprite.render()
				iconPosition.center.y = 1 / 3
				eventBus.publish(SWITCH, true)
				yield* waitFor(10)
				iconPosition.center.y = 0

				sprite.renderShader!.uniforms.uTexture.value = assets.UI.button.texture
				sprite.render()
			})
		}

	})
	button.onDestroy(() => {
		eventBus.unsubscribe('down', downSubscriber)
	})

	return button
}
export default SwitchButtonEntity