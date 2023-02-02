import { Component } from "../Globals/ECS";
import { ProjectileDefinition } from "../Constants/Projectiles";
import { WeaponDefinition } from "../Constants/Weapons";

class ShooterComponent extends Component {
	projectile: ProjectileDefinition
	timer: number
	delay: number
	spread: number
	range: number
	projectilesNb: number
	target: number
	group: number
	constructor(weaponDefinition: WeaponDefinition) {
		super()
		this.target = weaponDefinition.target
		this.group = weaponDefinition.group
		this.projectile = weaponDefinition.projectile!
		this.projectilesNb = weaponDefinition.projectilesNb ?? 1
		this.spread = weaponDefinition.spread ?? 0
		this.range = weaponDefinition.range ?? 60
		this.delay = weaponDefinition.delay ?? 40
		this.timer = Math.random() * this.delay
	}
}
ShooterComponent.register()
export default ShooterComponent