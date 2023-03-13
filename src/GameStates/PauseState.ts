import { ECS, Entity } from "../Globals/ECS";

import CameraSystem from "../Systems/CameraSystem";
import { GameState } from "../Globals/Engine";
import RenderSystem from "../Systems/RenderSystem";
import SelectionSystem from "../Systems/SelectionSystem";
import State from "../Globals/State";
import TutorialEntity from "../UIEntities/TutorialEntity";
import UIPauseEntity from "../UIEntities/UIPauseEntity";
import { render } from "../Globals/Initialize";

class PauseState implements GameState {
	ui?: Entity
	tutorial?: Entity
	update() {
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