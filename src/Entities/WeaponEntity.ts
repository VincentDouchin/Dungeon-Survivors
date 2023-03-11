import AIMovementComponent from "../Components/AIMovementComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import JointComponent from "../Components/JointComponent"
import PositionComponent from "../Components/PositionComponent"
import RotationComponent from "../Components/RotationComponent"
import ShooterComponent from "../Components/ShooterComponent"
import SpriteComponent from "../Components/SpriteComponent"
import StatsComponent from "../Components/StatsComponent"
import WEAPONBEHAVIORS from "../Constants/WeaponBehaviros"
import { WeaponDefinition } from "../Constants/Weapons"

const WeaponEntity = (weaponDefinition: WeaponDefinition, parent: Entity, parentHeight: number, stats?: StatsComponent) => {

	const weapon = new Entity('weapon')
	const parentPosition = parent.getComponent(PositionComponent)
	const parentSprite = parent.getComponent(SpriteComponent)
	const tile = weaponDefinition.tile
	for (let behavior of weaponDefinition.behaviors) {
		const component = {
			[WEAPONBEHAVIORS.orbiter]: new JointComponent('revolute', (tile.height + parentHeight) / 2, parent),
			[WEAPONBEHAVIORS.targeter]: new AIMovementComponent({ seeking: weaponDefinition.target }),
			[WEAPONBEHAVIORS.shooter]: new ShooterComponent(weaponDefinition),
			[WEAPONBEHAVIORS.toucher]: new DamageComponent(weaponDefinition.damage, weaponDefinition.target, -1, 5, weaponDefinition.sound)
		}[behavior]
		weapon.addComponent(component)
	}
	weapon.addComponent(new BodyComponent(
		{ moveForce: 10, lock: true },
		[{ width: tile.width, height: tile.height, contact: true, sensor: true, mass: 0.00001, group: COLLISIONGROUPS.WEAPON, canCollideWith: weaponDefinition.target }]
	))
	weapon.addComponent(new SpriteComponent(tile))
	const angVel = weaponDefinition.behaviors.includes(WEAPONBEHAVIORS.targeter) ? 0 : 1
	weapon.addComponent(new RotationComponent({ angVel }))
	weapon.addComponent(new PositionComponent(parentPosition.x, parentPosition.y))
	if (stats) {
		weapon.addComponent(stats)
	}
	return weapon
}
export default WeaponEntity