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
	REGEN = 'REGEN',
}
export interface BoostModifier {
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
		}
	}
}
StatsComponent.register()
export default StatsComponent
