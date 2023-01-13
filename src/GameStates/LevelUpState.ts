import { INTERACT } from "../Constants/InputsNames"
import { ECS, Entity } from "../Globals/ECS"
import Engine from "../Globals/Engine"
import { inputManager } from "../Globals/Initialize"
import RenderingSystem from "../Systems/RenderingSystem"
import SkillMenuUIEntity from "../UIEntities/UISkillMenuEntity.ts"
import { render } from "../Globals/Initialize"
import { State } from "../Constants/GameStates"

class LevelUpState implements GameState {
	ui: Entity | null = null
	construtor() {

	}

	update() {
		ECS.updateSystems()
		if (inputManager.getInput(INTERACT)?.once) {
			Engine.setState(State.run)
		}
	}
	render() {
		render()
	}
	set() {
		this.ui = SkillMenuUIEntity()
		RenderingSystem.register()
	}
	unset() {
		this.ui?.destroy()
		ECS.unRegisterSystems()
	}

}
export default LevelUpState