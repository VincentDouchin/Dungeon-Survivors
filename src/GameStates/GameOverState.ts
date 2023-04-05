import type { Entity } from '../Globals/ECS'
import { ECS } from '../Globals/ECS'
import { inputManager, render, soundManager } from '../Globals/Initialize'

import type { GameState } from '../Globals/Engine'
import RenderSystem from '../Systems/RenderSystem'
import { SOUNDS } from '../Constants/Sounds'
import SelectionSystem from '../Systems/SelectionSystem'
import UIGameOverEntity from '../UIEntities/UIGameOverEntity'

class GameOverState implements GameState {
	ui: Entity | null = null
	update() {
		inputManager.updateInputs()
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
