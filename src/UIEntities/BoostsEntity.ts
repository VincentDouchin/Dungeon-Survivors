import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { SKILL_ICON } from "../Constants/ECSEvents"

import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import framedTile from "../Utils/FramedTile"

const BoostsEntity = () => {
	const boosts = new Entity('boosts')
	boosts.addComponent(new UIPositionComponent({ x: -1, y: -1 }, { x: -1, y: 1 }))
	boosts.addComponent(new SpriteComponent(framedTile(assets.UI.empty, 0, 1, 16)))
	let lastEntity = boosts
	const icons: Map<Tile, Entity> = new Map()
	const sub = ECS.eventBus.subscribe<SKILL_ICON>(ECSEVENTS.SKILL_ICON, skillIcon => {
		const existingIcon = icons.get(skillIcon)
		if (existingIcon) {
			const amount = existingIcon.getComponent(TextComponent)
			if (amount) {
				amount.setText(String(Number(amount.text) + 1))
			} else {
				existingIcon.addComponent(new TextComponent(String(2), { outlineWidth: 1, }))
			}
		} else {
			const icon = new Entity(`boost icon`)
			icon.addComponent(new SpriteComponent(skillIcon))
			icon.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
			icons.set(skillIcon, icon)
			lastEntity.addChildren(icon)
			lastEntity = icon
		}
	})
	boosts.onDestroy(() => {
		ECS.eventBus.unsubscribe<SKILL_ICON>(ECSEVENTS.SKILL_ICON, sub)
	})


	return boosts
}
export default BoostsEntity