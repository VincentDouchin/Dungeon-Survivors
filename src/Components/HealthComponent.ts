import AssetManager from "../Globals/AssetManager";
import MeshComponent from "./MeshComponent";
const full = AssetManager.UI['healthFull']
const empty = AssetManager.UI['healthBar']
class HealthComponent extends MeshComponent {
	health: number
	maxHealth: number
	type: number
	constructor(health: number, type: number) {
		const tile = empty.clone()
		super(tile, { renderOrder: 11 })
		this.health = health
		this.maxHealth = health
		this.updateHealth(0)
		this.type = type
	}
	updateHealth(amount: number) {
		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth))
		const healthPercent = this.health / this.maxHealth
		const fullWidth = Math.ceil(healthPercent * this.width)
		const image: HTMLCanvasElement = this.texture.image
		const ctx = image.getContext('2d')
		// ctx?.clearRect()
		ctx?.drawImage(empty.buffer.canvas, 0, 0)
		ctx?.drawImage(full.buffer.canvas, 0, 0, fullWidth, this.height, 0, 0, fullWidth, this.height)
		this.uniforms.uTexture.value.needsUpdate = true
	}
}
HealthComponent.register()
export default HealthComponent