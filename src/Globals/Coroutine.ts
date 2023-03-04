class Coroutine {
	static coroutines: Coroutine[] = []

	static run() {
		for (let i = Coroutine.coroutines.length - 1; i >= 0; i--) {
			if (!Coroutine.coroutines[i].running) continue
			if (Coroutine.coroutines[i].toStop) {
				Coroutine.coroutines.splice(i, 1)
				continue
			}
			if (!Coroutine.coroutines[i]?.generator) debugger
			const { done } = Coroutine.coroutines[i].generator.next()
			if (done) {
				Coroutine.coroutines.splice(i, 1)
			}
		}
	}
	generator: Generator
	running: boolean = true
	toStop = false
	constructor(fn: (args: number) => Generator, duration?: number) {
		const generatorFunction =
			duration
				? function* () {
					for (let i = 0; i < duration - 1; i++) {
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
		this.toStop = true
	}

}
export default Coroutine