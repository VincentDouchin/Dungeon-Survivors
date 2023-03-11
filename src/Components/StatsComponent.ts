import { Component } from "../Globals/ECS";

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
	stats: Map<STATS, { levelModifier: number, modifier: number }> = new Map()
	boosts: BoostModifier[] = []
	xp = 0
	level = 0
	nextLevel = 20
	getemptyStat = () => ({ levelModifier: 0, modifier: 0 })
	constructor(level = 0) {
		super()
		this.level = level
	}
	set(statName: STATS, levelModifier: number = 0) {
		this.stats.set(statName, this.getemptyStat())
		this.stats.get(statName)!.levelModifier = levelModifier
		return this
	}
	setModifier(statName: STATS, modifier: number = 0) {
		if (!this.stats.has(statName)) {
			this.stats.set(statName, this.getemptyStat())
		}
		this.stats.get(statName)!.modifier += modifier
	}
	get(statName: STATS, base: number) {
		const stat = this.stats.get(statName) ?? this.getemptyStat()
		const boost = this.boosts.reduce((acc, boostModifier) => boostModifier.stat === statName ? acc + boostModifier.modifier : acc, 0)
		return (base + (base * this.level * stat.levelModifier)) * (1 + stat.modifier + boost)
	}
	updateXP(amount: number) {
		this.xp += amount
		const levelUp = Math.floor(this.xp / this.nextLevel)
		if (levelUp > 0) {
			for (let i = 0; i < levelUp; i++) {
				this.xp = this.xp % this.nextLevel
				this.nextLevel = Math.ceil(10 * (1 + Math.log(this.level + 2) * 5))
				this.level++
			}
		}
		return this.level
	}

}
StatsComponent.register()
export default StatsComponent