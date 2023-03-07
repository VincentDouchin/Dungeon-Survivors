import Coroutine from '../Globals/Coroutine'
import Shader from './Shader'
import frag from './glsl/dissolve.frag?raw'
import noise from './glsl/lib/cnoise.glsl?raw'
import vert from './glsl/main.vert?raw'

class DissolveShader extends Shader {
	vert = vert
	frag = noise + frag
	finish: null | Promise<void> = null
	constructor(duration: number, invert: boolean = false, kernel: number) {
		super((sprite) => {
			this.finish = new Promise<void>(resolve => {
				new Coroutine(function* () {
					for (let i = 0; i < duration; i++) {
						yield
						sprite.getUniforms(DissolveShader).time.value = i / duration
						sprite.render()
					}
					resolve()
				})
			})
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