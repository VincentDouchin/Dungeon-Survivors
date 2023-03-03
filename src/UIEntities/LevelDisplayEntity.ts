import { ECS, Entity } from "../Globals/ECS"

import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import { UIEVENTS } from "../Constants/Events"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"

const LevelDisplayEntity = () => {
	const level = new Entity('level display')
	const tile = assets.UI.box.framed(3, 10, 10)
	level.addComponent(new UIPositionComponent({ x: -1, y: 1 }, { x: -1, y: 1 }))
	level.addComponent(new SpriteComponent(tile, { scale: 3 }))
	const text = level.addComponent(new TextComponent(String(0), { size: 32 }))
	ECS.eventBus.subscribe(UIEVENTS.UI_LEVEL, (level) => {
		text.setText(String(level))
	})
	return level
}
export default LevelDisplayEntity