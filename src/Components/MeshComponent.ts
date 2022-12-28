import { CanvasTexture, IUniform, Mesh, NearestFilter, PlaneGeometry, ShaderMaterial, Uniform, UniformsLib, UniformsUtils, Vector4 } from "three";
import { Component } from "../Globals/ECS";
import mainVert from './../Shaders/vert/main.vert?raw'
import mainFrag from './../Shaders/frag/main.frag?raw'
import Tile from "../Utils/Tile";
class MeshComponent extends Component {
	mesh: Mesh
	texture: CanvasTexture
	width: number
	height: number
	renderOrder: number
	scale: number
	uniforms: Record<string, IUniform>
	constructor(tile: Tile, options?: { renderOrder?: number, scale?: number }) {
		super()
		const newOptions = Object.assign({ renderOrder: 10, scale: 1 }, options)
		this.renderOrder = newOptions.renderOrder * 10
		this.scale = newOptions.scale
		this.width = tile.width * this.scale
		this.height = tile.height * this.scale
		this.texture = new CanvasTexture(tile.buffer.canvas)
		this.texture.minFilter = NearestFilter
		this.texture.magFilter = NearestFilter
		this.uniforms = UniformsUtils.merge([{
			uTexture: new Uniform(this.texture),
			uRepeatX: new Uniform(1),
			uOffsetX: new Uniform(0),
			uColor: new Uniform(new Vector4()),
		}, UniformsLib['lights']])


		const meshMaterial = new ShaderMaterial({
			uniforms: this.uniforms,
			lights: true,
			transparent: true,
			vertexShader: mainVert,
			fragmentShader: mainFrag
		})
		const geometry = new PlaneGeometry(this.width, this.height)


		const mesh = new Mesh(geometry, meshMaterial)
		this.mesh = mesh

	}
	destroy(): void {
		this.mesh.geometry.dispose()
		this.mesh.removeFromParent()
	}
}
MeshComponent.register()
export default MeshComponent