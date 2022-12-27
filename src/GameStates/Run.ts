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
import XPPickupSystem from "../Systems/XPPickupSystem"
import RunUIEntity from "../Entities/RunUIEntity"
import SpikeEntity from "../Entities/SpikeEntity"
const Run = (): GameState => {

	RenderingSystem.register()
	MovementSystem.register()
	AnimationSystem.register()
	HealthSystem.register()
	BodyCreationSystem.register()
	XPPickupSystem.register()
	BackgroundEntity()
	RunUIEntity()
	const player = PlayerEntity()

	startWave(player)(
		[Enemies.goblin, 10, 5],
		[Enemies.orc, 15, 5],
		[Enemies.orcShaman, 10, 4],
		[Enemies.orcMasked, 10, 3],
		[Enemies.zombieBig, 1, 1]
	)
	BrasierEntity({ x: 0, y: 0 })
	BrasierEntity({ x: 100, y: 0 })
	SpikeEntity({ x: 10, y: 10 })
	const xp = XPEntity()
	xp.addComponent(new PositionComponent(50, 50))
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