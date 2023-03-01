import { HeroDefinition } from "../Constants/Heros"

const State: {
	cameraBounds: {
		left?: number
		right?: number
		top?: number
		bottom?: number
	},
	timer: number,
	mobile: boolean,
	volume: number,
	heros: HeroDefinition[],
	selectedTiles: number[],
} = {
	cameraBounds: {
		left: undefined,
		right: undefined,
		top: undefined,
		bottom: undefined,
	},
	heros: [],
	selectedTiles: [],
	timer: 0,
	mobile: !!navigator.userAgentData?.mobile,
	volume: 0.1
}
export default State