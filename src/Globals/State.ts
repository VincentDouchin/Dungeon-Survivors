import type DIFFICULTY from '../Constants/DIfficulty'
import type { HeroDefinition } from '../Constants/Heros'
import type { Skill } from '../Constants/Skills'
import type { InputController } from './InputManager'

interface State {
	cameraBounds: {
		left?: number
		right?: number
		top?: number
		bottom?: number
	}
	timer: number
	mobile: boolean
	heros: Set<HeroDefinition>
	skills: Skill[]
	difficulty: DIFFICULTY | null
	multiplayer: boolean | null
	multiplayerControls: [null | InputController, null | InputController]
}
const blanckState: State = {
	cameraBounds: {
		left: undefined,
		right: undefined,
		top: undefined,
		bottom: undefined,
	},
	heros: new Set(),
	timer: 0,
	mobile: !!navigator.userAgentData?.mobile,
	skills: [],
	difficulty: null,
	multiplayer: null,
	multiplayerControls: [null, null],

}
let State: State = structuredClone(blanckState)
export const resetState = () => State = structuredClone(blanckState)
export default State
