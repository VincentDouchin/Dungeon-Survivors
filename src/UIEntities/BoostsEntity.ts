import { Entity } from '../Globals/ECS'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'

const BoostsEntity = () => {
	const boosts = new Entity('boosts')
	boosts.addComponent(new UIPositionComponent({ x: -1, y: -1 }, { x: -1, y: 1 }))
	boosts.addComponent(new SpriteComponent(Tile.empty(1, 16)))
	let lastEntity = boosts
	for (const skill of new Set(State.skills)) {
		const skillIcon = new Entity('skill icon')
		skillIcon.addComponent(new SpriteComponent(skill.icon))
		skillIcon.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
		const amount = State.skills.filter(s => s.name === skill.name).length
		if (amount > 1) {
			skillIcon.addComponent(new TextComponent(String(amount), { outlineWidth: 1, }))
		}
		lastEntity.addChildren(skillIcon)
		lastEntity = skillIcon
	}
	return boosts
}
export default BoostsEntity