import MeshComponent from "../Components/MeshComponent"
import UIPosition from "../Components/UIPosition"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"
import Engine from "../Globals/Engine"
import { inputManager } from "../Globals/Initialize"
import framedTile from "../Utils/FramedTile"

const SkillMenuEntity = () => {
	const skillMenu = new Entity()
	skillMenu.addComponent(new MeshComponent(framedTile(AssetManager.UI.frame1, 16, 100, 50), { scale: 2 }))
	skillMenu.addComponent(new UIPosition())
	for (let i = 0; i < 3; i++) {
		const button = new Entity()
		const buttonMesh = button.addComponent(new MeshComponent(framedTile(AssetManager.UI.frame2, 4, 24, 24), { scale: 2 }))
		button.addComponent(new UIPosition({ x: [-0.5, 0, 0.5][i], y: 0 }))
		const icon = new Entity()
		icon.addComponent(new MeshComponent(AssetManager.icons.turnSpeed, { scale: 2 }))
		icon.addComponent(new UIPosition())
		button.addChildren(icon)
		skillMenu.addChildren(button)
		inputManager.eventBus.subscribe('down', ({ intersects }: { intersects: number[] }) => {
			if (intersects.includes(buttonMesh.mesh.id)) {
				Engine.setState('run')
			}
		})
	}

	return skillMenu
}
export default SkillMenuEntity