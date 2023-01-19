import { Component } from "../Globals/ECS";
class DamageComponent extends Component {
	amount: number = 0
	target: number[]
	destroyOnHit: number
	knockback: number
	constructor(amount: number, target: number[], destroyOnHit = -1, knockback = 0) {
		super()
		this.amount = amount
		this.target = target
		this.destroyOnHit = destroyOnHit
		this.knockback = knockback
	}
}
DamageComponent.register()
export default DamageComponent