import { ECS, Entity, System } from "../Globals/ECS";

import AIMovementComponent from "../Components/AIMovementComponent";
import BodyComponent from "../Components/BodyComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import Coroutine from "../Globals/Coroutine";
import { ECSEVENTS } from "../Constants/Events";
import HealthComponent from "../Components/HealthComponent";
import JointComponent from "../Components/JointComponent";
import ParticleEntity from "../Entities/ParticleEntitty";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import SpriteComponent from "../Components/SpriteComponent";
import { Vector2 } from "three";
import assets from "../Globals/Assets";
import waitFor from "../Utils/WaitFor";
import { world } from "../Globals/Initialize";

class AIMovementSystem extends System {
	walls: Map<Entity, Vector2> = new Map()
	constructor() {
		super(AIMovementComponent)
		this.subscribers.push(ECS.eventBus.subscribe(ECSEVENTS.ADD_WALL, wall => {
			this.walls.set(wall, wall.getComponent(PositionComponent).position)
		}))
		this.subscribers.push(ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, entity => {
			if (this.walls.has(entity)) {
				this.walls.delete(entity)
			}
		}))
	}
	update(entities: Entity[]): void {
		const groups: Map<number, Entity[]> = new Map()
		ECS.getEntitiesAndComponents(HealthComponent).forEach(([entityId, health]) => {
			const groupEntity = ECS.getEntityById(entityId)
			if (!groups.has(health.type)) {
				groups.set(health.type, [groupEntity])
			} else {
				groups.get(health.type)?.push(groupEntity)
			}
		})
		entities.forEach(entity => {
			const ai = entity.getComponent(AIMovementComponent)
			if (!ai.enabled) return
			const position = entity.getComponent(PositionComponent).position
			const body = entity.getComponent(BodyComponent)
			const velocity = new Vector2()
			const seekingVelocity = new Vector2()
			const avoidWallsVelocity = new Vector2()
			const followingVelocity = new Vector2()
			const separationVelocity = new Vector2()
			const chargingVelocity = new Vector2()

			if (ai.chargingDirection) {
				const chargingForce = Math.min((ai.chargingTimer + 45) / 90, 1)
				chargingVelocity.add(ai.chargingDirection.clone().multiply(new Vector2(chargingForce, chargingForce)))
				body.contacts(() => {
					ai.chargingDirection = null
				}, COLLISIONGROUPS.ENEMY, [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.WALL, COLLISIONGROUPS.WEAPON])
				ai.chargingTimer--
				if (ai.chargingTimer === 0) {
					ai.chargingDirection = null
					ai.chargingResetTimer = 90
				}

			} else {
				if (ai.seeking) {
					let distance = 0
					let destination: Vector2 = new Vector2()
					ai.seeking.forEach(group => {
						groups.get(group)?.forEach(groupEntity => {
							const enemyPosition = groupEntity.getComponent(PositionComponent).position
							const newDistance = enemyPosition.distanceTo(position)
							if (!distance || distance > newDistance) {
								distance = newDistance
								destination.x = enemyPosition.x
								destination.y = enemyPosition.y
							}
						})
					})
					if (distance) {
						seekingVelocity.add(destination.clone().sub(position).normalize())
						if (ai.seekingDistance && distance < ai.seekingDistance) {
							seekingVelocity.negate()
						}
						const joint = entity.getComponent(JointComponent)
						const rotation = entity.getComponent(RotationComponent)
						if (rotation && joint && joint?.type == 'revolute') {
							const r = rotation.rotation
							const angleDiff = -seekingVelocity.angle() + r
							if (!rotation) return
							const delta = 0.01
							if (Math.abs(angleDiff) <= delta) {
								rotation.angVel.base = 0
							} else {
								rotation.angVel.base = Math.sin(angleDiff) * 2
							}
						}
						if (ai.charger) {
							if (distance < 100) {
								ai.chargingResetTimer--
								if (ai.chargingResetTimer <= 0) {
									const sprite = entity.getComponent(SpriteComponent)
									new Coroutine(function* () {
										ai.enabled = false
										ParticleEntity({ x: position.x, y: position.y - sprite.scaledHeight / 2 }, assets.effects.SmokeCircular, { scale: sprite.scaledWidth / 30, renderOrder: 0, frameRate: 3 })
										yield* waitFor(30)
										ai.chargingDirection = seekingVelocity.clone().multiply(new Vector2(5, 5))
										ai.enabled = true
										ai.chargingTimer = 120
									})
								}
							}
						}
					}

				}
				if (ai.follower) {
					const followingPosition = ai.follower.getComponent(PositionComponent).position
					const distanceToFollow = followingPosition.distanceTo(position)
					if (distanceToFollow > ai.followingDistance) {
						const followFactor = distanceToFollow / (ai.followingDistance * 2)
						followingVelocity.add(followingPosition.clone().sub(position).normalize().multiply(new Vector2(followFactor, followFactor)))
					}
				}
				velocity
					.add(seekingVelocity)
					.add(separationVelocity.normalize())
					.add(followingVelocity)

				// !AVOID WALLS
				let increments = 0
				let sign = 1
				let rayDistance = 100
				const avoidObstacles = () => {
					const newDirection = velocity.clone().rotateAround(new Vector2(0, 0), Math.PI / 4 * increments * sign)
					let collisions = false
					world.castShape(position, 0, newDirection, body.body!.collider(0).shape, rayDistance, false, undefined, undefined, undefined, undefined, (collider) => {
						if (collider?.parent()?.bodyType() === 1) {
							collisions = true
							return true
						}
						return false
					})
					if (!collisions || rayDistance === 0) {
						avoidWallsVelocity.add(newDirection).add(velocity.clone().negate())
					} else {
						sign *= -1
						rayDistance -= 10
						if (sign > 0) increments++
						avoidObstacles()
					}
				}
				avoidObstacles()
			}


			velocity.add(avoidWallsVelocity).normalize().add(chargingVelocity)
			body.velocity.add(velocity)
		})
	}
}
export default AIMovementSystem