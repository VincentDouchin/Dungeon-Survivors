import vert from './glsl/position.vert?raw'
import frag from './glsl/position.frag?raw'
import Renderer from '../Renderer/Renderer'
const RenderShader = (image: HTMLImageElement | HTMLCanvasElement) => (r: Renderer): Shader => {
	return {
		uuid: '1',
		vert,
		frag,
		uniforms: {
			texture: {
				type: 'sampler2D',
				value: r.texture(image)
			},
		}
	}
}

export default RenderShader