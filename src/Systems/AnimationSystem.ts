import { Entity, System } from "../Globals/ECS";

import AnimationComponent from "../Components/AnimationComponent";
import SpriteComponent from "../Components/SpriteComponent";

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
					animation.selectedFrame = 0
				}
			}

			sprite.texture.repeat.x = (animation.flipped ? -1 : 1)
			sprite.uniforms.uTexture = animation.tile.textures[animation.selectedFrame]
		})
	}
}
export default AnimationSystem