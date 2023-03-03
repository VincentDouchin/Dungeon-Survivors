import { ECS, Entity } from "../Globals/ECS"

import ColorShader from "../Shaders/ColorShader"
import Coroutine from "../Globals/Coroutine";
import { ECSEVENTS } from "../Constants/Events"
import INPUTS from "../Constants/InputsNames"
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
	const iconSprite = icon.addComponent(new SpriteComponent(assets.icons.attack, { scale: 2.5 }))

	const iconPosition = icon.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: -1 / 8 }))
	button.addChildren(icon)
	let disabled = false
	const downSubscriber = inputManager.eventBus.subscribe('up', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id) && !disabled) {
			new Coroutine(function* () {
				sprite.changeTexture(assets.UI.buttonpressed.texture)
				sprite.render()
				iconPosition.center.y = 0
				yield* waitFor(10)
				iconPosition.center.y = -1 / 8

				sprite.changeTexture(assets.UI.button.texture)
				sprite.render()
				inputManager.eventBus.publish(INPUTS.SKILL, 1)
			})
		}
	})
	const disabledSubscriber = ECS.eventBus.subscribe(ECSEVENTS.MANA_AMOUNT, (mana) => {
		if (mana < 20) {
			disabled = true
			sprite.changeTexture(assets.UI.buttondisabled.texture)
			iconSprite.addShader(new ColorShader(1, 1, 1, 0.5))
		} else if (disabled) {
			sprite.changeTexture(assets.UI.button.texture)
			disabled = false
			iconSprite.removeShader(ColorShader)
		}
	})
	button.onDestroy(() => {
		downSubscriber()
		disabledSubscriber()
	})
	return button
}

export default SpellButtonEntity