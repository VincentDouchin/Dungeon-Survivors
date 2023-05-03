import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import { Entity } from '../Globals/ECS'
import Tile from '../Utils/Tile'
import ButtonEntity from './ButtonEntity'

const UIMapMultiplayerEntity = () => new Promise<boolean>((resolve) => {
	const multiplayerSelect = new Entity('multiplayer select')
	multiplayerSelect.addComponent(new SpriteComponent(Tile.empty()))
	const position = multiplayerSelect.addComponent(new UIPositionComponent({ x: 0, y: -2 }, { x: 0, y: -1 }))
	position.moveTo(-1, 30)
	const multiplayerButtons = [false, true].map((multiplayer) => {
		const button = ButtonEntity(60, 10, 2, multiplayer ? 'Multiplayer' : 'Singleplayer', 2, () => {
			position.moveTo(-2, 30).then(() => {
				resolve(multiplayer)
				multiplayerSelect.destroy()
			})
		})
		multiplayerSelect.addChildren(button)
		button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: multiplayer ? -1 : 1, y: -1.5 }))
		return button
	})
	SelectableComponent.setFromArray(multiplayerButtons)
})
export default UIMapMultiplayerEntity
