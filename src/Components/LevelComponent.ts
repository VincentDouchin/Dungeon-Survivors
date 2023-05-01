import { Component } from '../Globals/ECS'
import State from '../Globals/State'
import DIFFICULTY from './../Constants/DIfficulty'
class LevelComponent extends Component {
	xp = 0
	level = 0
	difficulty = {
		[DIFFICULTY.EASY]: 15,
		[DIFFICULTY.NORMAL]: 20,
		[DIFFICULTY.HARD]: 25,
	}[State.difficulty ?? DIFFICULTY.EASY]

	constructor() {
		super()
	}

	nextLevel(level = this.level) {
		return level ** 0.7 * this.difficulty + 25
	}
}
LevelComponent.register()
export default LevelComponent
