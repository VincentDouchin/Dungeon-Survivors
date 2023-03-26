import { engine, inputManager, render } from '../Globals/Initialize'

import CameraSystem from '../Systems/CameraSystem'
import { ECS } from '../Globals/ECS'
import type { Entity } from '../Globals/ECS'
import type { GameState } from '../Globals/Engine'
import INPUTS from '../Constants/InputsNames'
import RenderSystem from '../Systems/RenderSystem'
import SelectionSystem from '../Systems/SelectionSystem'
import State from '../Globals/State'
import TutorialEntity from '../UIEntities/TutorialEntity'
import UIPauseEntity from '../UIEntities/UIPauseEntity'
import RunState from './RunState'

class PauseState implements GameState {
	ui?: Entity
	tutorial?: Entity
	update() {
		ECS.updateSystems()
		if (inputManager.getInput(INPUTS.PAUSE).once) {
			engine.setState(RunState)
		}
	}

	render() {
		render()
	}

	set() {
		RenderSystem.register()
		SelectionSystem.register()
		CameraSystem.register()
		this.ui = UIPauseEntity()
		if (!State.mobile) {
			this.tutorial = TutorialEntity()
		}
	}

	unset() {
		ECS.unRegisterSystems()
		this.ui?.destroy()
		this.tutorial?.destroy()
	}
}
export default PauseState
