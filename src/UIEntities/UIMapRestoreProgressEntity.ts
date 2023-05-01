import SelectableComponent from '../Components/SelectableComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import { Entity } from '../Globals/ECS'
import ButtonEntity from './ButtonEntity'

const UIMapRestoreEntity = () => new Promise<boolean>((resolve) => {
	const restoreProgressSelect = new Entity('multiplayer select')
	const restoreButtons = [true, false].map((restore) => {
		const button = ButtonEntity(100, 10, 2, restore ? 'Restore progress' : 'Restart', 2, () => {
			resolve(restore)
			restoreProgressSelect.destroy()
		})
		restoreProgressSelect.addChildren(button)
		button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: restore ? 1 : -1, y: -1 }))
		return button
	})
	SelectableComponent.setFromArray(restoreButtons)
})
export default UIMapRestoreEntity
