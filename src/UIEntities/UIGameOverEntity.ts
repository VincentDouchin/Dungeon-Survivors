import { ECS, Entity } from '../Globals/ECS'

import ButtonEntity from './ButtonEntity'
import { ECSEVENTS } from '../Constants/Events'
import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'

const UIGameOverEntity = () => {
	const ui = new Entity('game over ui')
	const lost = new Entity('lost')
	lost.addComponent(new UIPositionComponent())
	lost.addComponent(new SpriteComponent(Tile.empty(200, 100)))
	lost.addComponent(new TextComponent('Game Over', { size: 128, outlineWidth: 3 }))
	ui.addChildren(lost)
	const restartButton = ButtonEntity(30, 8, 3, 'Restart', 2, () => {
		window.location.reload()
	})
	ECS.eventBus.publish(ECSEVENTS.SELECTED, restartButton)
	restartButton.addComponent(new UIPositionComponent().bottom())
	lost.addChildren(restartButton)
	return ui
}
export default UIGameOverEntity