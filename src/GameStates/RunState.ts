import { ECS, Entity } from "../Globals/ECS"
import { inputManager, render, world } from "../Globals/Initialize"
import AnimationSystem from "../Systems/AnimationSystem"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import HealthSystem from "../Systems/HealthSystem"
import MovementSystem from "../Systems/MovementSystem"
import RenderingSystem from "../Systems/RenderingSystem"

import Enemies from "../Constants/Enemies"
import HEROS from "../Constants/Heros"
import WEAPONS from "../Constants/Weapons"
import BackgroundEntity from "../Entities/BackgroundEntity"
import PlayerEntity from "../Entities/PlayerEntity"
import PotionEntity from "../Entities/PotionEntity"
import SpikeEntity from "../Entities/SpikeEntity"
import startWave from "../Game/Wave"
import Coroutines from "../Globals/Coroutines"
import LightingSystem from "../Systems/LightingSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import TargetingSystem from "../Systems/TargetingSystem"
import XPPickupSystem from "../Systems/XPPickupSystem"
import RunUIEntity from "../UIEntities/UIRunEntity"
import { PAUSE } from "../Constants/InputsNames"
import Engine from "../Globals/Engine"
import XPStoreComponent from "../Components/XPStoreComponent"

class Run implements GameState {
	constructor() {
		const knight = PlayerEntity(HEROS.wizardMale, false, WEAPONS.staff)
		PlayerEntity(HEROS.elfMale, knight, WEAPONS.bow)
		BackgroundEntity()
		RunUIEntity()
		const saveEntity = new Entity()
		saveEntity.addComponent(new XPStoreComponent())

		startWave(
			[Enemies.goblin, 20, 5],
			[Enemies.orc, 15, 5],
			[Enemies.orcShaman, 10, 4],
			[Enemies.orcMasked, 10, 3],
			[Enemies.zombieBig, 1, 1]
		)
		PotionEntity({ x: 100, y: 100 })
		SpikeEntity({ x: 30, y: 19 })
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

export default Run