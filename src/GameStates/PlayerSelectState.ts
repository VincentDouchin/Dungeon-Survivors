import type { Entity } from '../Globals/ECS'
import { ECS } from '../Globals/ECS'

import AnimationSystem from '../Systems/AnimationSystem'
import type { GameState } from '../Globals/Engine'
import RenderSystem from '../Systems/RenderSystem'
import SelectionSystem from '../Systems/SelectionSystem'
import UIPlayerSelectEntity from '../UIEntities/UIPlayerSelectEntity'
import { engine, inputManager, render } from '../Globals/Initialize'
import INPUTS from '../Constants/InputsNames'
import saveData, { save } from '../Globals/SaveManager'
import HEROS from '../Constants/Heros'

class PlayerSelectState implements GameState {
	ui?: Entity
	secret = [INPUTS.MOVEUP, INPUTS.MOVEUP, INPUTS.MOVEDOWN, INPUTS.MOVEDOWN, INPUTS.MOVELEFT, INPUTS.MOVERIGHT, INPUTS.MOVELEFT, INPUTS.MOVERIGHT, INPUTS.SKILL, INPUTS.VALIDATE]
	render() {
		render()
	}

	update() {
		inputManager.updateInputs()
		ECS.updateSystems()
		if (saveData.heros.length !== HEROS.filter(hero => hero.needUnlock).length) {
			if (this.secret.length === 0) {
				saveData.heros = HEROS.filter(hero => hero.needUnlock).map(hero => hero.name)
				save()
				engine.setState(PlayerSelectState)
			} else {
				if (inputManager.getInput(this.secret[0])?.once) {
					this.secret.shift()
				}
			}
		}
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
