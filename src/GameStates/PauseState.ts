import { ECS, Entity } from "../Globals/ECS";
import { inputManager, render } from "../Globals/Initialize";

import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import { PAUSE } from "../Constants/InputsNames";
import RenderSystem from "../Systems/RenderSystem";
import UIPauseEntity from "../UIEntities/UIPauseEntity";

class PauseState implements GameState {
	ui?: Entity
	update() {
		ECS.updateSystems()
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState(GameStates.run)
		}
	}
	render() {
		render()
	}
	set() {
		RenderSystem.register()
		this.ui = UIPauseEntity()
	}
	unset() {
		ECS.unRegisterSystems()
		this.ui?.destroy()

	}
}
export default PauseState