import frag from './glsl/colors.frag?raw'
import Shader from "./Shader"
import vert from './glsl/main.vert?raw'

class ColorShader extends Shader {
	vert = vert
	frag = frag
	constructor(x: number, y: number, z: number, w: number) {
		super(() => ({
			color: [x, y, z, w]
		}))
	}
}
export default ColorShader