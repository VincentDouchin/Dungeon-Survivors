import Coroutine from '../Globals/Coroutine'
import { ECSEVENTS } from '../Constants/Events'
import type { Entity } from '../Globals/ECS'
import { ECS } from '../Globals/ECS'
import Shader from './Shader'
import frag from './glsl/shimmer.frag?raw'
import vert from './glsl/main.vert?raw'

class ShimmerShader extends Shader {
	vert = vert
	frag = frag
	constructor(parent: Entity, thickness?: number) {
		let coroutine: Coroutine
		super((sprite) => {
			coroutine = new Coroutine(function* (i) {
				yield
				sprite.getUniforms(ShimmerShader).time.value = i / 60
				sprite.render()
			}, Infinity)
			return {
				time: 0,
				thickness: thickness ?? 0.2,
				start: Math.random(),
				delay: Math.random(),
				angle: 1.3,
				speed: 0.5,
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

export default ShimmerShader
