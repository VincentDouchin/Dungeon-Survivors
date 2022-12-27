
import AssetManager from "../Globals/AssetManager";
import { Component, ECS } from "../Globals/ECS";
import updateBar from "../UIEntities.ts/UpdateBar";
import MeshComponent from "./MeshComponent";
const full = AssetManager.UI['healthFull']
const empty = AssetManager.UI['healthBar']
class HealthComponent extends Component {
	health: number
	maxHealth: number
	type: number
	healthBarId: string | null = null
	constructor(health: number, type: number) {
		super()
		this.health = health
		this.maxHealth = health
		this.type = type
	}
	updateHealth(amount: number) {

		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth))
		if (this.healthBarId) {
			updateBar(
				ECS.getEntityById(this.healthBarId).getComponent(MeshComponent),
				empty,
				full,
				this.health / this.maxHealth)

		}

	}

}
HealthComponent.register()
export default HealthComponent