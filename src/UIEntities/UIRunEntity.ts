import { Entity } from "../Globals/ECS"
import LevelDisplayEntity from "./LevelDisplayEntity"
import PauseButtonEntity from "./PauseButtonEntity"
import TimeCounterEntity from "./TimeCounterEntity"
import XPBarEntity from "./XPBarEntity"

const UIRunEntity = () => {
	const ui = new Entity('ui run')
	const level = ui.addChildren(LevelDisplayEntity())
	level.addChildren(XPBarEntity())
	ui.addChildren(PauseButtonEntity())
	ui.addChildren(TimeCounterEntity())
	return ui
}
export default UIRunEntity