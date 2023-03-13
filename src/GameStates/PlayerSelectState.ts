import { ECS, Entity } from "../Globals/ECS"

import AnimationSystem from "../Systems/AnimationSystem"
import { GameState } from "../Globals/Engine"
import RenderSystem from "../Systems/RenderSystem"
import SelectionSystem from "../Systems/SelectionSystem"
import UIPlayerSelectEntity from "../UIEntities/UIPlayerSelectEntity"
import { render } from "../Globals/Initialize"

class PlayerSelectState implements GameState {
	ui?: Entity
	render() {
		render()
	}
	update() {
		ECS.updateSystems()
	}
	set() {
		RenderSystem.register()
		AnimationSystem.register()
		SelectionSystem.register()
		this.ui = UIPlayerSelectEntity()
	}
	unset() {
		this.ui?.destroy()
		ECS.unRegisterSystems()
	}
}
export default PlayerSelectState