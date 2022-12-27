import { render, world } from "../Globals/Initialize"
import { ECS } from "../Globals/ECS"
import RenderingSystem from "../Systems/RenderingSystem"
import MovementSystem from "../Systems/MovementSystem"
import AnimationSystem from "../Systems/AnimationSystem"
import HealthSystem from "../Systems/HealthSystem"
import BodyCreationSystem from "../Systems/BodyCreationSystem"

import PlayerEntity from "../Entities/PlayerEntity"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BrasierEntity from "../Entities/BrasierEntity"
import startWave from "../Game/Wave"
import Enemies from "../Constants/Enemies"
import XPEntity from "../Entities/XPEntity"
import PositionComponent from "../Components/PositionComponent"
const Run = (): GameState => {

	RenderingSystem.register()
	MovementSystem.register()
	AnimationSystem.register()
	HealthSystem.register()
	BodyCreationSystem.register()
	const player = PlayerEntity()

	BackgroundEntity()
	startWave(player)([Enemies.orc, 10, 20], [Enemies.orcShaman, 10, 10])
	BrasierEntity({ x: 0, y: 0 })
	BrasierEntity({ x: 100, y: 0 })
	const xp = XPEntity()
	xp.addComponent(new PositionComponent(5, 5))
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