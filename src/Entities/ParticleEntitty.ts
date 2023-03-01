import AnimationComponent from "../Components/AnimationComponent"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import Tile from "../Utils/Tile"

const ParticleEntity = async (x: number, y: number, tile: Tile, options?: { frameRate?: number, scale?: number, renderOrder?: number, duration?: number }) => {
	const particle = new Entity('particle')
	particle.addComponent(new SpriteComponent(tile, { scale: options?.scale ?? 1, renderOrder: options?.renderOrder }))
	particle.addComponent(new PositionComponent(x, y))
	const testAnimation = particle.addComponent(new AnimationComponent({ default: tile }, { start: false, frameRate: options?.frameRate ?? 5 }))
	return testAnimation.playAnimation('default', options?.duration ?? 1).then(() => particle.destroy())
}
export default ParticleEntity