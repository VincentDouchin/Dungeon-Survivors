import { ECS, Entity, System } from "../Globals/ECS";

import BodyComponent from "../Components/BodyComponent";
import HealthComponent from "../Components/HealthComponent";
import JointComponent from "../Components/JointComponent";
import PositionComponent from "../Components/PositionComponent";
import RangedComponent from "../Components/RangedComponent";
import RotationComponent from "../Components/RotationComponent";
import TargeterComponent from "../Components/TargeterComponent";

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
				const x = position.x - enemyPosition.x
				const y = position.y - enemyPosition.y
				const distance = Math.sqrt(x ** 2 + y ** 2)
				if (ranged ? distance > targeter.distanceToTarget : distance < targeter.distanceToTarget) return
				const angle = Math.atan2(y, x)
				if (joint?.type == 'revolute') {
					const r = rotation.rotation
					const angleDiff = angle - r
					if (!rotation) return
					const delta = 0.01
					if (Math.abs(angleDiff) <= delta) {
						rotation.angVel = 0
					} else {
						rotation.angVel = Math.sin(angleDiff) * 4
					}
				} else {
					const direction = ranged ? -1 : 1
					body.velocity.x -= Math.cos(angle) * direction
					body.velocity.y -= Math.sin(angle) * direction
				}

			} else {
				rotation && (rotation.angVel = 0)
			}
		})
	}
}
export default TargetingSystem