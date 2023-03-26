import { ECS, Entity } from '../Globals/ECS'

import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import { UIEVENTS } from '../Constants/Events'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'

let levelNb = 0
const LevelDisplayEntity = () => {
	const level = new Entity('level display')
	const tile = assets.UI.box.framed(3, 10, 10)
	const position = level.addComponent(new UIPositionComponent({ x: -1, y: 2 }, { x: -1, y: 1 }))
	position.moveTo(1, 20)
	level.addComponent(new SpriteComponent(tile, { scale: 3 }))
	const text = level.addComponent(new TextComponent(String(levelNb), { size: 32 }))
	ECS.eventBus.subscribe(UIEVENTS.UI_LEVEL, (newLevel) => {
		levelNb = newLevel
		text.setText(String(levelNb))
	})
	return level
}
export default LevelDisplayEntity
