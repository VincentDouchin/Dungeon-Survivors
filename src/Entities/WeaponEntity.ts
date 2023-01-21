import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import JointComponent from "../Components/JointComponent"
import SpriteComponent from "../Components/SpriteComponent"
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
	const parentSprite = parent.getComponent(SpriteComponent)
	const tile = weaponDefinition.tile
	for (let behavior of weaponDefinition.behaviors) {
		const component = {
			[WEAPONBEHAVIORS.orbiter]: new JointComponent('revolute', (tile.height + parentSprite?.height) / 2, parent),
			[WEAPONBEHAVIORS.targeter]: new TargeterComponent(COLLISIONGROUPS.ENEMY),
			[WEAPONBEHAVIORS.shooter]: new ShooterComponent(weaponDefinition),
			[WEAPONBEHAVIORS.toucher]: new DamageComponent(weaponDefinition.damage, [COLLISIONGROUPS.ENEMY], -1, 5)
		}[behavior]
		weapon.addComponent(component)
	}
	weapon.addComponent(new BodyComponent(
		{ moveForce: 10, lock: true },
		[{ width: tile.width, height: tile.height, contact: true, sensor: true, mass: 0.001, group: COLLISIONGROUPS.WEAPON, canCollideWith: [COLLISIONGROUPS.ENEMY] }]
	))
	weapon.addComponent(new SpriteComponent(tile))
	const angVel = weaponDefinition.behaviors.includes(WEAPONBEHAVIORS.targeter) ? 0 : 1
	weapon.addComponent(new RotationComponent(0, angVel))
	weapon.addComponent(new PositionComponent(parentPosition.x, parentPosition.y))
	return weapon
}
export default WeaponEntity