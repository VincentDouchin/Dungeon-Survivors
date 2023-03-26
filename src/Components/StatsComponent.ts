import { Component } from '../Globals/ECS'

export enum STATS {
	ATTACK_SPEED = 'ATTACK_SPEED',
	SPEED = 'SPEED',
	DAMAGE = 'DAMAGE',
	CRIT_DAMAGE = 'CRIT_DAMAGE',
	CRIT_CHANCE = 'CRIT_CHANCE',
	KNOCKBACK = 'KNOCKBACK',
	XP_MDOIFIER = 'XP_MDOIFIER',
	DEFENSE = 'DEFENSE',
	MAX_HEALTH = 'MAX_HEALTH',
	MAX_MANA = 'MAX_MANA',
	SPELL_DAMAGE = 'SPELL_DAMAGE',

}
export interface BoostModifier {
	stat: STATS
	duration: number
	modifier: number
}
class StatsComponent extends Component {
	stats: Map<STATS, { levelModifier: number; modifier: number }> = new Map()
	boosts: BoostModifier[] = []
	getemptyStat = () => ({ levelModifier: 0, modifier: 0 })
	constructor() {
		super()
	}

	set(statName: STATS, levelModifier = 0) {
		this.stats.set(statName, this.getemptyStat())
		const stat = this.stats.get(statName)
		if (!stat) return
		stat.levelModifier = levelModifier
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
		const boost = this.boosts.reduce((acc, boostModifier) => boostModifier.stat === statName ? acc + boostModifier.modifier : acc, 0)
		return stat.modifier + boost
	}

	getLevelModifier(statName: STATS) {
		return this.stats.get(statName)?.levelModifier ?? 0
	}
}
StatsComponent.register()
export default StatsComponent
