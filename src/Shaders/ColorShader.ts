import { ShaderMaterial, Uniform } from "three"
import frag from './frag/colors.frag?raw'
import vert from './vert/main.vert?raw'
const ColorShader = (x: number, y: number, z: number, w: number) => {
	return new ShaderMaterial({
		vertexShader: vert,
		fragmentShader: frag,
		uniforms: {
			color: new Uniform([x, y, z, w])
		},
		transparent: true,

	})
}
export default ColorShader