import Shader from './Shader'
import { clock } from '../Globals/Initialize'
import frag from './glsl/shimmer.frag?raw'
import vert from './glsl/main.vert?raw'

class ShimmerShader extends Shader {
	vert = vert
	frag = frag
	constructor(thickness?: number) {
		super(() => ({
			time: clock.elapsedTime,
			thickness: thickness ?? 0.2,
			start: Math.random(),
			delay: Math.random(),
			angle: 1.3,
			speed: 0.5,
		}))
	}
}

export default ShimmerShader