import HEROS, { HeroDefinition } from './../Constants/Heros'

import { Arenas } from '../../assets/map/Map'
import Coroutine from "./Coroutine"
import { enemyWaveName } from './../Constants/EnemyEncounters'

export interface GameState {
	update(): void
	render(): void
	set(state: Constructor<GameState> | null, options?: any): void
	unset(state: Constructor<GameState> | null): void
}

export const DEBUG: {
	ENCOUNTER: boolean
	DEFAULT_ENEMIES: enemyWaveName
	DEFAULT_BACKGROUND: Arenas
	DEFAULT_HEROS: [HeroDefinition, HeroDefinition]
} = {
	ENCOUNTER: false && import.meta.env.DEV,
	DEFAULT_ENEMIES: 'ANIMALS',
	DEFAULT_BACKGROUND: 'TOWN',
	DEFAULT_HEROS: [HEROS[2], HEROS[2]],
}
class Engine {
	rafHandle = 0
	accumulatedTime = 0
	currentTime = 0
	timeStep = 1000 / 60
	states: Map<Constructor<GameState>['name'], GameState> = new Map()
	state: GameState | null = null
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
			this.state.update()
			Coroutine.run()
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
	addState<T extends GameState>(state: Constructor<T>) {
		this.states.set(state.name, new state())
	}
	getState<T extends GameState>(state: Constructor<T>) {
		return this.states.get(state.constructor.name) as T
	}
	setState<T extends GameState>(state: Constructor<T>, options?: any) {
		const currentState = this.state === null ? null : this.state.constructor as Constructor<GameState>
		this.state?.unset(state)
		const newState = this.states.get(state.name)
		if (newState) {
			this.state = newState
		}
		debugger
		this.state?.set(currentState, options)
	}
}
export default Engine