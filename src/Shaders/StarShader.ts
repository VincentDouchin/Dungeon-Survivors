import { ECS, Entity } from '../Globals/ECS'

import Coroutine from '../Globals/Coroutine'
import { ECSEVENTS } from '../Constants/Events'
import Shader from './Shader'
import frag from './glsl/star.frag?raw'
import noise from './glsl/lib/cnoise.glsl?raw'
import vert from './glsl/main.vert?raw'

class StarShader extends Shader {
	vert = vert
	frag = noise + frag
	constructor(parent: Entity) {
		let coroutine: Coroutine
		super((sprite) => {
			coroutine = new Coroutine(function* (i) {
				yield
				sprite.getUniforms(StarShader).time.value = i
				sprite.render()
			}, Infinity)
			return {
				time: 0,
			}
		})
		const sub = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
			if (entity === parent) {
				coroutine.stop()
				sub()
			}
		})
	}
}

export default StarShader