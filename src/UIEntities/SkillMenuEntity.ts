import SpriteComponent from "../Components/SpriteComponent"
import SelectableComponent from "../Components/SelectableComponent"
import TextComponent from "../Components/TextComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import { State } from "../Constants/GameStates"
import SKILLS from "../Constants/Skills"
import { ECS, Entity } from "../Globals/ECS"
import Engine from "../Globals/Engine"
import { assets, inputManager } from "../Globals/Initialize"
import framedTile from "../Utils/FramedTile"

const SkillMenuEntity = () => {
	const skillMenu = new Entity()
	skillMenu.addComponent(new SpriteComponent(framedTile(assets.UI.frame1, 16, 100, 50), { scale: 2 }))
	const skillMenuPosition = skillMenu.addComponent(new UIPosition({ x: 0, y: 2 }))

	skillMenuPosition.moveTo(-2, 0, 30)
	const possibleSkills = [...SKILLS]
	for (let i = 0; i < 3; i++) {
		const button = new Entity()
		const buttonTile = framedTile(assets.UI.frame2, 4, 24, 24)
		const buttonMesh = button.addComponent(new SpriteComponent(buttonTile, { scale: 2 }))
		const selectableEntity = new Entity()
		const emptyTile32 = framedTile(assets.UI.empty, 0, 32, 32)
		selectableEntity.addComponent(new SpriteComponent(emptyTile32, { scale: 2 }))
		selectableEntity.addComponent(new SelectableComponent(assets.UI.selectedframe, emptyTile32))
		selectableEntity.addComponent(new UIPosition())
		button.addChildren(selectableEntity)
		button.addComponent(new UIPosition({ x: [-0.5, 0, 0.5][i], y: 0 }))
		const icon = new Entity()
		const [skill] = possibleSkills.splice(Math.floor(Math.random() * possibleSkills.length), 1)



		icon.addComponent(new SpriteComponent(skill.icon, { scale: 3 }))
		icon.addComponent(new UIPosition())

		const text = new Entity()
		text.addComponent(new UIPosition({ x: 0, y: -1 }, { x: 0, y: 0 }))
		text.addComponent(new TextComponent(skill.name, { maxWidth: buttonMesh.width, anchorY: 'top', anchorX: '50%' }))
		text.addComponent(new SpriteComponent(assets.UI.empty))

		button.addChildren(text)
		button.addChildren(icon)
		skillMenu.addChildren(button)
		const sub = inputManager.eventBus.subscribe('down', ({ uiObjects }: TouchCoord) => {
			if (uiObjects.includes(buttonMesh.mesh.id)) {
				inputManager.eventBus.unsubscribe('down', sub)
				ECS.eventBus.publish(ECSEVENTS.SKILL, skill)
				skillMenuPosition.moveTo(0, -2, 30).then(() => Engine.setState(State.run))
			}
		})
	}

	return skillMenu
}
export default SkillMenuEntity