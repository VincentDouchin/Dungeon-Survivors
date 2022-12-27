import AssetManager from "../Globals/AssetManager";

import MeshComponent from "./MeshComponent";
const full = AssetManager.UI['Health-full']
const empty = AssetManager.UI['Health-empty']
class HealthComponent extends MeshComponent {
	health: number
	maxHealth: number
	type: DamageType
	constructor(health: number, type: DamageType) {

		super(full.clone(), { renderOrder: 11 })
		this.updateHealth(0)
		this.health = health
		this.maxHealth = health
		this.type = type
	}
	updateHealth(amount: number) {
		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth))
		const healthPercent = this.health / this.maxHealth
		const fullWidth = Math.ceil(healthPercent * this.width)
		const emptyWidth = Math.floor(this.width - fullWidth)
		const image: HTMLCanvasElement = this.texture.image
		const ctx = image.getContext('2d')
		ctx?.drawImage(empty.buffer.canvas, fullWidth, 0, emptyWidth, this.height, fullWidth, 0, emptyWidth, this.height)
		ctx?.drawImage(full.buffer.canvas, 0, 0, fullWidth, this.height, 0, 0, fullWidth, this.height)
		this.texture.needsUpdate = true

	}
}
HealthComponent.register()
export default HealthComponent