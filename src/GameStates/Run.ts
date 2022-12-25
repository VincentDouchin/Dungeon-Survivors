import { render, world } from "../Globals/Initialize"
import { ECS } from "../Globals/ECS"
import RenderingSystem from "../Systems/RenderingSystem"
import MovementSystem from "../Systems/MovementSystem"
import PlayerEntity from "../Entities/PlayerEntity"
import AnimationSystem from "../Systems/AnimationSystem"
import EnemyEntity from "../Entities/EnemyEntity"
import AIControllerComponent from "../Components/AIControllerComponent"
import HealthSystem from "../Systems/HealthSystem"
const Run = new class implements GameState {
	constructor() {
		RenderingSystem.register()
		MovementSystem.register()
		AnimationSystem.register()
		HealthSystem.register()
		const player = PlayerEntity()
		const enemy = EnemyEntity()
		enemy.getComponent(AIControllerComponent).target = player
	}
	update() {
		world.step()
		ECS.updateSystems()

	}
	render() {
		render()
	}
}
export default Run