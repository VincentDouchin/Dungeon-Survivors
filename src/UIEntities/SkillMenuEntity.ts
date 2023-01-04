import MeshComponent from "../Components/MeshComponent"
import TextComponent from "../Components/TextComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import SKILLS from "../Constants/Skills"
import AssetManager from "../Globals/AssetManager"
import { ECS, Entity } from "../Globals/ECS"
import Engine from "../Globals/Engine"
import { inputManager } from "../Globals/Initialize"
import framedTile from "../Utils/FramedTile"

const SkillMenuEntity = () => {
	const skillMenu = new Entity()
	skillMenu.addComponent(new MeshComponent(framedTile(AssetManager.UI.frame1, 16, 100, 50), { scale: 2 }))
	skillMenu.addComponent(new UIPosition())
	const possibleSkills = [...SKILLS]
	for (let i = 0; i < 3; i++) {
		const button = new Entity()
		const buttonMesh = button.addComponent(new MeshComponent(framedTile(AssetManager.UI.frame2, 4, 24, 24), { scale: 2 }))
		button.addComponent(new UIPosition({ x: [-0.5, 0, 0.5][i], y: 0 }))
		const icon = new Entity()
		// const skill: string = Object.values(SKILLNAMES)[Math.floor(Math.random() * Object.keys(SKILLNAMES).length)]
		// console.log(skill)
		const [skill] = possibleSkills.splice(Math.floor(Math.random() * possibleSkills.length), 1)


		icon.addComponent(new MeshComponent(skill.icon, { scale: 2 }))
		icon.addComponent(new UIPosition())
		const text = new Entity()
		text.addComponent(new TextComponent(skill.name))
		text.addComponent(new UIPosition({ x: 0, y: 1 }, { x: 0, y: -1 }))
		text.addComponent(new MeshComponent(AssetManager.UI.empty))
		icon.addChildren(text)
		button.addChildren(icon)
		skillMenu.addChildren(button)
		inputManager.eventBus.subscribe('down', ({ intersects }: { intersects: number[] }) => {
			if (intersects.includes(buttonMesh.mesh.id)) {
				ECS.eventBus.publish(ECSEVENTS.SKILL, skill)
				Engine.setState('run')
			}
		})
	}

	return skillMenu
}
export default SkillMenuEntity