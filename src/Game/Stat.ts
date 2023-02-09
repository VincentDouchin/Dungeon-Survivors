class Stat {
	base: number
	modifier: StatModifier | null = null
	constructor(base: number = 0) {
		this.base = base
	}
	get value() {
		if (!this.modifier) return this.base
		return this.modifier.calculateValue(this.base)
	}
}
class StatModifier {
	percent: number = 1
	level: number = 0
	increment: number
	constructor(increment: number = 0) {
		this.increment = increment
	}
	calculateValue(base: number) {
		return (base + (base * this.increment * this.level)) * this.percent
	}
}
export { Stat, StatModifier }