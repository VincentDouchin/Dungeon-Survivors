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
	heros: Set<HeroDefinition>
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
	heros: new Set(),
	timer: 0,
	mobile: Boolean(navigator.userAgentData?.mobile) || Boolean(navigator.userAgent.match(/iPhone/i)),
	skills: [],
	difficulty: null,
	multiplayer: false,
	multiplayerControls: [null, null],

}

export default State
