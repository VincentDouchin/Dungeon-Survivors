import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import JointComponent from "../Components/JointComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import RotationComponent from "../Components/RotationComponent"
import ShooterComponent from "../Components/ShooterComponent"
import TargeterComponent from "../Components/TargeterComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import WEAPONBEHAVIORS from "../Constants/WeaponBehaviros"
import { Entity } from "../Globals/ECS"

const WeaponEntity = (weaponDefinition: WeaponDefinition, parent: Entity) => {

	const weapon = new Entity()
	const parentPosition = parent.getComponent(PositionComponent)
	const parentMesh = parent.getComponent(MeshComponent)
	const tile = weaponDefinition.tile
	for (let behavior of weaponDefinition.behaviors) {
		const component = {
			[WEAPONBEHAVIORS.orbiter]: new JointComponent('revolute', (tile.height + parentMesh.height) / 2, parent),
			[WEAPONBEHAVIORS.targeter]: new TargeterComponent(COLLISIONGROUPS.ENEMY),
			[WEAPONBEHAVIORS.shooter]: new ShooterComponent(weaponDefinition),
			[WEAPONBEHAVIORS.toucher]: new DamageComponent(weaponDefinition.damage, [COLLISIONGROUPS.ENEMY])
		}[behavior]
		weapon.addComponent(component)
	}
	weapon.addComponent(new BodyComponent(
		{ moveForce: 10, lock: true },
		[{ width: tile.width, height: tile.height, contact: true, sensor: true, mass: 1, group: COLLISIONGROUPS.WEAPON, canCollideWith: [COLLISIONGROUPS.ENEMY] }]
	))
	weapon.addComponent(new MeshComponent(tile))
	const angVel = weaponDefinition.behaviors.includes(WEAPONBEHAVIORS.targeter) ? 0 : 1
	weapon.addComponent(new RotationComponent(0, angVel))
	weapon.addComponent(new PositionComponent(parentPosition.x, parentPosition.y))
	return weapon
}
export default WeaponEntity