import { Entity } from "../Globals/ECS"
import SkillMenuEntity from "./SkillMenuEntity"

const SkillMenuUIEntity = () => {
	const ui = new Entity()
	ui.addChildren(SkillMenuEntity())
	return ui
}
export default SkillMenuUIEntity