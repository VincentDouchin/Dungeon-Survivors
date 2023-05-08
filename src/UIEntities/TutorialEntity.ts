import { Entity } from '../Globals/ECS'
import SpriteComponent from '../Components/SpriteComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'
import type { UI } from '../../assets/images/images'
import { inputManager } from '../Globals/Initialize'
import TextComponent from '../Components/TextComponent'
import assets from '../Globals/Assets'

const TutorialEntity = () => {
	const tutorial = new Entity('tutorial')
	const movementKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'].map(key => inputManager.layout.get(key))
	const controls: Record<string, UI[]> = {
		'Movement': [...movementKeys, 'l'],
		'Spell': ['space', 'action'],
		'Pause': ['escape', 'start'],
		'Switch characters': ['shift', 'lb', 'rb'],
	}
	Object.entries(controls).forEach(([controlName, images], index) => {
		const control = new Entity('control')
		control.addComponent(new SpriteComponent(Tile.empty()))
		control.addComponent(new TextComponent(controlName, { anchorX: 'right' }))
		control.addComponent(new UIPositionComponent({ x: [-0.75, -0.25, 0.25, 0.75][index], y: -1 }, { x: 0, y: -1 }))
		let lastEntity: null | Entity = control
		for (const image of images) {
			const imageEntity = new Entity('image control')
			imageEntity.addComponent(new SpriteComponent(assets.UI[image]))
			imageEntity.addComponent(new UIPositionComponent().right())
			lastEntity.addChildren(imageEntity)
			lastEntity = imageEntity
		}
		tutorial.addChildren(control)
	})
	// tutorial.addComponent(new TextComponent('WASD - Movement     Shift - Switch charcaters     Space - Spell     Escape - Pause'))
	return tutorial
}
export default TutorialEntity
