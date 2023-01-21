import { Material, Mesh, MeshStandardMaterial, NearestFilter, PlaneGeometry, RepeatWrapping, Texture, Uniform, WebGLRenderTarget } from "three";

import { Component } from "../Globals/ECS";
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import RenderShader from "../Shaders/RenderShader";
import Shader from "../Shaders/Shader";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import Tile from "../Utils/Tile";
import { renderer } from "../Globals/Initialize";

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
	shaderPasses: Map<string, ShaderPass> = new Map()
	mesh: Mesh
	uniformsKeys: Record<string, string> = {}
	uniforms = new Proxy<any>(this, {
		get(target, prop) {
			target.effectComposer.passes.find((pass: ShaderPass) => pass == target.shaderPasses.get(target.uniformsKeys[prop])).uniforms[prop].value

		},
		set(target, prop, newValue) {
			target.effectComposer.passes.find((pass: ShaderPass) => pass == target.shaderPasses.get(target.uniformsKeys[prop])).uniforms[prop].value = newValue
			target.render()
			return true
		}
	})
	constructor(tile: Tile, options?: { renderOrder?: number, scale?: number, shaders?: Shader[] }) {
		super()
		const newOptions = Object.assign({ renderOrder: 10, scale: 1, shaders: [] }, options)
		this.width = tile.width
		this.height = tile.height
		this.renderOrder = newOptions.renderOrder * 10
		this.scale = newOptions.scale

		this.renderTarget = new WebGLRenderTarget(this.width, this.height)
		this.effectComposer = new EffectComposer(renderer, this.renderTarget)
		this.effectComposer.renderToScreen = false
		this.renderTarget.texture.minFilter = NearestFilter
		this.renderTarget.texture.magFilter = NearestFilter
		this.renderTarget.texture.wrapS = RepeatWrapping
		this.renderTarget.texture.wrapT = RepeatWrapping

		this.texture = this.renderTarget.texture
		this.baseTexture = new Uniform(tile.textures[0])
		this.addShader(new RenderShader(tile.textures[0]), false)
		newOptions.shaders.forEach(shaderConstructor => {
			this.addShader(shaderConstructor, false)
		})
		this.effectComposer.render()
		this.material = new MeshStandardMaterial({ map: this.renderTarget.texture, transparent: true })

		this.mesh = new Mesh(
			new PlaneGeometry(this.scaledWidth, this.scaledHeight),
			this.material
		)
		this.mesh.renderOrder = this.renderOrder

	}
	addShader(shader: Shader, render = true) {
		if ([...this.shaderPasses.keys()].includes(shader.constructor.name)) return
		const shaderMat = shader.create(this)
		shaderMat.uniforms.tDiffuse = this.baseTexture
		const pass = new ShaderPass(shaderMat)
		this.shaderPasses.set(shader.constructor.name, pass)
		Object.keys(pass.uniforms).forEach((name) => {
			this.uniformsKeys[name] = shader.constructor.name
		})
		pass.clear = true
		this.effectComposer.insertPass(pass, 1)
		this.effectComposer.insertPass(new ShaderPass(CopyShader), 2)
		if (render) this.render()
	}
	removeShader(shaderConstructor: Constructor<Shader>) {
		const pass = this.shaderPasses.get(shaderConstructor.name)
		if (pass) {
			this.effectComposer.removePass(pass)
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
	destroy(): void {
		this.mesh.geometry.dispose()
		this.mesh.removeFromParent()
	}

	render() {
		this.effectComposer.render()
		this.material.needsUpdate = true
		renderer.clear()

	}
}
SpriteComponent.register()

export default SpriteComponent