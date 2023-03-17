import DIFFICULTY from "../Constants/DIfficulty"
import { HeroDefinition } from "../Constants/Heros"
import { Skill } from "../Constants/Skills"

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
	selectedTiles: number[],
	skills: Skill[]
	difficulty: DIFFICULTY | null
}
const blanckState: State = {
	cameraBounds: {
		left: undefined,
		right: undefined,
		top: undefined,
		bottom: undefined,
	},
	heros: new Set(),
	selectedTiles: [],
	timer: 0,
	mobile: !!navigator.userAgentData?.mobile,
	skills: [],
	difficulty: null

}
let State: State = structuredClone(blanckState)
export const resetState = () => State = structuredClone(blanckState)
export default State