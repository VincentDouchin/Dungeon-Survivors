
import { Entity } from "../Globals/ECS"
import XPBarEntity from "../UIEntities.ts/XPBarEntity"
const RunUIEntity = () => {
	//! UI
	const ui = new Entity()
	//! XP
	ui.addChildren(XPBarEntity())


	return ui
}
export default RunUIEntity