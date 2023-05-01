import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import { Entity } from '../Globals/ECS'
import Tile from '../Utils/Tile'
import ButtonEntity from './ButtonEntity'

const UIMapRestoreEntity = () => new Promise<boolean>((resolve) => {
	const restoreProgressSelect = new Entity('multiplayer select')
	const restoreText = new Entity('restore text')
	restoreProgressSelect.addChildren(restoreText)
	restoreText.addComponent(new SpriteComponent(Tile.empty(1, 150)))
	restoreText.addComponent(new TextComponent('Continue your last game?', { size: 32, outlineWidth: 2 }))
	restoreText.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: -1 }))
	const restoreButtons = [true, false].map((restore) => {
		const button = ButtonEntity(60, 10, 2, restore ? 'Continue' : 'Restart', 2, () => {
			resolve(restore)
			restoreProgressSelect.destroy()
		})
		restoreProgressSelect.addChildren(button)
		button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: restore ? 1 : -1, y: -1.5 }))
		return button
	})
	SelectableComponent.setFromArray(restoreButtons)
})
export default UIMapRestoreEntity
