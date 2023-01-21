import { State } from "../Constants/GameStates"
import { INTERACT } from "../Constants/InputsNames"
import { ECS, Entity } from "../Globals/ECS"
import Engine from "../Globals/Engine"
import { inputManager, render } from "../Globals/Initialize"
import RenderSystem from "../Systems/RenderSystem"
import SkillMenuUIEntity from "../UIEntities/UISkillMenuEntity.ts"

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
		RenderSystem.register()
	}
	unset() {
		this.ui?.destroy()
		ECS.unRegisterSystems()
	}

}
export default LevelUpState