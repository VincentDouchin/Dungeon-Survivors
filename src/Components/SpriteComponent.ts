import { Material, Mesh, MeshBasicMaterial, MultiplyBlending, NearestFilter, PlaneGeometry, ShaderMaterial, Texture, Uniform, Vector2, WebGLRenderTarget } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Component } from "../Globals/ECS";
import { renderer } from "../Globals/Initialize";
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
class SpriteComponent extends Component {
	renderTarget: WebGLRenderTarget
	material: Material
	width: number
	height: number
	effectComposer: EffectComposer
	texture = new Texture()
	shaders: ShaderMaterial[] = []
	mesh: Mesh
	constructor(width: number, height: number, shaders: ShaderMaterial[]) {
		super()
		this.width = width
		this.height = height
		this.renderTarget = new WebGLRenderTarget(this.width, this.height)
		this.effectComposer = new EffectComposer(renderer, this.renderTarget)
		this.renderTarget.texture.minFilter = NearestFilter
		this.renderTarget.texture.magFilter = NearestFilter

		this.shaders = shaders

		this.shaders.forEach((shader) => {
			shader.transparent = true
			shader.uniforms.tDiffuse = new Uniform(this.renderTarget.texture)
			const pass = new ShaderPass(shader)
			pass.clear = false
			this.effectComposer.addPass(pass)
			this.effectComposer.addPass(new ShaderPass(CopyShader))
		})

		this.material = new MeshBasicMaterial({ map: this.renderTarget.texture, transparent: true })

		this.mesh = new Mesh(
			new PlaneGeometry(this.width, this.height),
			this.material
		)
		this.mesh.position.set(0, 0, 0)
	}
	render() {
		this.effectComposer.render()
		this.material.needsUpdate = true
	}
}
SpriteComponent.register()

export default SpriteComponent