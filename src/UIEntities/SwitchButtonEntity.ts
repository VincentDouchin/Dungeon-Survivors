import { ECS, Entity } from '../Globals/ECS'

import Coroutine from '../Globals/Coroutine'
import INPUTS from '../Constants/InputsNames'
import SpriteComponent from '../Components/SpriteComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'
import waitFor from '../Utils/WaitFor'
import { UIEVENTS } from '../Constants/Events'

const SwitchButtonEntity = () => {
	const button = new Entity('switch Button')
	const sprite = button.addComponent(new SpriteComponent(assets.UI.button, { scale: 4 }))
	button.addComponent(new UIPositionComponent({ x: -1, y: 0 }, { x: 1, y: 0 }))
	const icon = new Entity('switch button icon')
	icon.addComponent(new SpriteComponent(assets.icons.switch, { scale: 2.5 }))
	const iconPosition = icon.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: -1 / 8 }))
	button.addChildren(icon)
	const downSubscriber = ECS.eventBus.subscribe('up', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id)) {
			new Coroutine(function* () {
				if (!sprite.renderShader) return
				sprite.renderShader.uniforms.uTexture.value = assets.UI.buttonpressed.texture
				sprite.render()
				iconPosition.center.y = 0
				yield * waitFor(10)
				iconPosition.center.y = -1 / 8

				sprite.renderShader.uniforms.uTexture.value = assets.UI.button.texture
				sprite.render()
				ECS.eventBus.publish(UIEVENTS.TOUCH, { input: INPUTS.SWITCH, amount: 1, entity: button })
			})
		}
	})
	button.onDestroy(() => {
		downSubscriber()
	})

	return button
}
export default SwitchButtonEntity
