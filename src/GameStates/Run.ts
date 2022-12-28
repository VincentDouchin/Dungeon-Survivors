import { render, world } from "../Globals/Initialize"
import { ECS } from "../Globals/ECS"
import RenderingSystem from "../Systems/RenderingSystem"
import MovementSystem from "../Systems/MovementSystem"
import AnimationSystem from "../Systems/AnimationSystem"
import HealthSystem from "../Systems/HealthSystem"
import BodyCreationSystem from "../Systems/BodyCreationSystem"

import PlayerEntity from "../Entities/PlayerEntity"
import BackgroundEntity from "../Entities/BackgroundEntity"
import startWave from "../Game/Wave"
import Enemies from "../Constants/Enemies"
import XPEntity from "../Entities/XPEntity"
import PositionComponent from "../Components/PositionComponent"
import XPPickupSystem from "../Systems/XPPickupSystem"
import RunUIEntity from "../Entities/RunUIEntity"
import SpikeEntity from "../Entities/SpikeEntity"
import PotionEntity from "../Entities/PotionEntity"
import LightingSystem from "../Systems/LightingSystem"
import BrasierEntity from "../Entities/BrasierEntity"
import HEROS from "../Constants/Heros"
const Run = (): GameState => {

	RenderingSystem.register()
	MovementSystem.register()
	AnimationSystem.register()
	HealthSystem.register()
	BodyCreationSystem.register()
	XPPickupSystem.register()
	LightingSystem.register()
	BackgroundEntity()
	RunUIEntity()
	const player = PlayerEntity(HEROS.knightMale)

	startWave(player)(
		[Enemies.goblin, 10, 5],
		[Enemies.orc, 15, 5],
		[Enemies.orcShaman, 10, 4],
		[Enemies.orcMasked, 10, 3],
		[Enemies.zombieBig, 1, 1]
	)
	BrasierEntity({ x: 0, y: 0 })
	BrasierEntity({ x: 100, y: 0 })
	PotionEntity({ x: 100, y: 100 })
	SpikeEntity({ x: 30, y: 19 })
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