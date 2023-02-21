import ActiveSkillButtonEntity from "./ActiveSkillButtonEntity"
import DpadInputEntity from "./DpadInputEntity"
import { Entity } from "../Globals/ECS"
import LevelDisplayEntity from "./LevelDisplayEntity"
import ManaBarEntity from "./ManaBarEntity"
import PauseButtonEntity from "./PauseButtonEntity"
import State from "../Globals/State"
import SwitchButtonEntity from "./SwitchButtonEntity"
import TimeCounterEntity from "./TimeCounterEntity"
import XPBarEntity from "./XPBarEntity"

const UIRunEntity = () => {
	const ui = new Entity('ui run')
	const level = ui.addChildren(LevelDisplayEntity())
	const xpBar = level.addChildren(XPBarEntity())
	xpBar.addChildren(ManaBarEntity())
	ui.addChildren(TimeCounterEntity())
	if (State.mobile) {
		ui.addChildren(DpadInputEntity())
		ui.addChildren(PauseButtonEntity())
		const skillbutton = ui.addChildren(ActiveSkillButtonEntity())
		skillbutton.addChildren(SwitchButtonEntity())
	}
	return ui
}
export default UIRunEntity