import { inputManager, render } from "../Globals/Initialize";

import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import { PAUSE } from "../Constants/InputsNames";

class PauseState implements GameState {
	constructor() {

	}
	update() {
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState(GameStates.run)
		}
	}
	render() {
		render()
	}
	set() {

	}
	unset() {

	}
}
export default PauseState