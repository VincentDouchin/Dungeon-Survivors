import Shader from './Shader'
import frag from './glsl/colors.frag?raw'
import vert from './glsl/main.vert?raw'

class ColorShader extends Shader {
	vert = vert
	frag = frag
	constructor(x: number, y: number, z: number, w: number, type: 'multiply' | 'add' = 'multiply') {
		super(() => ({
			color: [x, y, z, w],
			add: type === 'add',
			multiply: type === 'multiply'
		}))
	}
}
export default ColorShader