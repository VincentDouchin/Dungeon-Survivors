import { Component } from '../Globals/ECS'
import { Stat } from '../Game/Stat'
import { STATS } from '../Constants/Stats'

class ManaComponent extends Component {
	mana = 100
	maxMana = new Stat(100, STATS.MAX_MANA)
	manaCost = 20
	constructor() {
		super()
	}

	fill() {
		this.mana = this.maxMana.value
	}
}
ManaComponent.register()
export default ManaComponent
