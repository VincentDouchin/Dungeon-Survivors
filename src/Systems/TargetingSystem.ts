import { ECS, Entity, System } from "../Globals/ECS";

import BodyComponent from "../Components/BodyComponent";
import HealthComponent from "../Components/HealthComponent";
import JointComponent from "../Components/JointComponent";
import PositionComponent from "../Components/PositionComponent";
import RangedComponent from "../Components/RangedComponent";
import { Ray } from "@dimforge/rapier2d-compat";
import RotationComponent from "../Components/RotationComponent";
import TargeterComponent from "../Components/TargeterComponent";
import { Vector2 } from "three";
import { world } from "../Globals/Initialize";

class TargetingSystem extends System {
	constructor() {
		super(TargeterComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const position = entity.parent?.getComponent(PositionComponent) ?? entity.getComponent(PositionComponent)
			const targeter = entity.getComponent(TargeterComponent)
			const joint = entity.getComponent(JointComponent)
			const body = entity.getComponent(BodyComponent)
			const ranged = entity.getComponent(RangedComponent)
			if (!targeter.targetedEnemy) {
				const enemyId = ECS.getEntitiesAndComponents(HealthComponent)
					.reduce<[string, number]>(([target, distance], [entityId, health]) => {
						if (health.type == targeter.target) {
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
						rotation.angVel = 0
					} else {
						rotation.angVel = Math.sin(angleDiff) * 4
					}
				} else {
					let increments = 0
					let sign = 1

					const avoidObstacles = () => {
						const newDirection = direction.clone().rotateAround(new Vector2(0, 0), Math.PI / 8 * increments * sign)
						const lastDirection = ranged ? new Vector2(0, 0).sub(newDirection) : newDirection
						const ray = new Ray(position.position, lastDirection)
						let collisions = false
						world.intersectionsWithRay(ray, 100, true, (hit) => {
							if (hit?.collider?.parent()?.bodyType() === 1) {
								collisions = true
								return false
							}
							return true
						})
						if (!collisions || increments === 8) {
							body.velocity.add(lastDirection)
						} else {
							sign *= -1
							if (sign > 0) increments++
							avoidObstacles()
						}
					}
					avoidObstacles()
				}


			} else {
				rotation && (rotation.angVel = 0)
			}
		})
	}
}
export default TargetingSystem