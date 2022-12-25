import { CanvasTexture, Mesh, MeshBasicMaterial, NearestFilter, PlaneGeometry } from "three";
import { Component } from "../Globals/ECS";

class MeshComponent extends Component {
	mesh: Mesh
	texture: CanvasTexture
	width: number
	height: number
	constructor(ctx: CanvasRenderingContext2D, width?: number, height?: number) {
		super()
		this.width = width ?? ctx.canvas.width
		this.height = height ?? ctx.canvas.height
		this.texture = new CanvasTexture(ctx.canvas)
		this.texture.minFilter = NearestFilter
		this.texture.magFilter = NearestFilter
		const geometry = new PlaneGeometry(this.width, this.height)
		const meshMaterial = new MeshBasicMaterial({ map: this.texture, transparent: true, })
		const mesh = new Mesh(geometry, meshMaterial)
		this.mesh = mesh

	}
	destroy(): void {
		this.mesh.geometry.dispose()

	}
}
MeshComponent.register()
export default MeshComponent