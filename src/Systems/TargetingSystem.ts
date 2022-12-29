import BodyComponent from "../Components/BodyComponent";
import HealthComponent from "../Components/HealthComponent"; import JointComponent from "../Components/JointComponent";
;
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import TargeterComponent from "../Components/TargeterComponent";
import { ECS, Entity, System } from "../Globals/ECS";

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
			if (!targeter.targetedEnemy) {
				const enemyId = ECS.getEntitiesAndComponents(HealthComponent)
					.reduce<[string, number]>(([target, distance], [entityId, health]) => {
						if (health.type == targeter.target) {
							const enemyPosition = ECS.getEntityById(entityId).getComponent(PositionComponent)
							const distanceToEnemy = Math.pow(enemyPosition.x - position.x, 2) + Math.pow(enemyPosition.y - position.y, 2)

							if (distanceToEnemy < distance) return [entityId, distanceToEnemy]
							if (distance == 0) return [entityId, distanceToEnemy]
						}
						return [target, distance]
					}, ['', 0])[0]
				if (enemyId) {
					targeter.targetedEnemy = enemyId
				}
			}
			const rotation = entity.getComponent(RotationComponent)
			if (targeter.targetedEnemy) {
				const enemy = ECS.getEntityById(targeter.targetedEnemy)
				const enemyPosition = enemy.getComponent(PositionComponent)
				const x = position.x - enemyPosition.x
				const y = position.y - enemyPosition.y
				const distance = Math.sqrt(x ** 2 + y ** 2)
				if (distance < targeter.distanceToTarget) return
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
					body.body?.setLinvel({ x: -Math.cos(angle) * body.moveForce, y: -Math.sin(angle) * body.moveForce }, true)
				}

			} else {
				rotation && (rotation.angVel = 0)
			}
		})
	}
}
export default TargetingSystem