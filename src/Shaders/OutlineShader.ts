import Shader from './Shader'
import frag from './glsl/outline.frag?raw'
import vert from './glsl/main.vert?raw'

class OutlineShader extends Shader {
	vert = vert
	frag = frag
	constructor(color?: [number, number, number, number]) {
		super(sprite => ({
			size: [sprite.width, sprite.height],
			color: color ?? [1, 1, 1, 1],
		}))
	}
}

export default OutlineShader
