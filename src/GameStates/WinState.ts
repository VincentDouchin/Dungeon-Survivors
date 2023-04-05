import type { Entity } from '../Globals/ECS'
import { ECS } from '../Globals/ECS'
import { engine, inputManager, render } from '../Globals/Initialize'

import type { GameState } from '../Globals/Engine'
import INPUTS from '../Constants/InputsNames'
import RenderSystem from '../Systems/RenderSystem'
import SelectionSystem from '../Systems/SelectionSystem'
import UIWinEntity from '../UIEntities/UiWinEntity'
import RunState from './RunState'

class WinState implements GameState {
	ui?: Entity
	update() {
		inputManager.updateInputs()
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
