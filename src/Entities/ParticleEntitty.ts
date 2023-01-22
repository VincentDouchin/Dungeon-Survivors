import AnimationComponent from "../Components/AnimationComponent"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import Tile from "../Utils/Tile"

const ParticleEntity = async (x: number, y: number, tile: Tile, frameRate?: number) => {
	const particle = new Entity()
	particle.addComponent(new SpriteComponent(tile))
	particle.addComponent(new PositionComponent(x, y))
	const testAnimation = particle.addComponent(new AnimationComponent({ default: tile }, { start: false, frameRate: frameRate ?? 5 }))
	return testAnimation.playAnimation().then(() => particle.destroy())
}
export default ParticleEntity