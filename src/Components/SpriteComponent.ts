import type { Material, Texture } from 'three'
import { Mesh, MeshBasicMaterial, NearestFilter, PlaneGeometry, RepeatWrapping, Uniform, WebGLRenderTarget } from 'three'

import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { Component } from '../Globals/ECS'
import RenderShader from '../Shaders/RenderShader'
import type Shader from '../Shaders/Shader'
import type Tile from '../Utils/Tile'
import { renderer } from '../Globals/Initialize'

class SpriteComponent extends Component {
	renderTarget: WebGLRenderTarget
	material: Material
	width: number
	height: number
	renderOrder: number
	scale: number
	effectComposer: EffectComposer
	texture: Texture
	baseTexture: Uniform
	shaderPasses: Map<Constructor<Shader>['name'], [ShaderPass, ShaderPass]> = new Map()
	mesh: Mesh
	opacity: number
	renderShader?: ShaderPass
	uniformsKeys: Record<string, string> = {}
	flipped: boolean
	uniforms = new Proxy<any>(this, {
		get(target, prop) {
			target.effectComposer.passes.find((pass: ShaderPass) => pass == target.shaderPasses.get(target.uniformsKeys[prop])[0]).uniforms[prop].value
		},
		set(target, prop, newValue) {
			target.effectComposer.passes.find((pass: ShaderPass) => pass == target.shaderPasses.get(target.uniformsKeys[prop])[0]).uniforms[prop].value = newValue
			target.render()
			return true
		},
	})

	constructor(tile: Tile, options?: { renderOrder?: number; scale?: number; shaders?: Shader[]; flipped?: boolean; opacity?: number }) {
		super()
		const newOptions = Object.assign({ renderOrder: 10, scale: 1, shaders: [], opacity: 1, flipped: false }, options)
		this.width = tile.width
		this.height = tile.height
		this.renderOrder = newOptions.renderOrder
		this.scale = newOptions.scale
		this.opacity = newOptions.opacity
		this.flipped = newOptions.flipped

		this.renderTarget = new WebGLRenderTarget(this.width, this.height)
		this.effectComposer = new EffectComposer(renderer, this.renderTarget)
		this.effectComposer.renderToScreen = false
		this.renderTarget.texture.minFilter = NearestFilter
		this.renderTarget.texture.magFilter = NearestFilter
		this.renderTarget.texture.wrapS = RepeatWrapping
		this.renderTarget.texture.wrapT = RepeatWrapping

		this.texture = this.renderTarget.texture
		this.baseTexture = new Uniform(tile.textures[0])
		this.renderShader = this.addShader(new RenderShader(tile.textures[0]), false)
		newOptions.shaders.forEach((shaderConstructor) => {
			this.addShader(shaderConstructor, false)
		})
		this.effectComposer.render()
		this.material = new MeshBasicMaterial({ map: this.renderTarget.texture, transparent: true })

		this.mesh = new Mesh(
			new PlaneGeometry(this.scaledWidth, this.scaledHeight),
			this.material,
		)
		this.mesh.renderOrder = this.renderOrder
	}

	addShader(shader: Shader, render = true) {
		if (this.shaderPasses.has(shader.constructor.name)) return
		const shaderMat = shader.create(this)
		shaderMat.uniforms.tDiffuse = this.baseTexture
		const pass = new ShaderPass(shaderMat)
		const copypass = new ShaderPass(CopyShader)
		this.shaderPasses.set(shader.constructor.name, [pass, copypass])
		Object.keys(pass.uniforms).forEach((name) => {
			this.uniformsKeys[name] = shader.constructor.name
		})
		pass.clear = true
		this.effectComposer.insertPass(pass, 1)
		this.effectComposer.insertPass(copypass, 2)
		if (render) this.render()
		return pass
	}

	getUniforms<T extends Shader>(shaderConstructor: Constructor<T>) {
		return this.shaderPasses.get(shaderConstructor.name)?.[0]?.uniforms as Record<keyof ReturnType<T['uniforms']>, Uniform>
	}

	removeShader(shaderConstructor: Constructor<Shader>) {
		const passes = this.shaderPasses.get(shaderConstructor.name)
		if (passes) {
			this.effectComposer.removePass(passes[0])
			this.effectComposer.removePass(passes[1])
			this.shaderPasses.delete(shaderConstructor.name)
			this.render()
		}
	}

	get scaledWidth() {
		return this.scale * this.width
	}

	get scaledHeight() {
		return this.scale * this.height
	}

	changeTexture(texture: Texture) {
		if (this.renderShader) {
			this.renderShader.uniforms.uTexture.value = texture
		}
		this.render()
	}

	destroy(): void {
		this.mesh.geometry.dispose()
		this.material.dispose()
		this.effectComposer.dispose()
		this.shaderPasses.forEach((shaderPasses) => {
			shaderPasses.forEach((pass) => {
				pass.dispose()
			})
		})
		this.renderTarget.dispose()
		this.mesh.removeFromParent()
	}

	render() {
		this.effectComposer.render()
	}
}
SpriteComponent.register()

export default SpriteComponent
