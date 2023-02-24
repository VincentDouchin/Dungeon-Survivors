import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { SPELL_ICON } from "../Constants/ECSEvents"

import SpriteComponent from "../Components/SpriteComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import framedTile from "../Utils/FramedTile"

const ActiveSpellEntity = () => {
	const level = new Entity('level display')
	const tile = framedTile(assets.UI.box, 3, 10, 10)
	level.addComponent(new UIPositionComponent({ x: 1, y: 1 }, { x: 1, y: 1 }))
	level.addComponent(new SpriteComponent(tile, { scale: 3, flipped: true }))
	const icon = new Entity('skill icon')
	icon.addComponent(new UIPositionComponent())
	const iconSprite = icon.addComponent(new SpriteComponent(assets.UI.empty, { scale: 2.2 }))

	ECS.eventBus.subscribe<SPELL_ICON>(ECSEVENTS.SPELL_ICON, (tile: Tile) => {
		if (iconSprite.renderShader?.uniforms.uTexture) {
			iconSprite.renderShader.uniforms.uTexture.value = tile.textures[0]
			iconSprite.render()
		}
	})
	level.addChildren(icon)
	return level
}
export default ActiveSpellEntity