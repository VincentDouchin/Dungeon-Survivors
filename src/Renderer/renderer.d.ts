interface Uniform {
	type: 'sampler2D' | 'vec2' | 'vec3' | 'mat3' | 'vec4'
	value: any | any[]
}


interface Shader {
	vert: string
	frag: string
	uniforms?: Record<string, Uniform>
	uuid?: string
}
interface CompiledShader extends Shader {

	program: WebGLProgram
}