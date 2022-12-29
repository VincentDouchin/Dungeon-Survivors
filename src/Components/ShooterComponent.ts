import { Component } from "../Globals/ECS";

class ShooterComponent extends Component {
	projectile: ProjectileDefinition
	timer: number = 0
	delay: number = 20
	constructor(projectile: ProjectileDefinition) {
		super()
		this.projectile = projectile
	}
}
ShooterComponent.register()
export default ShooterComponent