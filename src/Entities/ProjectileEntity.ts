import AnimationComponent from '../Components/AnimationComponent'
import BodyComponent from '../Components/BodyComponent'
import Coroutine from '../Globals/Coroutine'
import DamageComponent from '../Components/DamageComponent'
import { Entity } from '../Globals/ECS'
import ExpirationComponent from '../Components/ExpirationComponent'
import LevelComponent from '../Components/LevelComponent'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import type { SOUND } from '../Constants/Sounds'
import SpriteComponent from '../Components/SpriteComponent'
import StatsComponent from '../Components/StatsComponent'
import type { TargetGroup } from '../Constants/Weapons'
import type Tile from '../Utils/Tile'
import { soundManager } from '../Globals/Initialize'

// const ProjectileEntity = (projectileDefinition: ShooterComponent, position: { x: number, y: number }, rotation: number) => {
export interface ProjectileOptions {
	tile: Tile
	damage: number
	speed: number
	targetGroup: TargetGroup
	range: number
	nb?: number
	spread?: number
	rotationSpeed?: number
	scale?: number
	piercing?: number
	sound?: SOUND
	afterHit?: (entity: Entity) => any
}
const ProjectileEntity = ({ tile, damage, speed, targetGroup, range, nb = 1, spread = 0, scale = 1, rotationSpeed = 0, piercing = 1, afterHit, sound }: ProjectileOptions) => (parent: Entity) => {
	const projectiles = new Entity('projectiles')
	let counter = nb
	for (let i = 0; i < nb; i++) {
		const projectile = new Entity('projectile')

		const position = parent.getComponent(PositionComponent)
		const rotation = parent.getComponent(RotationComponent)
		const projectileRotation = rotation.rotation - spread / 2 + (spread * i / nb)
		const height = (parent.getComponent(SpriteComponent)?.height ?? 0) / 2 + (tile?.height ?? 0) / 2
		projectile.addComponent(new PositionComponent(position.x - Math.cos(rotation.rotation) * height, position.y - Math.sin(rotation.rotation) * height))
		projectile.addComponent(new RotationComponent({
			rotation: projectileRotation,
			rotationVel: rotationSpeed,
		}))
		projectile.addComponent(new SpriteComponent(tile, { scale, renderOrder: 1 }))
		if (tile.frames > 1) {
			projectile.addComponent(new AnimationComponent({ idle: tile }, { selectedFrame: Math.floor(Math.random() * tile.frames) }))
		}
		const projectileBody = projectile.addComponent(new BodyComponent(
			{ moveForce: speed },
			[
				{ group: targetGroup.group, canCollideWith: targetGroup.target, mass: 0.1, contact: false, sensor: true, width: tile.width, height: tile.height },
			],
		))
		const coroutine = new Coroutine(function* () {
			yield
			projectileBody.velocity.x = -Math.cos(projectileRotation)
			projectileBody.velocity.y = -Math.sin(projectileRotation)
		}, Infinity)
		projectile.addComponent(new DamageComponent(damage, targetGroup.target, piercing, 5))
		projectile.addComponent(new ExpirationComponent(range))
		projectile.onDestroy(() => {
			coroutine.stop()
			counter--
			if (sound) {
				soundManager.play('effect', sound)
			}
			if (afterHit) {
				afterHit(projectile)
			}
			if (counter === 0) {
				projectiles.destroy()
			}
		})
		const stats = parent.getComponent(StatsComponent)
		if (stats) {
			projectile.addComponent(stats)
		}
		const level = parent.getComponent(LevelComponent)
		if (level) {
			projectile.addComponent(level)
		}
		projectiles.addChildren(projectile)
	}
	return projectiles
}
export default ProjectileEntity
