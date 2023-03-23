import { Component } from '../Globals/ECS'

class TokenComponent extends Component {
	amount = 1
	constructor() {
		super()
	}
}
TokenComponent.register()
export default TokenComponent