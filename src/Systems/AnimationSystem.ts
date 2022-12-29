import AnimationComponent from "../Components/AnimationComponent";

import MeshComponent from "../Components/MeshComponent";
import { Entity, System } from "../Globals/ECS";

class AnimationSystem extends System {
	constructor() {
		super(AnimationComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const animation = entity.getComponent(AnimationComponent)
			const mesh = entity.getComponent(MeshComponent)
			animation.frameCounter++
			if (animation.frameCounter > animation.frameRate) {
				animation.frameCounter = 0
				animation.selectedFrame = (animation.selectedFrame + 1) % animation.frames
			}

			// mesh.texture.repeat.set(1 / animation.maxFrames, 1)
			// mesh.texture.repeat.set((animation.flipped ? -1 : 1) / animation.maxFrames, 1)
			// mesh.uniforms.uRepeatX.value = (animation.flipped ? -1 : 1) / animation.maxFrames
			// mesh.uniforms.uOffsetX.value = ((animation.flipped ? 1 : 0) + animation.selectedFrame) / animation.frames
			mesh.texture.repeat.x = (animation.flipped ? -1 : 1) / animation.maxFrames
			mesh.texture.offset.x = ((animation.flipped ? 1 : 0) + animation.selectedFrame) / animation.frames
			if (mesh.normalMap) {
				mesh.normalMap.repeat.x = (animation.flipped ? -1 : 1) / animation.maxFrames
				mesh.normalMap.offset.x = ((animation.flipped ? 1 : 0) + animation.selectedFrame) / animation.frames
			}
			// mesh.texture.offset.set(((animation.flipped ? 1 : 0) + animation.selectedFrame) / animation.frames, 0)
			if (animation.currentState != animation.lastState) {
				mesh.texture.image = animation.tile.buffer.canvas
				if (mesh.normalMap) {
					mesh.normalMap.image = animation.tile.normalMap?.canvas

				}
				// mesh.texture.image = animation.tile.buffer.canvas
				mesh.texture.needsUpdate = true
				animation.selectedFrame = 0
			}
		})
	}
}
export default AnimationSystem