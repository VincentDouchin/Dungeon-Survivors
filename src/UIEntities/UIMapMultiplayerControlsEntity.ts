import { Entity } from '../Globals/ECS'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'
import { inputManager } from '../Globals/Initialize'
import ButtonEntity from './ButtonEntity'

const UIMapMultiplayerControlsEntity = () => new Promise<void>((resolve) => {
	const controls = new Entity('multiplayer controls')

	const selectedMethods: string[] = []
	const buttons: Entity[] = []
	for (let i = 1; i <= 2; i++) {
		let lastController = -1
		const button = ButtonEntity(100, 10, 2, 'Choose controls', 2, () => {
			const possibleControllers = [...inputManager.controllers].filter(controller => !selectedMethods.includes(controller.name))
			if (possibleControllers.length === 0) return
			lastController = (lastController + 1) % possibleControllers.length
			State.multiplayerControls[i - 1] = possibleControllers[lastController]
			button.children.forEach((child) => {
				const text = child.getComponent(TextComponent)
				if (text && !text?.text.includes('Player')) {
					const key = possibleControllers[lastController].name
					possibleControllers[lastController]?.identify && possibleControllers[lastController]?.identify()
					text.setText(key)
					selectedMethods[i] = key
				}
			})
		})
		buttons.push(button)
		const buttonText = new Entity('button text')
		buttonText.addComponent(new SpriteComponent(Tile.empty(32, 32)))
		buttonText.addComponent(new TextComponent(`Player ${i}`, { size: 32, outlineWidth: 0.5 }))
		buttonText.addComponent(new UIPositionComponent().top())
		button.addChildren(buttonText)
		button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: i === 1 ? 1 : -1, y: -1 }))
		controls.addChildren(button)
		if (i === 2) {
			const okButton = ButtonEntity(10, 10, 2, 'OK', 2, () => {
				if (State.multiplayerControls.includes(null)) return
				State.multiplayerControls.forEach((controller, index) => {
					if (controller) {
						inputManager.registerController(controller, index)
					}
				})
				controls.destroy()
				resolve()
			})
			buttons.push(okButton)
			okButton.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
			button.addChildren(okButton)
		}
	}
	SelectableComponent.setFromArray(buttons)
})
export default UIMapMultiplayerControlsEntity
