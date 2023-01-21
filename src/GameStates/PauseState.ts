import { inputManager, render } from "../Globals/Initialize";

import Engine from "../Globals/Engine";
import { PAUSE } from "../Constants/InputsNames";
import { State } from "../Constants/GameStates";

class PauseState implements GameState {
	constructor() {

	}
	update() {
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState(State.run)
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