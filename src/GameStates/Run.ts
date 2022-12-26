import { camera, render, world } from "../Globals/Initialize"
import { ECS } from "../Globals/ECS"
import RenderingSystem from "../Systems/RenderingSystem"
import MovementSystem from "../Systems/MovementSystem"
import PlayerEntity from "../Entities/PlayerEntity"
import AnimationSystem from "../Systems/AnimationSystem"

import HealthSystem from "../Systems/HealthSystem"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import PositionComponent from "../Components/PositionComponent"
import BackgroundEntity from "../Entities/BackgroundEntity"
import { Vector3 } from "three"
import startWave from "../Game/Wave"
import Enemies from "../Constants/Enemies"
import BrasierEntity from "../Entities/BrasierEntity"
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