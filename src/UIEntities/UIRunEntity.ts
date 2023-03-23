import { engine, inputManager } from '../Globals/Initialize'

import ActiveSpellEntity from './ActiveSpellEntity'
import BoostsEntity from './BoostsEntity'
import ButtonEntity from './ButtonEntity'
import DpadInputEntity from './DpadInputEntity'
import { Entity } from '../Globals/ECS'
import INPUTS from '../Constants/InputsNames'
import LevelDisplayEntity from './LevelDisplayEntity'
import ManaBarEntity from './ManaBarEntity'
import PauseState from '../GameStates/PauseState'
import SpellButtonEntity from './SpellButtonEntity'
import State from '../Globals/State'
import SwitchButtonEntity from './SwitchButtonEntity'
import TimeCounterEntity from './TimeCounterEntity'
import UIPositionComponent from '../Components/UIPositionComponent'
import XPBarEntity from './XPBarEntity'
import assets from '../Globals/Assets'

const UIRunEntity = () => {
	const ui = new Entity('ui run')

	const level = ui.addChildren(LevelDisplayEntity())
	const xpBar = level.addChildren(XPBarEntity())
	xpBar.addChildren(BoostsEntity())
	const activeSpell = ui.addChildren(ActiveSpellEntity())
	activeSpell.addChildren(ManaBarEntity())
	const timer = ui.addChildren(TimeCounterEntity())
	const mobileEntities: Entity[] = []
	if (State.mobile) {
		const pause = ButtonEntity(8, 8, 2, assets.icons.settings, 2, () => {
			inputManager.eventBus.publish(INPUTS.PAUSE, true)
		}, true)
		pause.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 1 }))
		activeSpell.addChildren(pause)
		const dpad = ui.addChildren(DpadInputEntity())
		const skillbutton = ui.addChildren(SpellButtonEntity())
		skillbutton.addChildren(SwitchButtonEntity())
		mobileEntities.push(dpad, skillbutton)
	}
	const remuseSub = inputManager.eventBus.subscribe(INPUTS.PAUSE, async state => {
		if (!state) return
		await Promise.all([
			...[level, activeSpell, timer].map(entity => entity.getComponent(UIPositionComponent).moveTo(2, 10)),
			...mobileEntities.map(entity => entity.getComponent(UIPositionComponent).moveTo(-2, 10))
		])
		inputManager.eventBus.publish(INPUTS.PAUSE, false)
		engine.setState(PauseState)
	})
	ui.onDestroy(() => remuseSub())

	return ui
}
export default UIRunEntity