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
			mesh.texture.repeat.x = (animation.flipped ? -1 : 1) / animation.maxFrames
			mesh.texture.offset.x = ((animation.flipped ? 1 : 0) + animation.selectedFrame) / animation.frames

			if (animation.currentState != animation.lastState || mesh.modifier != mesh.lastModifer) {

				mesh.texture.image = animation.tile[mesh.modifier]!.canvas

				mesh.lastModifer = mesh.modifier
				mesh.texture.needsUpdate = true
				animation.selectedFrame = 0
			}
		})
	}
}
export default AnimationSystem