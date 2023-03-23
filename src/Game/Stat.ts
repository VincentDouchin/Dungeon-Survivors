import StatsComponent, { STATS } from '../Components/StatsComponent'

import LevelComponent from '../Components/LevelComponent'

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
	}
	get value() {
		const levelModifer = this.base * ((this.level?.level ?? 0) * (this.modifier?.getLevelModifier(this.name) ?? 0))
		const statsModifier = this.base * (this.modifier?.getModifier(this.name) ?? 0)
		return this.base + levelModifer + statsModifier
	}
}

export { Stat }