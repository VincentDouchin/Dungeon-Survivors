import StatsComponent, { STATS } from "../Components/StatsComponent"

import LevelComponent from "../Components/LevelComponent"

class Stat {
	base: number
	name: STATS
	modifier?: StatsComponent
	level?: LevelComponent
	constructor(base: number = 0, name: STATS) {
		this.base = base
		this.name = name
	}
	setModifiers(modifier?: StatsComponent, level?: LevelComponent) {
		this.level = level
		this.modifier = modifier
	}
	get value() {
		return (this.base + (this.base * (this.level?.level ?? 0) * (this.modifier?.getLevelModifier(this.name) ?? 0))) * (1 + (this.modifier?.getModifier(this.name) ?? 0))
	}
}

export { Stat }