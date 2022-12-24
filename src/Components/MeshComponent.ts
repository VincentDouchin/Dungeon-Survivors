import { CanvasTexture, Mesh, MeshBasicMaterial, NearestFilter, PlaneGeometry } from "three";
import { Component } from "../Globals/ECS";

class MeshComponent extends Component {
	mesh: Mesh
	constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
		super()
		const canvasTexture = new CanvasTexture(ctx.canvas)
		canvasTexture.minFilter = NearestFilter
		canvasTexture.magFilter = NearestFilter
		const geometry = new PlaneGeometry(width ?? ctx.canvas.width, height ?? ctx.canvas.height)
		const meshMaterial = new MeshBasicMaterial({ map: canvasTexture, transparent: true, })
		const mesh = new Mesh(geometry, meshMaterial)
		this.mesh = mesh

	}
	destroy(): void {
		this.mesh.geometry.dispose()

	}
}
MeshComponent.register()
export default MeshComponent