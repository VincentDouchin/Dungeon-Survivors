import { render, world } from "../Globals/Initialize"
import { ECS, Entity } from "../Globals/ECS"
import RenderingSystem from "../Systems/RenderingSystem"
import MovementSystem from "../Systems/MovementSystem"
import PlayerEntity from "../Entities/PlayerEntity"
import AnimationSystem from "../Systems/AnimationSystem"

import HealthSystem from "../Systems/HealthSystem"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import EnemyEntity from "../Entities/EnemyEntity"
import AIControllerComponent from "../Components/AIControllerComponent"
import PositionComponent from "../Components/PositionComponent"
const Run = (): GameState => {

	RenderingSystem.register()
	MovementSystem.register()
	AnimationSystem.register()
	HealthSystem.register()
	BodyCreationSystem.register()
	const player = PlayerEntity()
	const spawnEnemies = (player: Entity, nb: number) => {
		for (let i = 0; i < nb; i++) {
			const distance = Math.random() * 200 + 100
			const angle = Math.random() * Math.PI * 2
			const x = Math.cos(angle) * distance
			const y = Math.sin(angle) * distance
			const enemy = EnemyEntity()
			enemy.addComponent(new PositionComponent(x, y))
			enemy.addComponent(new AIControllerComponent(player))
		}
	}

	spawnEnemies(player, 10)

	return {
		update() {
			world.step()
			ECS.updateSystems()
		},
		render() {
			render()
		}
	}
}
export default Run