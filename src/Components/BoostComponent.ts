import type { Boost } from '../Constants/Boosts'
import type { STATS } from '../Constants/Stats'
import { Component } from '../Globals/ECS'

class BoostComponent extends Component {
	stat: STATS
	duration: number
	modifier: number
	color: [number, number, number, number]
	constructor(boost: Boost) {
		super()
		this.modifier = boost.modifier
		this.duration = boost.duration
		this.stat = boost.stat
		this.color = boost.color
	}
}
BoostComponent.register()
export default BoostComponent
