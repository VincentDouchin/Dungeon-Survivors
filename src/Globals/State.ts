

const State: {
	cameraBounds: {
		left?: number
		right?: number
		top?: number
		bottom?: number
	},
	timer: number,
	mobile: boolean
} = {
	cameraBounds: {
		left: undefined,
		right: undefined,
		top: undefined,
		bottom: undefined,
	},
	timer: 0,
	mobile: !!navigator.userAgentData?.mobile
}
export default State