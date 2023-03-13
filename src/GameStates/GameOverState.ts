import { ECS, Entity } from "../Globals/ECS";
import { render, soundManager } from "../Globals/Initialize";

import { GameState } from "../Globals/Engine";
import RenderSystem from "../Systems/RenderSystem";
import { SOUNDS } from "../Constants/Sounds";
import SelectionSystem from "../Systems/SelectionSystem";
import UIGameOverEntity from "../UIEntities/UIGameOverEntity";

class GameOverState implements GameState {
	ui: Entity | null = null
	update() {
		ECS.updateSystems()
	}
	render() {
		render()
	}
	set() {
		soundManager.play('effect', SOUNDS.GAME_OVER)
		RenderSystem.register()
		SelectionSystem.register()
		this.ui = UIGameOverEntity()
	}
	unset() {
		this.ui?.destroy()
		ECS.unRegisterSystems()
	}

}
export default GameOverState