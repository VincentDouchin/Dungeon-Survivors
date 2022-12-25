import { Component } from "../Globals/ECS";

class DamageComponent extends Component {
	amount: number = 0
	constructor(amount: number) {
		super()
		this.amount = amount
	}
}
DamageComponent.register()
export default DamageComponent