import screenFrag from './../Shaders/glsl/screen.frag?raw'
import screenVert from './../Shaders/glsl/screen.vert?raw'
import Scene from './Scene'
class Renderer {
	gl: WebGLRenderingContext
	canvas: HTMLCanvasElement
	shaders: Map<string, CompiledShader> = new Map()
	width: number
	height: number
	fbo: WebGLFramebuffer
	fboTexture: WebGLTexture
	renderer: WebGLProgram
	textureIndex: Map<HTMLImageElement | HTMLCanvasElement, number> = new Map()
	textures: Map<number, WebGLTexture> = new Map()
	lastTextureIndex = 1
	constructor(width?: number, height?: number) {
		this.canvas = document.createElement('canvas')!
		this.width = width ?? window.innerWidth
		this.height = height ?? window.innerHeight
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.gl = this.canvas.getContext('webgl')!
		const [fbo, fboTexture] = this.createFbo(this.width, this.height)
		this.fbo = fbo
		this.fboTexture = fboTexture
		const vert = this.loadShader(screenVert, this.gl.VERTEX_SHADER)
		const frag = this.loadShader(screenFrag, this.gl.FRAGMENT_SHADER)
		this.renderer = this.createProgram([vert, frag])!
		this.gl.disable(this.gl.DEPTH_TEST)
		this.gl.enable(this.gl.BLEND)
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
	}

	setupTextureParameters() {
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
	}
	createFbo = (w: number, h: number) => {
		const texture = this.gl.createTexture()
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, w, h, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null)
		this.setupTextureParameters()

		const fbo = this.gl.createFramebuffer()
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo)
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0)

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)

		return [fbo!, texture!]
	}
	texture(image: HTMLImageElement | HTMLCanvasElement) {
		const texture = this.gl.createTexture()!
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image)
		this.setupTextureParameters()
		this.lastTextureIndex++
		return this.lastTextureIndex - 1
	}
	getShader(shader: Shader): CompiledShader {
		if (shader?.uuid) {
			// console.log('shader exists')
			return this.shaders.get(shader.uuid)!
		}
		this.shaders.forEach((compiledShader, uuid) => {
			if (compiledShader.vert == shader.vert && compiledShader.frag == shader.frag) {
				shader.uuid = uuid
				// console.log('shader exists not assigned')
				return compiledShader
			}
		})
		// console.log('shader doesn\'t exist')
		const vert = this.loadShader(shader.vert, this.gl.VERTEX_SHADER)
		const frag = this.loadShader(shader.frag, this.gl.FRAGMENT_SHADER)
		const program = this.createProgram([vert, frag])!
		this.gl.useProgram(program)
		this.gl.uniform2f(this.gl.getUniformLocation(program, 'resolution'), this.width, this.height)
		const uuid = window.crypto.randomUUID()
		const compiledProgram = {
			...shader,
			program

		}
		this.shaders.set(uuid, compiledProgram)
		return compiledProgram
	}
	setUniforms(compiledShader: CompiledShader) {
		if (!compiledShader?.uniforms) return
		Object.entries(compiledShader.uniforms).forEach(([name, { type, value }]: [string, Uniform]) => {
			const location = this.gl.getUniformLocation(compiledShader.program, name)
			switch (type) {
				case 'vec4': {
					const val = value as [number, number, number, number]
					this.gl.uniform4f(location, ...val)
				}; break
				case 'mat3': {
					this.gl.uniformMatrix3fv(location, false, value)
				}; break
				case 'sampler2D': {
					const textureIndex = this.textureIndex.get(value) ?? this.texture(value)
					this.gl.uniform1i(location, textureIndex)

				}
			}
		})
	}
	loadShader(shaderSource: string, shaderType: number) {
		const shader = this.gl.createShader(shaderType)!
		this.gl.shaderSource(shader, shaderSource)
		this.gl.compileShader(shader)
		const compiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)

		if (!compiled) {
			console.error('Failed to compile shader')
			this.gl.deleteShader(shader)
		}

		return shader
	}
	createProgram(shaders: [WebGLShader, WebGLShader]) {
		const program = this.gl.createProgram()!

		shaders.forEach((shader) => {
			this.gl.attachShader(program, shader)
		})

		this.gl.linkProgram(program)

		const linked = this.gl.getProgramParameter(program, this.gl.LINK_STATUS)
		if (!linked) {
			const lastError = this.gl.getProgramInfoLog(program)
			console.error(lastError)
			this.gl.deleteProgram(program)
			return
		}

		this.setupBuffers(program)
		return program
	}
	setupBuffers = (shader: WebGLProgram) => {
		const buffer = this.gl.createBuffer()
		const positionLocation = this.gl.getAttribLocation(shader, 'position')

		const vertices = new Float32Array([
			0, 1,
			1, 0,
			0, 0,
			0, 1,
			1, 1,
			1, 0,
		])

		this.gl.enableVertexAttribArray(positionLocation)
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
		this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW)
		this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0)
	}

	render(scene: Scene) {

		this.gl.useProgram(this.renderer)
		// this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo)
		this.gl.clearColor(0.027, 0.031, 0.08, 1)
		this.gl.clear(this.gl.COLOR_BUFFER_BIT)
		scene.sprites.forEach(sprite => {
			sprite.shaderPasses.forEach(shaderPass => {

				const shader = shaderPass(sprite)
				const compiledShader = this.getShader(shader)
				this.gl.useProgram(compiledShader.program)
				this.setUniforms(compiledShader)
				this.gl.viewport(sprite.position.x + this.width / 2 - sprite.width / 2, sprite.position.y + this.height / 2 - sprite.height / 2, sprite.width, sprite.height)
				this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 6)
			})
		})

		this.gl.viewport(0, 0, this.width, this.height)
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
		this.gl.useProgram(this.renderer)
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.fboTexture)
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 6)
	}
}
export default Renderer