import type { Entity } from '../Globals/ECS'
import { ECS } from '../Globals/ECS'

import AnimationSystem from '../Systems/AnimationSystem'
import type { GameState } from '../Globals/Engine'
import RenderSystem from '../Systems/RenderSystem'
import SelectionSystem from '../Systems/SelectionSystem'
import UIPlayerSelectEntity from '../UIEntities/UIPlayerSelectEntity'
import { inputManager, render } from '../Globals/Initialize'

class PlayerSelectState implements GameState {
	ui?: Entity
	render() {
		render()
	}

	update() {
		inputManager.updateInputs()
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
