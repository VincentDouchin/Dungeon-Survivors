import ActiveSpellEntity from "./ActiveSpellEntity"
import BoostsEntity from "./BoostsEntity"
import DpadInputEntity from "./DpadInputEntity"
import { Entity } from "../Globals/ECS"
import LevelDisplayEntity from "./LevelDisplayEntity"
import ManaBarEntity from "./ManaBarEntity"
import PauseButtonEntity from "./PauseButtonEntity"
import SpellButtonEntity from "./SpellButtonEntity"
import State from "../Globals/State"
import SwitchButtonEntity from "./SwitchButtonEntity"
import TimeCounterEntity from "./TimeCounterEntity"
import XPBarEntity from "./XPBarEntity"

const UIRunEntity = () => {
	const ui = new Entity('ui run')
	const level = ui.addChildren(LevelDisplayEntity())
	const xpBar = level.addChildren(XPBarEntity())
	xpBar.addChildren(BoostsEntity())
	const activeSpell = ui.addChildren(ActiveSpellEntity())
	activeSpell.addChildren(ManaBarEntity())
	ui.addChildren(TimeCounterEntity())
	if (State.mobile) {
		activeSpell.addChildren(PauseButtonEntity())
		ui.addChildren(DpadInputEntity())
		const skillbutton = ui.addChildren(SpellButtonEntity())
		skillbutton.addChildren(SwitchButtonEntity())
	}
	return ui
}
export default UIRunEntity