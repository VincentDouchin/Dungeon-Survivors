import Coroutines from "./Coroutines"
import { GameStates } from "../Constants/GameStates"

const Engine = new class {
	rafHandle = 0
	accumulatedTime = 0
	currentTime = 0
	timeStep = 1000 / 60
	stateName?: GameStates
	states: Map<GameStates, GameState> = new Map()
	get state() {
		return this.stateName ? this.states.get(this.stateName) : null
	}
	cycle = (timeStamp: number) => {

		if (!this.state) return
		this.rafHandle = window.requestAnimationFrame(this.cycle)

		this.accumulatedTime += timeStamp - this.currentTime
		this.currentTime = timeStamp;

		let updated = false

		if (this.accumulatedTime > 60) {
			this.accumulatedTime = this.timeStep
			console.log('frame skipped')
		}

		while (this.accumulatedTime >= this.timeStep) {
			Coroutines.run()
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
	addState(stateName: GameStates, state: GameState) {
		this.states.set(stateName, state)
	}
	setState(stateName: GameStates, options?: any) {
		const oldState = this.stateName
		if (this.state) {
			this.state.unset(stateName)
		}
		this.stateName = stateName
		this.state?.set(oldState, options)
	}
}
export default Engine