import MeshComponent from "../Components/MeshComponent"
import TextComponent from "../Components/TextComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import SKILLS from "../Constants/Skills"
import AssetManager from "../Globals/AssetManager"
import Coroutines from "../Globals/Coroutines"
import { ECS, Entity } from "../Globals/ECS"
import Engine from "../Globals/Engine"
import { inputManager } from "../Globals/Initialize"
import framedTile from "../Utils/FramedTile"
import { easeInOutQuad } from "../Utils/Tween"

const SkillMenuEntity = () => {
	const skillMenu = new Entity()
	skillMenu.addComponent(new MeshComponent(framedTile(AssetManager.UI.frame1, 16, 100, 50), { scale: 2 }))
	const skillMenuPosition = skillMenu.addComponent(new UIPosition({ x: 0, y: 2 }))
	Coroutines.add(function* () {
		let t = 0
		while (skillMenuPosition.relativePosition.y != 0) {
			skillMenuPosition.relativePosition.y = easeInOutQuad(t, -2, 0, 30)
			t++
			yield

		}
		return
	})
	const possibleSkills = [...SKILLS]
	const selectedFrame = new Entity()
	selectedFrame.addComponent(new MeshComponent(AssetManager.UI.selectedframe, { scale: 2 }))
	selectedFrame.addComponent(new UIPosition({ x: -0.5, y: 0 }))
	skillMenu.addChildren(selectedFrame)
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
		text.addComponent(new UIPosition({ x: 0, y: -1 }, { x: 0, y: 0 }))
		text.addComponent(new TextComponent(skill.name, { maxWidth: buttonMesh.width, anchorY: 'top' }))
		text.addComponent(new MeshComponent(AssetManager.UI.empty))

		button.addChildren(text)
		button.addChildren(icon)
		skillMenu.addChildren(button)
		inputManager.eventBus.subscribe('down', ({ intersects }: { intersects: number[] }) => {
			if (intersects.includes(buttonMesh.mesh.id)) {
				ECS.eventBus.publish(ECSEVENTS.SKILL, skill)
				Coroutines.add(function* () {
					let t = 0
					while (skillMenuPosition.relativePosition.y != -2) {
						skillMenuPosition.relativePosition.y = easeInOutQuad(t, 0, -2, 30)
						t++
						yield

					}
					Engine.setState('run')
					return
				})
			}
		})
	}

	return skillMenu
}
export default SkillMenuEntity