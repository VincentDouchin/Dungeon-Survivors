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
			const selectedFrame = animation.selectedFrame
			if (animation.start) {
				if (animation.frameCounter > animation.frameRate) {
					animation.frameCounter = 0
					animation.selectedFrame = (animation.selectedFrame + 1) % animation.frames
				}


				if (animation.currentState != animation.lastState) {
					animation.selectedFrame = 0
				}
			}
			if (selectedFrame != animation.selectedFrame && sprite.renderShader) {
				sprite.renderShader.uniforms.uTexture.value = animation.tile.textures[animation.selectedFrame]
				sprite.render()
			}

		})
	}
}
export default AnimationSystem