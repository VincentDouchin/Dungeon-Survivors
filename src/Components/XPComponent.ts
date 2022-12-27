import { Component } from "../Globals/ECS";

class XPComponent extends Component {
	amount: number
	constructor(amount: number = 1) {
		super()
		this.amount = amount
	}
}
XPComponent.register()
export default XPComponent