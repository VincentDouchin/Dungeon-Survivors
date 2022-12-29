import { Component } from "../Globals/ECS";
class DamageComponent extends Component {
	amount: number = 0
	target: number[]
	destroyOnHit: number
	constructor(amount: number, target: number[], destroyOnHit = -1) {
		super()
		this.amount = amount
		this.target = target
		this.destroyOnHit = destroyOnHit
	}
}
DamageComponent.register()
export default DamageComponent