import ActiveSpellEntity from "./ActiveSpellEntity"
import BoostsEntity from "./BoostsEntity"
import ButtonEntity from "./ButtonEntity"
import DpadInputEntity from "./DpadInputEntity"
import { Entity } from "../Globals/ECS"
import INPUTS from "../Constants/InputsNames"
import LevelDisplayEntity from "./LevelDisplayEntity"
import ManaBarEntity from "./ManaBarEntity"
import SpellButtonEntity from "./SpellButtonEntity"
import State from "../Globals/State"
import SwitchButtonEntity from "./SwitchButtonEntity"
import TimeCounterEntity from "./TimeCounterEntity"
import UIPositionComponent from "../Components/UIPositionComponent"
import XPBarEntity from "./XPBarEntity"
import assets from "../Globals/Assets"
import { inputManager } from "../Globals/Initialize"

const UIRunEntity = () => {
	const ui = new Entity('ui run')
	const level = ui.addChildren(LevelDisplayEntity())
	const xpBar = level.addChildren(XPBarEntity())
	xpBar.addChildren(BoostsEntity())
	const activeSpell = ui.addChildren(ActiveSpellEntity())
	activeSpell.addChildren(ManaBarEntity())
	ui.addChildren(TimeCounterEntity())

	const pause = ButtonEntity(8, 8, 2, assets.UI.pauseicon, 2, () => {
		inputManager.eventBus.publish(INPUTS.PAUSE, true)
	}, true)
	pause.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 1 }))
	if (State.mobile) {
		activeSpell.addChildren(pause)
		ui.addChildren(DpadInputEntity())
		const skillbutton = ui.addChildren(SpellButtonEntity())
		skillbutton.addChildren(SwitchButtonEntity())
	}
	return ui
}
export default UIRunEntity