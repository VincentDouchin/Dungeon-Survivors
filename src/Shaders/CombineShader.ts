import { ShaderMaterial, Texture, Uniform } from "three";
import mainVert from './vert/main.vert?raw'
import combineFrag from './frag/combine.frag?raw'
const CombineShader = (texture1: Texture, texture2: Texture) => {
	const material = new ShaderMaterial({
		uniforms: {
			texture1: new Uniform(texture1),
			texture2: new Uniform(texture2),
		},
		vertexShader: mainVert,
		fragmentShader: combineFrag
	})
	material.transparent = true
	return material
}
export default CombineShader