class Stat {
	base: number
	modifier: StatModifier | null = null
	constructor(base: number = 0) {
		this.base = base
	}
	get value() {
		if (!this.modifier) return this.base
		return (this.base + this.modifier.flat) * this.modifier.percent
	}


}
class StatModifier {
	flat: number = 0
	percent: number = 1
	addPercent(amount: number) {
		this.percent += amount
	}
	addFlat(amount: number) {
		this.flat += amount
	}
}
export { Stat, StatModifier }