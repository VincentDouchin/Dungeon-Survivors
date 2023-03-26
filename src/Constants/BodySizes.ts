export interface bodySize {
	width: number
	height: number
}
const BODYSIZES: Record<string, bodySize> = {
	small: {
		width: 10,
		height: 10,
	},
	normal: {
		width: 12,
		height: 19,
	},
	big: {
		width: 18,
		height: 30,
	},
	square: {
		width: 16,
		height: 16,
	},
	centaur: {
		width: 18,
		height: 22,
	},
	massive: {
		width: 30,
		height: 22,
	},
	giant: {
		width: 32,
		height: 32,
	},
	wide: {
		width: 22,
		height: 16,
	},
}
export default BODYSIZES
