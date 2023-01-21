import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import { ECS, Entity } from "../Globals/ECS"
import { assets } from "../Globals/Initialize"

const LevelDisplayEntity = () => {
	const level = new Entity()
	level.addComponent(new UIPosition({ x: -1, y: 1 }, { x: -1, y: 1 }))
	level.addComponent(new SpriteComponent(assets.UI.box, { scale: 1.5 }))
	const text = level.addComponent(new TextComponent(String(0), { size: 32 }))
	ECS.eventBus.subscribe(ECSEVENTS.LEVELUP, (level: number) => {
		text.setText(String(level))
	})
	return level
}
export default LevelDisplayEntity