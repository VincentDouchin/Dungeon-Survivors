import { ECS, Entity } from '../Globals/ECS'
import { engine, inputManager, render } from '../Globals/Initialize'

import { GameState } from '../Globals/Engine'
import INPUTS from '../Constants/InputsNames'
import RenderSystem from '../Systems/RenderSystem'
import RunState from './RunState'
import SelectionSystem from '../Systems/SelectionSystem'
import UIWinEntity from '../UIEntities/UiWinEntity'

class WinState implements GameState {
	ui?: Entity
	update() {
		if (inputManager.getInput(INPUTS.PAUSE)?.once) {
			engine.setState(RunState)
		}
		ECS.updateSystems()
	}
	render() {
		render()
	}
	set() {
		RenderSystem.register()
		SelectionSystem.register()
		this.ui = UIWinEntity()
	}
	unset() {
		ECS.unRegisterSystems()
		this.ui?.destroy()
	}
}
export default WinState