import { CanvasTexture } from 'three'
import Shader from './Shader'
import frag from './glsl/main.frag?raw'
import vert from './glsl/main.vert?raw'

class RenderShader extends Shader {
	vert = vert
	frag = frag
	constructor(texture: CanvasTexture) {
		super(() => ({
			uTexture: texture,
		}))
	}
}

export default RenderShader