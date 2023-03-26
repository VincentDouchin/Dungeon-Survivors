import { Component } from '../Globals/ECS'

class HealthRegenComponent extends Component {
	amount: number
	timer: number
	time: number
	constructor(amount: number, timer: number) {
		super()
		this.amount = amount
		this.timer = timer
		this.time = timer
	}
}
HealthRegenComponent.register()
export default HealthRegenComponent
