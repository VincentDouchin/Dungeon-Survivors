import { ECS, Entity } from '../Globals/ECS'

import ColorShader from '../Shaders/ColorShader'
import Coroutine from '../Globals/Coroutine'
import { ECSEVENTS, UIEVENTS } from '../Constants/Events'
import INPUTS from '../Constants/InputsNames'
import SpriteComponent from '../Components/SpriteComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'
import waitFor from '../Utils/WaitFor'

const SpellButtonEntity = () => {
	const button = new Entity('active skill button')
	const sprite = button.addComponent(new SpriteComponent(assets.UI.button, { scale: 4 }))
	const position = button.addComponent(new UIPositionComponent({ x: (window.innerWidth - 150) / window.innerWidth, y: -2 }))
	position.moveTo((-window.innerHeight + 150) / window.innerHeight, 20)
	const icon = new Entity('active skill icon')
	const iconSprite = icon.addComponent(new SpriteComponent(assets.icons.attack, { scale: 2.5 }))

	const iconPosition = icon.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: -1 / 8 }))
	button.addChildren(icon)
	let disabled = false
	const downSubscriber = ECS.eventBus.subscribe('up', ({ uiObjects }) => {
		if (uiObjects.includes(sprite.mesh.id) && !disabled) {
			new Coroutine(function* () {
				sprite.changeTexture(assets.UI.buttonpressed.texture)
				sprite.render()
				iconPosition.center.y = 0
				yield * waitFor(10)
				iconPosition.center.y = -1 / 8

				sprite.changeTexture(assets.UI.button.texture)
				sprite.render()
				ECS.eventBus.publish(UIEVENTS.TOUCH, { input: INPUTS.SKILL, amount: 1, entity: button })
			})
		}
	})
	const disabledSubscriber = ECS.eventBus.subscribe(ECSEVENTS.MANA_AMOUNT, (mana) => {
		if (mana < 20) {
			disabled = true
			sprite.changeTexture(assets.UI.buttondisabled.texture)
			iconSprite.addShader(new ColorShader(1, 1, 1, 0.5))
		}
		else if (disabled) {
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
