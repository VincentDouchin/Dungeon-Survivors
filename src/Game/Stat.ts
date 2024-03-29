import type StatsComponent from '../Components/StatsComponent'

import type LevelComponent from '../Components/LevelComponent'
import type { STATS } from '../Constants/Stats'

class Stat {
	base: number
	name: STATS
	modifier?: StatsComponent
	level?: LevelComponent
	constructor(base = 0, name: STATS) {
		this.base = base
		this.name = name
	}

	setModifiers(modifier?: StatsComponent, level?: LevelComponent) {
		this.level = level
		this.modifier = modifier
		return this
	}

	get value() {
		const levelModifer = this.base * ((this.level?.level ?? 0) * (this.modifier?.getLevelModifier(this.name) ?? 0))
		const statsModifier = this.base * (this.modifier?.getModifier(this.name) ?? 0)
		const flatBuff = this.modifier?.getFlat(this.name) ?? 0
		return this.base + levelModifer + statsModifier + flatBuff
	}
}

export { Stat }
