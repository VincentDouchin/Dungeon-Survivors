import { ECS, Entity, System } from "../Globals/ECS";

import HealthComponent from "../Components/HealthComponent";
import JointComponent from "../Components/JointComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import TargeterComponent from "../Components/TargeterComponent";

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
			if (!targeter.targetedEnemy) {
				const enemyId = ECS.getEntitiesAndComponents(HealthComponent)
					.reduce<[string, number]>(([target, distance], [entityId, health]) => {
						if (targeter.target?.includes(health.type)) {
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
				const enemy = ECS.getEntityById(targeter.targetedEnemy)
				const enemyPosition = enemy.getComponent(PositionComponent)
				const direction = enemyPosition.position.clone().sub(position.position).normalize()
				if (joint?.type == 'revolute') {
					const r = rotation.rotation
					const angleDiff = -direction.angle() + r
					if (!rotation) return
					const delta = 0.01
					if (Math.abs(angleDiff) <= delta) {
						rotation.angVel.base = 0
					} else {
						rotation.angVel.base = Math.sin(angleDiff) * 2
					}
				}
				// if (targeter.charging) {
				// 	body.contacts(() => {
				// 		targeter.charging = false
				// 	}, COLLISIONGROUPS.ENEMY, [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.WALL, COLLISIONGROUPS.WEAPON])
				// }
				// if (targeter.charger && distance <= targeter.distanceToTarget && !targeter.charging) {
				// 	const charge = function* () {
				// 		yield
				// 		let timer = 40
				// 		const magnitude = Math.sqrt((enemyPosition.x - position.x) ** 2 + (enemyPosition.y - position.y) ** 2)
				// 		targeter.chargingDirection.set((enemyPosition.x - position.x) / magnitude, (enemyPosition.y - position.y) / magnitude)

				// 		body.velocity.x = 0
				// 		body.velocity.y = 0
				// 		while (timer > 0) {
				// 			timer--
				// 			body.contacts(() => {
				// 				timer = 0
				// 			}, COLLISIONGROUPS.ENEMY, [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.WALL, COLLISIONGROUPS.WEAPON])

				// 			body.velocity.x = targeter.chargingDirection.x * 5
				// 			body.velocity.y = targeter.chargingDirection.y * 5
				// 			yield
				// 		}

				// 		body.velocity.x = 0
				// 		body.velocity.y = 0
				// 	}
				// 	const resetCoroutine = new Coroutine(function* () {
				// 		targeter.charger = false
				// 		yield* waitFor(180)
				// 		targeter.charger = true
				// 	})
				// 	const startCoroutine = new Coroutine(function* () {
				// 		targeter.charging = true
				// 		yield* waitFor(40)
				// 		ParticleEntity({ x: position.x, y: position.y - sprite.scaledHeight / 2 }, assets.effects.SmokeCircular, { scale: sprite.scaledWidth / 30, renderOrder: 0, frameRate: 3 })
				// 		yield* charge()
				// 		targeter.charging = false
				// 	})
				// 	entity.onDestroy(() => {
				// 		resetCoroutine.stop()
				// 		startCoroutine.stop()
				// 	})

				// } 




			} else {
				rotation && (rotation.angVel.base = 0)
			}
		})
	}
}
export default TargetingSystem