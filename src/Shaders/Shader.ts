import { ShaderMaterial, Uniform } from 'three'

import type SpriteComponent from '../Components/SpriteComponent'

class Shader {
	uniforms: (sprite: SpriteComponent) => Record<string, unknown>
	vert = ''
	frag = ''
	constructor(uniforms: (sprite: SpriteComponent) => Record<string, unknown>) {
		this.uniforms = uniforms
	}

	create(sprite: SpriteComponent) {
		const mat = new ShaderMaterial({
			transparent: true,
			vertexShader: this.vert,
			fragmentShader: this.frag,
			uniforms: Object.fromEntries(Object.entries(this.uniforms(sprite)).map(([key, val]) => [key, new Uniform(val)])),
		})
		return mat
	}
}
export default Shader
