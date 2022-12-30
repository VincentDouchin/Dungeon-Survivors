import MeshComponent from "../Components/MeshComponent"
import UIPosition from "../Components/UIPosition"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const SkillMenuEntity = () => {
	const skillMenu = new Entity()
	skillMenu.addComponent(new MeshComponent(AssetManager.UI.frame1, { renderOrder: 100, scale: 5 }))
	skillMenu.addComponent(new UIPosition())

	return skillMenu
}
export default SkillMenuEntity