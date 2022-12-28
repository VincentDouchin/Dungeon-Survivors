const Coroutines = new class {
	coroutines: Generator[] = []
	add(fn: () => Generator) {
		const generator = fn()
		generator.next()
		this.coroutines.push(generator)
	}
	run() {
		for (let i = this.coroutines.length - 1; i >= 0; i--) {
			const { done } = this.coroutines[i].next()
			if (done) {
				this.coroutines.splice(i, 1)
			}
		}
	}
}

export default Coroutines