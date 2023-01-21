import AnimationComponent from "../Components/AnimationComponent"
import SpriteComponent from "../Components/SpriteComponent"
import PositionComponent from "../Components/PositionComponent"
import { Entity } from "../Globals/ECS"
import { assets } from "../Globals/Initialize"

const ParticleEntity = async (x: number, y: number, animation?: string) => {
	const tile = assets.magic[animation ?? 'smoke']
	const particle = new Entity()
	particle.addComponent(new SpriteComponent(tile))
	particle.addComponent(new PositionComponent(x, y))
	const testAnimation = particle.addComponent(new AnimationComponent({ default: tile }, { start: false, frameRate: 5 }))
	return testAnimation.playAnimation().then(() => particle.destroy())
}
export default ParticleEntity