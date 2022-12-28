import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import WeaponControllerComponent from "../Components/WeaponControllerComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"

const WeaponEntity = (owner: Entity) => (weaponDefinition: WeaponDefinition) => {
	const weapon = new Entity()
	const tile = weaponDefinition.tile
	weapon.addComponent(new BodyComponent(
		{ moveForce: 10 },
		[{ width: tile.width, height: tile.height, contact: true, sensor: true, mass: 1, group: COLLISIONGROUPS.WEAPON, canCollideWith: [COLLISIONGROUPS.ENEMY] }]
	))
	weapon.addComponent(new MeshComponent(tile))
	weapon.addComponent(new DamageComponent(weaponDefinition.damage, [COLLISIONGROUPS.ENEMY]))
	weapon.addComponent(new WeaponControllerComponent(owner))
	return weapon
}
export default WeaponEntity