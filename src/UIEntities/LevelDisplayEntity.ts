import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { LEVEL_UP } from "../Constants/ECSEvents"

import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets";
import framedTile from "../Utils/FramedTile"

const LevelDisplayEntity = () => {
	const level = new Entity('level display')
	const tile = framedTile(assets.UI.box, 3, 10, 10)
	level.addComponent(new UIPositionComponent({ x: -1, y: 1 }, { x: -1, y: 1 }))
	level.addComponent(new SpriteComponent(tile, { scale: 3 }))
	const text = level.addComponent(new TextComponent(String(0), { size: 32 }))
	ECS.eventBus.subscribe<LEVEL_UP>(ECSEVENTS.LEVEL_UP, (level: number) => {
		text.setText(String(level))
	})
	return level
}
export default LevelDisplayEntity