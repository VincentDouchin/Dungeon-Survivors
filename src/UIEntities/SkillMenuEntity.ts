import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { SKILL } from "../Constants/ECSEvents"

import Coroutines from "../Globals/Coroutines"
import Engine from "../Globals/Engine"
import { GameStates } from "../Constants/GameStates"
import SKILLS from "../Constants/Skills"
import SelectableComponent from "../Components/SelectableComponent"
import ShimmerShader from "../Shaders/ShimmerShader"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import { clock } from "../Globals/Initialize"
import framedTile from "../Utils/FramedTile"

const SkillMenuEntity = () => {
	const skillMenu = new Entity('skillmenu')
	skillMenu.addComponent(new SpriteComponent(framedTile(assets.UI.frame1, 16, 40, 15), { scale: 4 }))
	const skillMenuPosition = skillMenu.addComponent(new UIPositionComponent({ x: 0, y: 2 }))

	skillMenuPosition.moveTo(-2, 0, 30)
	const possibleSkills = [...SKILLS]
	const selectors: Entity[] = []
	for (let i = 0; i < 3; i++) {
		const button = new Entity('button')
		const buttonTile = framedTile(assets.UI.frame2, 4, 24, 24)
		const buttonMesh = button.addComponent(new SpriteComponent(buttonTile, { scale: 2 }))
		const selectableEntity = new Entity('selectableEntity')
		const emptyTile32 = framedTile(assets.UI.empty, 0, 32, 32)
		selectableEntity.addComponent(new SpriteComponent(emptyTile32, { scale: 2 }))
		selectableEntity.addComponent(new SelectableComponent(assets.UI.selectedframe, emptyTile32, () => {
			ECS.eventBus.publish<SKILL>(ECSEVENTS.SKILL, skill)
			skillMenuPosition.moveTo(0, -2, 30).then(() => Engine.setState(GameStates.run))
		}))
		selectors.push(selectableEntity)

		selectableEntity.addComponent(new UIPositionComponent())
		button.addChildren(selectableEntity)
		button.addComponent(new UIPositionComponent({ x: [-0.5, 0, 0.5][i], y: 0 }))
		const icon = new Entity('icon')
		const [skill] = possibleSkills.splice(Math.floor(Math.random() * possibleSkills.length), 1)



		const sprite = icon.addComponent(new SpriteComponent(skill.icon, { scale: 3, shaders: [new ShimmerShader()] }))
		Coroutines.add(function* () {
			while (sprite) {
				yield
				sprite.uniforms.time = clock.getElapsedTime()
			}
		})
		icon.addComponent(new UIPositionComponent())

		const text = new Entity('text')
		text.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 0 }))
		text.addComponent(new TextComponent(skill.name, { maxWidth: buttonMesh.width, anchorY: 'top', anchorX: 'center' }))
		text.addComponent(new SpriteComponent(assets.UI.empty))

		button.addChildren(text)
		button.addChildren(icon)
		skillMenu.addChildren(button)
		// const sub = inputManager.eventBus.subscribe('down', ({ uiObjects }: TouchCoord) => {
		// 	if (uiObjects.includes(buttonMesh.mesh.id)) {
		// 		inputManager.eventBus.unsubscribe('down', sub)

		// 	}
		// })
	}
	SelectableComponent.setFromArray(selectors)

	return skillMenu
}
export default SkillMenuEntity