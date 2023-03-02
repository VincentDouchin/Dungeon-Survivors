
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
	constructor(fn: () => Generator) {
		this.generator = fn()
		this.generator.next()
		Coroutine.coroutines.push(this)
	}
	toggle() {
		this.running = !this.running
	}
	resume() {
		this.running = true
	}
	stop() {
		this.running = false
	}
}
export default Coroutine