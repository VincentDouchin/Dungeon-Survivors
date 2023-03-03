import { Component } from "../Globals/ECS";
import { STATS } from "./StatsComponent";
import { Stat } from "../Game/Stat";

class ManaComponent extends Component {
	mana = 100
	maxMana = new Stat(100, STATS.MAX_MANA)
	manaCost = 20
	constructor() {
		super()
	}
}
ManaComponent.register()
export default ManaComponent