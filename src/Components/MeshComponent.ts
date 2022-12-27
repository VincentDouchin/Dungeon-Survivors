import { CanvasTexture, Color, IUniform, Mesh, NearestFilter, PlaneGeometry, ShaderMaterial, Uniform, UniformsLib, UniformsUtils, Vector2, Vector4 } from "three";
import { Component } from "../Globals/ECS";
import mainVert from './../Shaders/main.vert?raw'
import mainFrag from './../Shaders/main.frag?raw'
import Tile from "../Utils/Tile";
class MeshComponent extends Component {
	mesh: Mesh
	texture: CanvasTexture
	width: number
	height: number
	renderOrder: number
	uniforms: Record<string, IUniform>
	constructor(tile: Tile, options: { renderOrder: number } = { renderOrder: 10 }) {
		super()
		this.width = tile.width
		this.height = tile.height
		this.texture = new CanvasTexture(tile.buffer.canvas)
		this.texture.minFilter = NearestFilter
		this.texture.magFilter = NearestFilter
		this.uniforms = UniformsUtils.merge([{
			uTexture: new Uniform(this.texture),
			uRepeatX: new Uniform(1),
			uOffsetX: new Uniform(0),
			uColor: new Uniform(new Vector4()),
			sprite_size: new Uniform(new Vector2(this.width, this.height)),
			outline_color: new Uniform(new Color(0xff0000)),

		}, UniformsLib['lights']])
		this.renderOrder = options.renderOrder * 10
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