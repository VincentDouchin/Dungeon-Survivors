import { ECS, Entity } from "../Globals/ECS";
import { inputManager, render } from "../Globals/Initialize";

import CameraSystem from "../Systems/CameraSystem";
import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import INPUTS from "../Constants/InputsNames";
import RenderSystem from "../Systems/RenderSystem";
import SelectionSystem from "../Systems/SelectionSystem";
import TutorialEntity from "../UIEntities/TutorialEntity";
import UIPauseEntity from "../UIEntities/UIPauseEntity";

class PauseState implements GameState {
	ui?: Entity
	tutorial?: Entity
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
		CameraSystem.register()
		this.ui = UIPauseEntity()
		this.tutorial = TutorialEntity()
	}
	unset() {
		ECS.unRegisterSystems()
		this.ui?.destroy()
		this.tutorial?.destroy()
	}
}
export default PauseState