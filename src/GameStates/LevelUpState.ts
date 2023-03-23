import { ECS, Entity } from '../Globals/ECS'
import { engine, inputManager, render, soundManager } from '../Globals/Initialize'

import { GameState } from '../Globals/Engine'
import INPUTS from '../Constants/InputsNames'
import RenderSystem from '../Systems/RenderSystem'
import RunState from './RunState'
import { SOUNDS } from '../Constants/Sounds'
import SelectionSystem from '../Systems/SelectionSystem'
import SkillMenuUIEntity from '../UIEntities/UISkillMenuEntity.ts'

class LevelUpState implements GameState {
	ui: Entity | null = null
	update() {
		ECS.updateSystems()
		if (inputManager.getInput(INPUTS.INTERACT)?.once) {
			engine.setState(RunState)
		}
	}
	render() {
		render()
	}
	set() {
		soundManager.play('effect', SOUNDS.LEVEL_UP, { playbackRate: 0.5 })
		RenderSystem.register()
		SelectionSystem.register()
		this.ui = SkillMenuUIEntity()
	}
	unset() {
		this.ui?.destroy()
		ECS.unRegisterSystems()
	}

}
export default LevelUpState