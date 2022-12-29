import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import OrbiterComponent from "../Components/OrbiterComponent"
import RotationComponent from "../Components/RotationComponent"
import ShooterComponent from "../Components/ShooterComponent"
import TargeterComponent from "../Components/TargeterComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import WEAPONBEHAVIORS from "../Constants/WeaponBehaviros"
import { Entity } from "../Globals/ECS"

const WeaponEntity = (weaponDefinition: WeaponDefinition) => {
	const weapon = new Entity()
	const tile = weaponDefinition.tile
	for (let behavior of weaponDefinition.behaviors) {
		const component = {
			[WEAPONBEHAVIORS.orbiter]: new OrbiterComponent(),
			[WEAPONBEHAVIORS.targeter]: new TargeterComponent(COLLISIONGROUPS.ENEMY),
			[WEAPONBEHAVIORS.shooter]: new ShooterComponent(weaponDefinition.projectile!),
			[WEAPONBEHAVIORS.toucher]: new DamageComponent(weaponDefinition.damage, [COLLISIONGROUPS.ENEMY])
		}[behavior]
		weapon.addComponent(component)
	}
	weapon.addComponent(new BodyComponent(
		{ moveForce: 10 },
		[{ width: tile.width, height: tile.height, contact: true, sensor: true, mass: 1, group: COLLISIONGROUPS.WEAPON, canCollideWith: [COLLISIONGROUPS.ENEMY] }]
	))
	weapon.addComponent(new MeshComponent(tile))
	return weapon
}
export default WeaponEntity