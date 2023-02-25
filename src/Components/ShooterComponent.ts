import { Component } from "../Globals/ECS";
import { Stat } from "../Game/Stat";
import Tile from "../Utils/Tile";
import { WeaponDefinition } from "../Constants/Weapons";

class ShooterComponent extends Component {
	projectile: Tile
	timer: number
	delay: Stat
	spread: number
	range: number
	projectilesNb: number
	target: number
	group: number
	speed: number
	damage: Stat
	rotationSpeed: number
	scale: number
	light?: string
	constructor(weaponDefinition: WeaponDefinition) {
		super()
		this.damage = new Stat(weaponDefinition.damage)
		this.target = weaponDefinition.target
		this.group = weaponDefinition.group
		this.projectile = weaponDefinition.projectile!
		this.speed = weaponDefinition.speed!
		this.projectilesNb = weaponDefinition.projectilesNb ?? 1
		this.spread = weaponDefinition.spread ?? 0
		this.range = weaponDefinition.range ?? 60
		this.delay = new Stat(weaponDefinition.delay ?? 40)
		this.timer = Math.random() * this.delay.value
		this.rotationSpeed = (weaponDefinition?.rotationSpeed ?? 0)
		this.light = weaponDefinition.light
		this.scale = weaponDefinition.scale ?? 1
	}
}
ShooterComponent.register()
export default ShooterComponent