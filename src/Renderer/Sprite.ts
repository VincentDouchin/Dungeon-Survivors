class Sprite {
	position: { x: number, y: number } = { x: 0, y: 0 }
	width: number
	height: number
	shaderPasses: Array<(...args: any[]) => Shader>
	constructor(width: number, height: number, shaderPasses: Array<(...args: any[]) => Shader>) {
		this.width = width
		this.height = height
		this.shaderPasses = shaderPasses
	}
}
export default Sprite