
class Coroutine {
	static coroutines: Coroutine[] = []

	static run() {
		for (let i = this.coroutines.length - 1; i >= 0; i--) {
			if (!this.coroutines[i].running) continue
			const { done } = this.coroutines[i].generator.next()
			if (done) {
				this.coroutines.splice(i, 1)
			}
		}
	}
	generator: Generator
	running: boolean = true
	constructor(fn: (args: number) => Generator, duration?: number) {
		const generatorFunction =
			duration
				? function* () {
					for (let i = 0; i < duration; i++) {
						yield* fn(i)
					}
				}
				: fn
		this.generator = generatorFunction(0)
		this.generator.next()
		Coroutine.coroutines.push(this)
	}
	toggle() {
		this.running = !this.running
	}
	resume() {
		this.running = true
	}
	pause() {
		this.running = false
	}
	stop() {
		Coroutine.coroutines.splice(Coroutine.coroutines.indexOf(this), 1)
	}

}
export default Coroutine