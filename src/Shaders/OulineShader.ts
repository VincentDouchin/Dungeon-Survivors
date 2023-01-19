import { CanvasTexture, NearestFilter, ShaderMaterial, Uniform } from "three";
import frag from './frag/outline.frag?raw';
import vert from './vert/main.vert?raw';
const OulineShader = (x: number, y: number, color: [number, number, number, number] = [1, 1, 1, 1]) => {
	return new ShaderMaterial({
		uniforms: {
			size: new Uniform([64, 28]),
			color: new Uniform(color)
		},
		vertexShader: vert,
		fragmentShader: frag,
		transparent: true,
	})
}

export default OulineShader