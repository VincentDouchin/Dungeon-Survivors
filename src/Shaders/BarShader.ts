import { Texture } from 'three'
import Shader from './Shader'
import vert from './glsl/main.vert?raw'
import frag from './glsl/bar.frag?raw'
class BarShader extends Shader {
	vert = vert
	frag = frag
	constructor(fullTexture: Texture, initialValue?: number) {
		super((sprite) => ({
			fullTexture,
			percent: initialValue ?? 1,
			width: sprite.width
		}))
	}
}
export default BarShader