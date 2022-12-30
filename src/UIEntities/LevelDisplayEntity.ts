import MeshComponent from "../Components/MeshComponent"
import TextComponent from "../Components/TextComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import AssetManager from "../Globals/AssetManager"
import { ECS, Entity } from "../Globals/ECS"
import State from "../Globals/State"

const LevelDisplayEntity = () => {
	const level = new Entity()
	// debugger
	level.addComponent(new UIPosition({ x: -1, y: -1 }, { x: -1, y: -1 }))
	level.addComponent(new MeshComponent(AssetManager.UI.box, { scale: 1.5 }))
	const text = level.addComponent(new TextComponent(String(State.level), { size: 32 }))
	ECS.eventBus.subscribe(ECSEVENTS.XP, () => {
		text.setText(String(State.level))
	})
	return level
}
export default LevelDisplayEntity