import StatsComponent, { STATS } from "../Components/StatsComponent"

class Stat {
	base: number
	name: STATS
	modifier?: StatsComponent
	constructor(base: number = 0, name: STATS) {
		this.base = base
		this.name = name
	}
	get value() {
		if (!this.modifier) return this.base
		return this.modifier.get(this.name, this.base)
	}
}

export { Stat }