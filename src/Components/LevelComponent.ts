import { Component } from "../Globals/ECS";

class LevelComponent extends Component {
	xp = 0
	level = 0
	constructor() {
		super()
	}
	nextLevel(level = this.level) {
		return Math.pow(level / 4, 0.4) * 20 + 10
	}
}
LevelComponent.register()
export default LevelComponent