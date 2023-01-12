
import { Entity } from "../Globals/ECS"
import XPBarEntity from "./XPBarEntity"
import LevelDisplayEntity from "./LevelDisplayEntity"
const UIRunEntity = () => {
	const ui = new Entity()
	const level = ui.addChildren(LevelDisplayEntity())
	level.addChildren(XPBarEntity())
	return ui
}
export default UIRunEntity