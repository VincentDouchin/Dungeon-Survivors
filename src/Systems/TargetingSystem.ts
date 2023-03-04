import { ECS, Entity, System } from "../Globals/ECS";

import BodyComponent from "../Components/BodyComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import Coroutine from "../Globals/Coroutine";
import HealthComponent from "../Components/HealthComponent";
import JointComponent from "../Components/JointComponent";
import ParticleEntity from "../Entities/ParticleEntitty";
import PositionComponent from "../Components/PositionComponent";
import RangedComponent from "../Components/RangedComponent";
import RotationComponent from "../Components/RotationComponent";
import SpriteComponent from "../Components/SpriteComponent";
import TargeterComponent from "../Components/TargeterComponent";
import { Vector2 } from "three";
import assets from "../Globals/Assets";
import waitFor from "../Utils/WaitFor";
import { world } from "../Globals/Initialize";

class TargetingSystem extends System {
	constructor() {
		super(TargeterComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const targeter = entity.getComponent(TargeterComponent)
			if (!targeter.enabled) return
			const position = entity.parent?.getComponent(PositionComponent) ?? entity.getComponent(PositionComponent)
			const joint = entity.getComponent(JointComponent)
			const body = entity.getComponent(BodyComponent)
			const ranged = entity.getComponent(RangedComponent)
			if (!targeter.targetedEnemy) {
				const enemyId = ECS.getEntitiesAndComponents(HealthComponent)
					.reduce<[string, number]>(([target, distance], [entityId, health]) => {
						if (health.type === targeter.target) {
							const enemyPosition = ECS.getEntityById(entityId).getComponent(PositionComponent)
							const distanceToEnemy = enemyPosition.distanceTo(position)
							if (distanceToEnemy < distance) return [entityId, distanceToEnemy]
							if (distance == 0) return [entityId, distanceToEnemy]
						}
						return [target, distance]
					}, ['', 0])[0]
				targeter.targetedEnemy = enemyId
			}

			const rotation = entity.getComponent(RotationComponent)
			if (targeter.targetedEnemy) {
				const sprite = entity.getComponent(SpriteComponent)
				const enemy = ECS.getEntityById(targeter.targetedEnemy)
				const enemyPosition = enemy.getComponent(PositionComponent)
				const direction = enemyPosition.position.clone().sub(position.position).normalize()
				const distance = enemyPosition.position.distanceTo(position.position)
				if (targeter.charging) {
					body.contacts(() => {
						targeter.charging = false
					}, COLLISIONGROUPS.ENEMY, [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.WALL, COLLISIONGROUPS.WEAPON])
				}
				if (targeter.charger && distance <= targeter.distanceToTarget && !targeter.charging) {
					const charge = function* () {
						yield
						let timer = 40
						const magnitude = Math.sqrt((enemyPosition.x - position.x) ** 2 + (enemyPosition.y - position.y) ** 2)
						targeter.chargingDirection.set((enemyPosition.x - position.x) / magnitude, (enemyPosition.y - position.y) / magnitude)

						body.velocity.x = 0
						body.velocity.y = 0
						while (timer > 0) {
							timer--
							body.contacts(() => {
								timer = 0
							}, COLLISIONGROUPS.ENEMY, [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.WALL, COLLISIONGROUPS.WEAPON])

							body.velocity.x = targeter.chargingDirection.x * 5
							body.velocity.y = targeter.chargingDirection.y * 5
							yield
						}

						body.velocity.x = 0
						body.velocity.y = 0
					}
					const resetCoroutine = new Coroutine(function* () {
						targeter.charger = false
						yield* waitFor(180)
						targeter.charger = true
					})
					const startCoroutine = new Coroutine(function* () {
						targeter.charging = true
						yield* waitFor(40)
						ParticleEntity({ x: position.x, y: position.y - sprite.scaledHeight / 2 }, assets.effects.SmokeCircular, { scale: sprite.scaledWidth / 30, renderOrder: 0, frameRate: 3 })
						yield* charge()
						targeter.charging = false
					})
					entity.onDestroy(() => {
						resetCoroutine.stop()
						startCoroutine.stop()
					})

				} else if (joint?.type == 'revolute') {
					const r = rotation.rotation
					const angleDiff = -direction.angle() + r
					if (!rotation) return
					const delta = 0.01
					if (Math.abs(angleDiff) <= delta) {
						rotation.angVel.base = 0
					} else {
						rotation.angVel.base = Math.sin(angleDiff) * 4
					}
				} else if (!targeter.charging) {
					let increments = 0
					let sign = 1
					let rayDistance = 100
					const avoidObstacles = () => {
						const newDirection = direction.clone().rotateAround(new Vector2(0, 0), Math.PI / 4 * increments * sign)
						const lastDirection = ranged ? new Vector2(0, 0).sub(newDirection) : newDirection
						let collisions = false
						world.castShape(position.position, 0, lastDirection, body.body!.collider(0).shape, rayDistance, false, undefined, undefined, undefined, undefined, (collider) => {
							if (collider?.parent()?.bodyType() === 1) {
								collisions = true
								return true
							}
							return false
						})
						if (!collisions || rayDistance === 0) {
							body.velocity.set(lastDirection.x, lastDirection.y)
						} else {
							sign *= -1
							rayDistance -= 10
							if (sign > 0) increments++
							avoidObstacles()
						}
					}
					avoidObstacles()
				}



			} else {
				rotation && (rotation.angVel.base = 0)
			}
		})
	}
}
export default TargetingSystem