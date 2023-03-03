import { ECS, Entity } from "../Globals/ECS";
import { inputManager, render } from "../Globals/Initialize";

import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import INPUTS from "../Constants/InputsNames";
import RenderSystem from "../Systems/RenderSystem";
import SelectionSystem from "../Systems/SelectionSystem";
import UIPauseEntity from "../UIEntities/UIPauseEntity";

class PauseState implements GameState {
	ui?: Entity
	update() {
		if (inputManager.getInput(INPUTS.PAUSE)?.once) {
			Engine.setState(GameStates.run)
		}
		ECS.updateSystems()
	}
	render() {
		render()
	}
	set() {
		RenderSystem.register()
		SelectionSystem.register()
		this.ui = UIPauseEntity()
	}
	unset() {
		ECS.unRegisterSystems()
		this.ui?.destroy()
	}
}
export default PauseState