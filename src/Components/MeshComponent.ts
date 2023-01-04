import { CanvasTexture, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshStandardMaterial, NearestFilter, PlaneGeometry, RepeatWrapping } from "three";
import { Component } from "../Globals/ECS";
import Sprite from "../Renderer/Sprite";
import RenderShader from "../Shaders/RenderShader";
import Tile from "../Utils/Tile";
class MeshComponent extends Component {
	sprite: Sprite
	// mesh: Mesh
	// texture: CanvasTexture
	// normalMap: CanvasTexture | null = null
	// width: number
	// height: number
	// renderOrder: number
	// scale: number
	// lastModifer: 'buffer' | 'outline' | 'hurt' = 'buffer'
	// modifier: 'buffer' | 'outline' | 'hurt' = 'buffer'
	// material: MeshLambertMaterial | MeshBasicMaterial | MeshStandardMaterial
	constructor(tile: Tile, options?: { renderOrder?: number, scale?: number, }) {
		super()
		this.sprite = new Sprite(tile.width, tile.height, [RenderShader(tile.buffer.canvas)])
	}
	// 	const newOptions = Object.assign({ renderOrder: 10, scale: 1 }, options)
	// 	this.renderOrder = newOptions.renderOrder * 10
	// 	this.scale = newOptions.scale
	// 	this.width = tile.width * this.scale
	// 	this.height = tile.height * this.scale

	// 	this.texture = new CanvasTexture(tile.buffer.canvas)
	// 	this.texture.minFilter = NearestFilter
	// 	this.texture.magFilter = NearestFilter
	// 	this.texture.wrapS = RepeatWrapping
	// 	this.texture.wrapT = RepeatWrapping
	// 	this.material = new MeshLambertMaterial({
	// 		map: this.texture,
	// 		transparent: true,
	// 	})
	// 	const geometry = new PlaneGeometry(this.width, this.height)
	// 	const mesh = new Mesh(geometry, this.material)
	// 	this.mesh = mesh

	// }

	// destroy(): void {
	// 	this.mesh.geometry.dispose()
	// 	this.mesh.removeFromParent()
	// }
}
MeshComponent.register()
export default MeshComponent