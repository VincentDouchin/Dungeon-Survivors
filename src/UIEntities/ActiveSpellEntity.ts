import { ECS, Entity } from "../Globals/ECS"

import ColorShader from "../Shaders/ColorShader"
import { ECSEVENTS } from "../Constants/Events"
import SpriteComponent from "../Components/SpriteComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"

const ActiveSpellEntity = () => {
	const level = new Entity('level display')
	const tile = assets.UI.box.framed(3, 10, 10)
	const position = level.addComponent(new UIPositionComponent({ x: 1, y: 2 }, { x: 1, y: 1 }))
	position.moveTo(1, 30)

	level.addComponent(new SpriteComponent(tile, { scale: 3, flipped: true }))
	const icon = new Entity('skill icon')
	icon.addComponent(new UIPositionComponent())
	const iconSprite = icon.addComponent(new SpriteComponent(Tile.empty(), { scale: 2.2 }))

	ECS.eventBus.subscribe(ECSEVENTS.SPELL_ICON, (tile: Tile) => {
		if (iconSprite.renderShader?.uniforms.uTexture) {
			iconSprite.changeTexture(tile.texture)
		}
	})
	let disabled = false
	ECS.eventBus.subscribe(ECSEVENTS.MANA_AMOUNT, mana => {
		if (mana < 20) {
			disabled = true
			iconSprite.addShader(new ColorShader(1, 1, 1, 0.5))
		} else if (disabled) {
			iconSprite.removeShader(ColorShader)
		}
	})
	level.addChildren(icon)
	return level
}
export default ActiveSpellEntity