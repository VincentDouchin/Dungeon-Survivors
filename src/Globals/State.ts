import type DIFFICULTY from '../Constants/DIfficulty'
import type { HeroDefinition } from '../Constants/Heros'
import type { Skill } from '../Constants/Skills'
import type { InputController } from '../InputControllers/InputController'

const State: {
	cameraBounds: {
		left?: number
		right?: number
		top?: number
		bottom?: number
	}
	timer: number
	mobile: boolean
	heros: HeroDefinition[]
	skills: Skill[]
	difficulty: DIFFICULTY | null
	multiplayer: boolean
	multiplayerControls: [null | InputController, null | InputController]
} = {
	cameraBounds: {
		left: undefined,
		right: undefined,
		top: undefined,
		bottom: undefined,
	},
	heros: [],
	timer: 0,
	mobile: Boolean(navigator.userAgentData?.mobile) || Boolean(navigator.userAgent.match(/iPhone/i)) || Boolean(navigator.userAgent.match(/Android/i)),
	skills: [],
	difficulty: null,
	multiplayer: false,
	multiplayerControls: [null, null],

}

export default State
