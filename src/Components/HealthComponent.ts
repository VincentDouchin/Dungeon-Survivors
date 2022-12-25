import AssetManager from "../Globals/AssetManager";
import getBuffer from "../Utils/Buffer";
import MeshComponent from "./MeshComponent";
const full = AssetManager.UI['Health-full']
const empty = AssetManager.UI['Health-empty']
class HealthComponent extends MeshComponent {
	health: number
	maxHealth: number
	constructor(health: number) {
		const buffer = getBuffer(full.canvas.width, full.canvas.height)
		buffer.drawImage(full.canvas, 0, 0)
		super(buffer)
		this.updateHealth(0)
		this.health = health
		this.maxHealth = health
	}
	updateHealth(amount: number) {
		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth))
		const healthPercent = this.health / this.maxHealth
		const fullWidth = Math.ceil(healthPercent * this.width)
		const emptyWidth = Math.floor(this.width - fullWidth)
		const image: HTMLCanvasElement = this.texture.image
		const ctx = image.getContext('2d')
		ctx?.drawImage(empty.canvas, fullWidth, 0, emptyWidth, this.height, fullWidth, 0, emptyWidth, this.height)
		ctx?.drawImage(full.canvas, 0, 0, fullWidth, this.height, 0, 0, fullWidth, this.height)
		this.texture.needsUpdate = true

	}
}
HealthComponent.register()
export default HealthComponent