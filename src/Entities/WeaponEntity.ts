import BodyComponent from "../Components/BodyComponent"
import DamageComponent from "../Components/DamageComponent"
import MeshComponent from "../Components/MeshComponent"
import WeaponControllerComponent from "../Components/WeaponControllerComponent"
import DAMAGETYPES from "../Constants/DamageTypes"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const WeaponEntity = (owner: Entity) => {
	const weapon = new Entity()
	const sword = AssetManager.tiles.weapon_knight_sword
	weapon.addComponent(new BodyComponent(
		{ moveForce: 10, mass: 1 },
		{ width: sword.width, height: sword.height, contact: true, sensor: true }
	))
	weapon.addComponent(new MeshComponent(sword))
	weapon.addComponent(new DamageComponent(2, DAMAGETYPES.player))
	weapon.addComponent(new WeaponControllerComponent(owner))
	return weapon
}
export default WeaponEntity