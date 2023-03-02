import Coroutine from '../Globals/Coroutine'
import Shader from './Shader'
import { clock } from '../Globals/Initialize'
import frag from './glsl/dissolve.frag?raw'
import noise from './glsl/lib/cnoise.glsl?raw'
import vert from './glsl/main.vert?raw'

class DissolveShader extends Shader {
	vert = vert
	frag = noise + frag
	finish: null | Promise<void> = null
	constructor(duration: number) {
		super((sprite) => {
			this.finish = new Promise<void>(resolve => {
				new Coroutine(function* () {
					const timestamp = clock.getElapsedTime()
					for (let i = 0; i < duration; i++) {
						yield
						sprite.uniforms.time = clock.getElapsedTime() - timestamp
					}
					resolve()
				})
			})
			return {
				time: clock.getElapsedTime(),
				seed: Math.random()
			}
		})
	}
}

export default DissolveShader