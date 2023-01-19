import { CanvasTexture, NearestFilter, ShaderMaterial, Uniform } from "three";
import frag from './frag/main.frag?raw';
import vert from './vert/main.vert?raw';
const RenderShader = (image: HTMLImageElement | HTMLCanvasElement) => {
	const texture = new CanvasTexture(image)
	texture.minFilter = NearestFilter
	texture.magFilter = NearestFilter
	return new ShaderMaterial({
		uniforms: {
			uTexture: new Uniform(texture),
		},
		vertexShader: vert,
		fragmentShader: frag,
		transparent: true,

	})
}

export default RenderShader