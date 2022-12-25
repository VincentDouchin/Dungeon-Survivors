import AssetManager from "../Globals/AssetManager";
import MeshComponent from "./MeshComponent";

class HealthComponent extends MeshComponent {
	health: number
	maxHealth: number
	constructor(health: number) {
		const ctx = AssetManager.UI['Health-full']
		super(ctx)
		this.health = health
		this.maxHealth = health
	}
	addHealth(amount: number) {
		this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth))
	}
}
HealthComponent.register()
export default HealthComponent