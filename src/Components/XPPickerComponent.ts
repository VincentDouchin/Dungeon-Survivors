import { Component } from "../Globals/ECS";
import { STATS } from "./StatsComponent";
import { Stat } from "../Game/Stat";

class XPPickerComponent extends Component {
	xpModifier = new Stat(1, STATS.XP_MDOIFIER)
	constructor() {
		super()

	}
}
XPPickerComponent.register()
export default XPPickerComponent