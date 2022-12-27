import { Component } from "../Globals/ECS";
class DamageComponent extends Component {
	amount: number = 0
	target: number
	constructor(amount: number, target: number) {
		super()
		this.amount = amount
		this.target = target
	}
}
DamageComponent.register()
export default DamageComponent