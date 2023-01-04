interface Coroutine {
	generator: Generator
	state: 'running' | 'stopped'
}
const Coroutines = new class {
	coroutines: Coroutine[] = []
	add(fn: () => Generator) {
		const generator = fn()
		generator.next()
		const coroutine: Coroutine = { generator, state: 'running' }
		this.coroutines.push(coroutine)
		return coroutine
	}
	run() {
		for (let i = this.coroutines.length - 1; i >= 0; i--) {
			if (this.coroutines[i].state == 'stopped') return
			const { done } = this.coroutines[i].generator.next()
			if (done) {
				this.coroutines.splice(i, 1)
			}
		}
	}
	stop() {
		this.coroutines.forEach(coroutine => {
			coroutine.state = 'stopped'
		})
	}
	resume() {
		this.coroutines.forEach(coroutine => {
			coroutine.state = 'running'
		})
	}
}

export default Coroutines