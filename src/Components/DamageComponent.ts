import { Component } from "../Globals/ECS";
class DamageComponent extends Component {
	amount: number = 0
	target: DamageType
	constructor(amount: number, target: DamageType) {
		super()
		this.amount = amount
		this.target = target
	}
}
DamageComponent.register()
export default DamageComponent