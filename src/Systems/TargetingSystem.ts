import HealthComponent from "../Components/HealthComponent";
import MeshComponent from "../Components/MeshComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import ShooterComponent from "../Components/ShooterComponent";
import TargeterComponent from "../Components/TargeterComponent";
import ProjectileEntity from "../Entities/ProjectileEntity";
import { ECS, Entity, System } from "../Globals/ECS";

class TargetingSystem extends System {
	constructor() {
		super(TargeterComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {
			const position = entity.parent!.getComponent(PositionComponent)
			const targeter = entity.getComponent(TargeterComponent)
			if (!targeter.targetedEnemy) {
				let counter = 0
				const enemyId = ECS.getEntitiesAndComponents(HealthComponent)
					.reduce<[string, number]>(([target, distance], [entityId, health]) => {
						if (health.type == targeter.target) {
							counter++
							const enemyPosition = ECS.getEntityById(entityId).getComponent(PositionComponent)
							const distanceToEnemy = Math.pow(enemyPosition.x - position.x, 2) + Math.pow(enemyPosition.y - position.y, 2)

							if (distanceToEnemy < distance) return [entityId, distanceToEnemy]
							if (distance == 0) return [entityId, distanceToEnemy]
						}
						return [target, distance]
					}, ['', 0])[0]
				if (enemyId) {
					targeter.targetedEnemy = enemyId
					const enemy = ECS.getEntityById(enemyId)
					enemy.getComponent(MeshComponent).uniforms.uColor.value.x = 1
					enemy.getComponent(MeshComponent).uniforms.uColor.value.needsUpdate = true
				}
			}
			const rotation = entity.getComponent(RotationComponent)
			if (targeter.targetedEnemy) {
				if (!rotation) return
				const enemy = ECS.getEntityById(targeter.targetedEnemy)
				const enemyPosition = enemy.getComponent(PositionComponent)
				const x = position.x - enemyPosition.x
				const y = position.y - enemyPosition.y
				const angle = Math.atan2(y, x)
				const r = rotation.rotation
				const angleDiff = angle - r
				const delta = 0.01
				if (Math.abs(angleDiff) <= delta) {
					rotation.angVel = 0
				} else {
					rotation.angVel = Math.sin(angleDiff) * 4
				}
			} else {
				rotation && (rotation.angVel = 0)
			}
		})
	}
}
export default TargetingSystem