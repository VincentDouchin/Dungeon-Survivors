import Coroutine from "../Globals/Coroutine";
import Shader from "./Shader";
import frag from './glsl/transition.frag?raw';
import vert from './glsl/main.vert?raw';

class TransitionShader extends Shader {
	vert = vert
	frag = frag
	constructor(duration = 60, atHalf?: () => void) {
		super((sprite) => {
			new Coroutine(function* () {
				for (let i = 0; i < duration + 2; i++) {
					yield
					sprite.getUniforms(TransitionShader).time.value = Math.abs(i - duration / 2) / (duration / 2)
					sprite.render()
					if (i === duration / 2 && atHalf) atHalf()
				}
			})
			return {
				time: 0
			}
		})

	}
}

export default TransitionShader
