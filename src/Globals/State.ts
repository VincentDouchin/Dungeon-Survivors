

const State: {
	cameraBounds: {
		left?: number
		right?: number
		top?: number
		bottom?: number
	},
	timer: number,
	mobile: boolean,
	volume: number
} = {
	cameraBounds: {
		left: undefined,
		right: undefined,
		top: undefined,
		bottom: undefined,
	},
	timer: 0,
	mobile: !!navigator.userAgentData?.mobile,
	volume: 0.1
}
export default State