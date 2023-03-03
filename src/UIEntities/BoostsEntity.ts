import { ECS, Entity } from "../Globals/ECS"

import { ECSEVENTS } from "../Constants/Events"
import { Skill } from "../Constants/Skills"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"

const skills: Skill[] = []
ECS.eventBus.subscribe(ECSEVENTS.NEW_SKILL, skill => {
	skills.push(skill)
	console.log(skills, skill)
})
const BoostsEntity = () => {
	const boosts = new Entity('boosts')
	boosts.addComponent(new UIPositionComponent({ x: -1, y: -1 }, { x: -1, y: 1 }))
	boosts.addComponent(new SpriteComponent(Tile.empty(1, 16)))
	let lastEntity = boosts
	for (let skill of new Set(skills)) {
		const skillIcon = new Entity('skill icon')
		skillIcon.addComponent(new SpriteComponent(skill.icon))
		skillIcon.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
		const amount = skills.filter(s => s.name === skill.name).length
		if (amount > 1) {
			skillIcon.addComponent(new TextComponent(String(amount), { outlineWidth: 1, }))
		}
		lastEntity.addChildren(skillIcon)
		lastEntity = skillIcon
	}
	return boosts
}
export default BoostsEntity