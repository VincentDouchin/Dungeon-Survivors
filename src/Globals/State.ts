import DIFFICULTY from '../Constants/DIfficulty'
import { HeroDefinition } from '../Constants/Heros'
import { InputController } from './InputManager'
import { Skill } from '../Constants/Skills'

interface State {
	cameraBounds: {
		left?: number
		right?: number
		top?: number
		bottom?: number
	},
	timer: number,
	mobile: boolean,
	heros: Set<HeroDefinition>,
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
	multiplayerControls: [null, null]

}
let State: State = structuredClone(blanckState)
export const resetState = () => State = structuredClone(blanckState)
export default State