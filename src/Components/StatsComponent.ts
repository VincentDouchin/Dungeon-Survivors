import { UIEVENTS } from '../Constants/Events'
import SKILLS from '../Constants/Skills'
import type { STATS } from '../Constants/Stats'
import { Component, ECS } from '../Globals/ECS'

interface BoostModifier {
	stat: STATS
	duration: number
	modifier: number
	flat?: number
	identifier?: string
}
class StatsComponent extends Component {
	stats: Map<STATS, { levelModifier: number; modifier: number }> = new Map()
	buffs: BoostModifier[] = []
	getemptyStat = () => ({ levelModifier: 0, modifier: 0 })
	constructor() {
		super()
	}

	set(statName: STATS, levelModifier = 0) {
		this.stats.set(statName, this.getemptyStat())
		const stat = this.stats.get(statName)
		stat!.levelModifier = levelModifier
		return this
	}

	setModifier(statName: STATS, modifier = 0) {
		if (!this.stats.has(statName)) {
			this.stats.set(statName, this.getemptyStat())
		}
		const stat = this.stats.get(statName)
		if (!stat) return
		stat.modifier += modifier
	}

	getModifier(statName: STATS) {
		const stat = this.stats.get(statName) ?? this.getemptyStat()
		const boost = this.buffs.reduce((acc, boostModifier) => boostModifier.stat === statName ? acc + boostModifier.modifier : acc, 0)
		return stat.modifier + boost
	}

	getFlat(statName: STATS) {
		return this.buffs.reduce((acc, boostModifier) => boostModifier.stat === statName ? acc + (boostModifier.flat ?? 0) : acc, 0)
	}

	getLevelModifier(statName: STATS) {
		return this.stats.get(statName)?.levelModifier ?? 0
	}

	addBuff(buff: BoostModifier) {
		const existingBuff = this.buffs.find(existingBuff => existingBuff.identifier === buff.identifier)
		if (existingBuff && buff.identifier) {
			existingBuff.duration = buff.duration
		} else {
			this.buffs.push(buff)
			ECS.eventBus.publish(UIEVENTS.DISPLAY_BOOST, this)
		}
	}

	setFromProgress(statNames: STATS[]) {
		statNames.forEach((name) => {
			this.setModifier(name, SKILLS.find(skill => skill.name === name)?.amount)
		})
	}
}
StatsComponent.register()
export default StatsComponent
