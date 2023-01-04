import { Component } from "../Globals/ECS";

class ShooterComponent extends Component {
	projectile: ProjectileDefinition
	timer: number = 0
	delay: number = 20
	spread: number
	range: number
	projectilesNb: number
	constructor(weaponDefinition: WeaponDefinition) {
		super()
		this.projectile = weaponDefinition.projectile!
		this.projectilesNb = weaponDefinition.projectilesNb ?? 1
		this.spread = weaponDefinition.spread ?? 0
		this.range = weaponDefinition.range ?? 60
	}
}
ShooterComponent.register()
export default ShooterComponent