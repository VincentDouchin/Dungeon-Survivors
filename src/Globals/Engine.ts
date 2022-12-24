
const Engine = new class {
	rafHandle = 0
	accumulatedTime = 0
	currentTime = 0
	timeStep = 1000 / 60
	state?: GameState
	states: Map<string, GameState> = new Map()

	cycle = (timeStamp: number) => {

		if (!this.state) return
		this.rafHandle = window.requestAnimationFrame(this.cycle)

		this.accumulatedTime += timeStamp - this.currentTime
		this.currentTime = timeStamp;

		let updated = false

		if (this.accumulatedTime > 60) this.accumulatedTime = this.timeStep

		while (this.accumulatedTime >= this.timeStep) {
			this.state.update()
			updated = true
			this.accumulatedTime -= this.timeStep
		}
		if (updated) {
			this.state.render()
		}
	}
	start() {
		this.rafHandle = window.requestAnimationFrame(this.cycle)
	}
	stop() {
		window.cancelAnimationFrame(this.rafHandle)
	}
	addState(stateName: string, state: GameState) {
		this.states.set(stateName, state)
	}
	setState(stateName: string) {
		this.state = this.states.get(stateName)
	}
}
export default Engine