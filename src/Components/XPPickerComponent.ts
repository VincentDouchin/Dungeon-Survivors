import { Component } from '../Globals/ECS'
import { Stat } from '../Game/Stat'
import { STATS } from './StatsComponent'

class XPPickerComponent extends Component {
	xpModifier = new Stat(1, STATS.XP_MDOIFIER)
	bodyCreated = false
	constructor() {
		super()
	}
}
XPPickerComponent.register()
export default XPPickerComponent
