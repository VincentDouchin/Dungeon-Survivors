import AIMovementComponent from '../Components/AIMovementComponent'
import BodyComponent from '../Components/BodyComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import DamageComponent from '../Components/DamageComponent'
import { Entity } from '../Globals/ECS'
import JointComponent from '../Components/JointComponent'
import type LevelComponent from '../Components/LevelComponent'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import ShooterComponent from '../Components/ShooterComponent'
import SpriteComponent from '../Components/SpriteComponent'
import type StatsComponent from '../Components/StatsComponent'
import type { WeaponDefinition } from '../Constants/Weapons'

const WeaponEntity = (weaponDefinition: WeaponDefinition, parent: Entity, parentHeight: number, stats?: StatsComponent, level?: LevelComponent) => {
	const weapon = new Entity('weapon')
	const parentPosition = parent.getComponent(PositionComponent)
	const tile = weaponDefinition.tile

	if (weaponDefinition.targeter) {
		weapon.addComponent(new AIMovementComponent({ seeking: weaponDefinition.targetGroup.target }))
	}
	if (weaponDefinition.projectile) {
		weapon.addComponent(new ShooterComponent(weaponDefinition.projectile, weaponDefinition.sound))
	}
	if (weaponDefinition.orbiter) {
		weapon.addComponent(new JointComponent('revolute', { x: ((tile?.height ?? 16) + parentHeight) / 2, y: 0 }, parent))
	}
	if (weaponDefinition.damage) {
		weapon.addComponent(new DamageComponent(weaponDefinition.damage, weaponDefinition.targetGroup.target, -1, 5, weaponDefinition.sound))
	}

	weapon.addComponent(new BodyComponent(
		{ moveForce: 10, lock: true },
		{ width: tile?.width ?? 16, height: tile?.height ?? 16, contact: true, sensor: true, mass: 0.00001, group: COLLISIONGROUPS.WEAPON, canCollideWith: weaponDefinition.targetGroup.target },
	))
	if (tile) {
		weapon.addComponent(new SpriteComponent(tile, { renderOrder: 2 }))
	}
	const angVel = weaponDefinition.targeter ? 0 : 1
	weapon.addComponent(new RotationComponent({ angVel, rotation: weaponDefinition.angle ?? 0, mirror: weaponDefinition.mirror }))
	weapon.addComponent(parentPosition.clone())
	if (stats) {
		weapon.addComponent(stats)
	}
	if (level) {
		weapon.addComponent(level)
	}
	return weapon
}
export default WeaponEntity
