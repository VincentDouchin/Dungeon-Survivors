import { ECS, Entity } from '../Globals/ECS'
import { clock, engine } from '../Globals/Initialize'

import Coroutine from '../Globals/Coroutine'
import { ECSEVENTS } from '../Constants/Events'
import RunState from '../GameStates/RunState'
import SKILLS from '../Constants/Skills'
import SelectableComponent from '../Components/SelectableComponent'
import ShimmerShader from '../Shaders/ShimmerShader'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'

const SkillMenuEntity = () => {
	const skillMenu = new Entity('skillmenu')
	const container = new Entity('container')
	container.addComponent(new SpriteComponent(Tile.empty(48, 24), { scale: 4 }))
	container.addComponent(new UIPositionComponent())
	skillMenu.addChildren(container)
	skillMenu.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 48, 16), { scale: 4 }))
	const skillMenuPosition = skillMenu.addComponent(new UIPositionComponent({ x: 0, y: 2 }))

	skillMenuPosition.moveTo(0, 30)
	const possibleSkills = [...SKILLS].filter(skill => skill.show)
	const selectors: Entity[] = []
	for (let i = 0; i < 3; i++) {
		const button = new Entity('button')
		const buttonTile = assets.UI.frame2.framed(4, 24, 24)
		button.addComponent(new SpriteComponent(buttonTile, { scale: 2 }))
		const selectableEntity = new Entity('selectableEntity')
		const emptyTile32 = Tile.empty(32, 32)
		selectableEntity.addComponent(new SpriteComponent(emptyTile32, { scale: 2 }))
		const [skill] = possibleSkills.splice(Math.floor(Math.random() * possibleSkills.length), 1)
		selectableEntity.addComponent(new SelectableComponent(assets.UI.selectedframe, emptyTile32, () => {
			ECS.eventBus.publish(ECSEVENTS.NEW_SKILL, skill)
			State.skills.push(skill)
			skillMenuPosition.moveTo(-2, 30).then(() => engine.setState(RunState))
		}))
		selectors.push(selectableEntity)

		selectableEntity.addComponent(new UIPositionComponent())
		button.addChildren(selectableEntity)
		button.addComponent(new UIPositionComponent({ x: [-0.8, 0, 0.8][i], y: 1 }, { x: 0, y: 1 }))
		const icon = new Entity('icon')

		const sprite = icon.addComponent(new SpriteComponent(skill.icon, { scale: 3, shaders: [new ShimmerShader()] }))
		const shimmerCoroutine = new Coroutine(function* () {
			yield
			sprite.getUniforms(ShimmerShader).time.value = clock.getElapsedTime()
		}, Infinity)
		skillMenu.onDestroy(() => shimmerCoroutine.stop())
		icon.addComponent(new UIPositionComponent())

		skill.name.split(' ').forEach((text, index) => {
			const textEntity = new Entity('skill text')
			textEntity.addComponent(new SpriteComponent(Tile.empty()))
			textEntity.addComponent(new TextComponent(text, { outlineWidth: 1 }))
			textEntity.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 1 + index * 2 }))
			button.addChildren(textEntity)
		})

		button.addChildren(icon)
		container.addChildren(button)
	}
	SelectableComponent.setFromArray(selectors)

	return skillMenu
}
export default SkillMenuEntity
