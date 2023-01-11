import { ECS, Entity } from "../Globals/ECS"
import { inputManager, render, world } from "../Globals/Initialize"
import AnimationSystem from "../Systems/AnimationSystem"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import HealthSystem from "../Systems/HealthSystem"
import MovementSystem from "../Systems/MovementSystem"
import RenderingSystem from "../Systems/RenderingSystem"

import SkillsComponent from "../Components/SkillsComponent"
import StoreComponent from "../Components/StoreComponent"
import Enemies from "../Constants/Enemies"
import HEROS from "../Constants/Heros"
import { PAUSE } from "../Constants/InputsNames"
import WEAPONS from "../Constants/Weapons"
import BackgroundEntity from "../Entities/BackgroundEntity"
import PlayerEntity from "../Entities/PlayerEntity"
import PotionEntity from "../Entities/PotionEntity"
import SpikeEntity from "../Entities/SpikeEntity"
import { wave } from "../Game/Wave"
import Coroutines from "../Globals/Coroutines"
import Engine from "../Globals/Engine"
import LightingSystem from "../Systems/LightingSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import TargetingSystem from "../Systems/TargetingSystem"
import XPPickupSystem from "../Systems/XPPickupSystem"
import RunUIEntity from "../UIEntities/UIRunEntity"

class RunState implements GameState {
	ui: Entity | null = null
	background: Entity | null = null
	player: Entity | null = null
	constructor() {


	}



	update() {
		world.step()
		ECS.updateSystems()
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState('pause')
		}
	}
	render() {

		render()
	}
	set() {
		this.ui = RunUIEntity()
		this.background = BackgroundEntity()
		this.player = new Entity()
		this.player.addComponent(new SkillsComponent())
		this.player.addComponent(new StoreComponent())
		const knight = this.player.addChildren(PlayerEntity(HEROS.knightMale, WEAPONS.sword))
		this.player.addChildren(PlayerEntity(HEROS.elfMale, WEAPONS.bow, knight))

		Coroutines.add(function* () {
			yield* wave(Enemies.goblin, 20, 5)
			yield* wave(Enemies.orc, 15, 5)
			yield* wave(Enemies.orcShaman, 10, 4)
			yield* wave(Enemies.orcMasked, 10, 3)
			yield* wave(Enemies.zombieBig, 1, 1)
		})



		inputManager.enable('dpad')
		RenderingSystem.register()
		MovementSystem.register()
		AnimationSystem.register()
		HealthSystem.register()
		BodyCreationSystem.register()
		XPPickupSystem.register()
		LightingSystem.register()
		ShootingSystem.register()
		TargetingSystem.register()
		Coroutines.resume()
	}
	unset() {
		inputManager.disable('dpad')
		Coroutines.stop()
		ECS.unRegisterSystems()

	}
}

export default RunState