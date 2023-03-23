import Coroutine from '../Globals/Coroutine'
import Shader from './Shader'
import frag from './glsl/dissolve.frag?raw'
import noise from './glsl/lib/cnoise.glsl?raw'
import vert from './glsl/main.vert?raw'

class DissolveShader extends Shader {
	vert = vert
	frag = noise + frag

	constructor(duration: number, invert = false, kernel: number) {
		super((sprite) => {
			new Coroutine(function* (i) {
				yield
				sprite.getUniforms(DissolveShader).time.value = i / duration
				sprite.render()
			}, duration)
			return {
				time: 0,
				seed: Math.random(),
				invert: invert,
				duration,
				kernel
			}
		})
	}
}

export default DissolveShader