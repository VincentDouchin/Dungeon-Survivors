import ShaderPass from "./ShaderPass"

class Sprite {
	position: { x: number, y: number } = { x: 0, y: 0 }
	width: number
	height: number
	shaderPasses: Array<(...args: any[]) => Shader>
	fbo?: WebGLFramebuffer
	fboTexture?: WebGLTexture
	constructor(width: number, height: number, shaderPasses: Array<(...args: any[]) => Shader>) {
		this.width = width
		this.height = height
		this.shaderPasses = shaderPasses
	}
}
export default Sprite
// export const sprite = (tile: number[], tileOffset: number, x: number, y: number, transforms: (number | undefined)[] = []) => {

//   }