import AnimationComponent from '../Components/AnimationComponent'
import ColorShader from '../Shaders/ColorShader'
import { Entity } from '../Globals/ECS'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import type Tile from '../Utils/Tile'

const ParticleEntity = async (position: { x: number; y: number } | Entity, tile: Tile, options?: { frameRate?: number; scale?: number; renderOrder?: number; duration?: number; color?: [number, number, number, number]; offset?: { x: number; y: number } }) => {
	const particle = new Entity('particle')
	const particleSprite = particle.addComponent(new SpriteComponent(tile, { scale: options?.scale ?? 1, renderOrder: options?.renderOrder }))
	if (options?.color) {
		particleSprite.addShader(new ColorShader(...options.color))
	}
	if (position instanceof Entity) {
		particle.addComponent(new PositionComponent().fromParent(position, options?.offset?.x ?? 0, options?.offset?.y ?? 0))
	}
	else {
		particle.addComponent(new PositionComponent(position.x, position.y))
	}
	const testAnimation = particle.addComponent(new AnimationComponent({ default: tile }, { start: false, frameRate: options?.frameRate ?? 5 }))
	return testAnimation.playAnimation('default', options?.duration ?? 1).then(() => particle.destroy())
}
export default ParticleEntity
