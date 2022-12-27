import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import WeaponControllerComponent from "../Components/WeaponControllerComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const WeaponEntity = (owner: Entity) => {
	const weapon = new Entity()
	const sword = AssetManager.tiles.weapon_knight_sword
	weapon.addComponent(new BodyComponent(
		{ moveForce: 10 },
		[{ width: sword.width, height: sword.height, contact: true, sensor: true, mass: 1, group: COLLISIONGROUPS.WEAPON, canCollideWith: [COLLISIONGROUPS.ENEMY] }]
	))
	weapon.addComponent(new MeshComponent(sword))
	weapon.addComponent(new DamageComponent(5, COLLISIONGROUPS.PLAYER))
	weapon.addComponent(new WeaponControllerComponent(owner))
	return weapon
}
export default WeaponEntity