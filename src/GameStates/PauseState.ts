import { PAUSE } from "../Constants/InputsNames";
import Engine from "../Globals/Engine";
import { inputManager } from "../Globals/Initialize";

class PauseState implements GameState {
	constructor() {

	}
	update() {
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState('run')
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