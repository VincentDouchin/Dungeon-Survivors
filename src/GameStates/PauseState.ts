import { State } from "../Constants/GameStates";
import { PAUSE } from "../Constants/InputsNames";
import Engine from "../Globals/Engine";
import { inputManager } from "../Globals/Initialize";

class PauseState implements GameState {
	constructor() {

	}
	update() {
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState(State.run)
		}
	}
	render() {

	}
	set() {

	}
	unset() {

	}
}
export default PauseState