import { ECS, Entity } from "../Globals/ECS"
import { inputManager, render, soundManager } from "../Globals/Initialize"

import Engine from "../Globals/Engine"
import { GameStates } from "../Constants/GameStates"
import INPUTS from "../Constants/InputsNames";
import RenderSystem from "../Systems/RenderSystem"
import { SOUNDS } from "../Constants/Sounds";
import SelectionSystem from "../Systems/SelectionSystem"
import SkillMenuUIEntity from "../UIEntities/UISkillMenuEntity.ts"

class LevelUpState implements GameState {
	ui: Entity | null = null
	construtor() {

	}

	update() {
		ECS.updateSystems()
		if (inputManager.getInput(INPUTS.INTERACT)?.once) {
			Engine.setState(GameStates.run)
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