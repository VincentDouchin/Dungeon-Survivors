import SelectableComponent from '../Components/SelectableComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import { Entity } from '../Globals/ECS'
import ButtonEntity from './ButtonEntity'

const UIMapMultiplayerEntity = () => new Promise<boolean>((resolve) => {
	const multiplayerSelect = new Entity('multiplayer select')
	const multiplayerButtons = [false, true].map((multiplayer) => {
		const button = ButtonEntity(60, 10, 2, multiplayer ? 'Multiplayer' : 'Singleplayer', 2, () => {
			resolve(multiplayer)
			multiplayerSelect.destroy()
		})
		multiplayerSelect.addChildren(button)
		button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: multiplayer ? -1 : 1, y: -1 }))
		return button
	})
	SelectableComponent.setFromArray(multiplayerButtons)
})
export default UIMapMultiplayerEntity
