import { CanvasTexture } from "three";
import AnimationComponent from "../Components/AnimationComponent";

import SpriteComponent from "../Components/SpriteComponent";
import { Entity, System } from "../Globals/ECS";

class AnimationSystem extends System {
	constructor() {
		super(AnimationComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const animation = entity.getComponent(AnimationComponent)
			const sprite = entity.getComponent(SpriteComponent)
			animation.frameCounter++
			if (animation.start) {
				if (animation.frameCounter > animation.frameRate) {
					animation.frameCounter = 0
					animation.selectedFrame = (animation.selectedFrame + 1) % animation.frames
				}


				if (animation.currentState != animation.lastState) {
					// sprite.uniforms.uTexture = new CanvasTexture(animation.tile[sprite.state]!.canvas)
					animation.selectedFrame = 0
				}
			}
			sprite.texture.repeat.x = (animation.flipped ? -1 : 1) / animation.maxFrames
			sprite.texture.offset.x = ((animation.flipped ? 1 : 0) + animation.selectedFrame) / animation.frames
		})
	}
}
export default AnimationSystem