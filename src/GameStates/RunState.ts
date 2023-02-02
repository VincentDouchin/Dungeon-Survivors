import BACKGROUNDS, { backgroundName } from "../Constants/BackGrounds"
import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { LEVEL_UP, XP_PERCENT } from "../Constants/ECSEvents"
import ENEMYWAVES, { enemyWaveName } from "../Constants/EnemyEncounters"
import { inputManager, render, world } from "../Globals/Initialize"

import AnimationSystem from "../Systems/AnimationSystem"
import BackgroundElementSpawnerSystem from "../Systems/BackgroundElementSpawnerSystem"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import CameraSystem from "../Systems/CameraSystem"
import Coroutines from "../Globals/Coroutines"
import Engine from "../Globals/Engine"
import FlockingSystem from "../Systems/FlockingSystem"
import { GameStates } from "../Constants/GameStates"
import HEROS from "../Constants/Heros"
import HealthSystem from "../Systems/HealthSystem"
import LightingSystem from "../Systems/LightingSystem"
import MovementSystem from "../Systems/MovementSystem"
import { PAUSE } from "../Constants/InputsNames"
import PlayerEntity from "../Entities/PlayerEntity"
import RenderSystem from "../Systems/RenderSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import SkillsComponent from "../Components/SkillsComponent"
import StoreComponent from "../Components/StoreComponent"
import SwitchingSystem from "../Systems/SwitchingSystem"
import TargetingSystem from "../Systems/TargetingSystem"
import UIRunEntity from "../UIEntities/UIRunEntity"
import WEAPONS from "../Constants/Weapons"
import XPPickupSystem from "../Systems/XPPickupSystem"

class RunState implements GameState {
	ui?: Entity
	background?: Entity
	player?: Entity
	skills = new SkillsComponent()
	store = new StoreComponent()
	constructor() {
	}



	update() {
		world.step()
		ECS.updateSystems()
		if (inputManager.getInput(PAUSE)?.once) {
			Engine.setState(GameStates.pause)
		}
	}
	render() {

		render()
	}
	set(oldState: GameStates, options: { background?: backgroundName, enemies?: enemyWaveName }) {

		inputManager.enable('dpad')
		MovementSystem.register()
		AnimationSystem.register()
		HealthSystem.register()
		BodyCreationSystem.register()
		XPPickupSystem.register()
		LightingSystem.register()
		ShootingSystem.register()
		TargetingSystem.register()
		CameraSystem.register()
		Coroutines.resume()
		RenderSystem.register()
		SwitchingSystem.register()
		FlockingSystem.register()
		BackgroundElementSpawnerSystem.register()
		this.ui = UIRunEntity()
		switch (oldState) {
			case GameStates.pause: {

			}; break
			case GameStates.levelUp: {

			}; break
			default: {

				this.background = BackgroundEntity(BACKGROUNDS[options?.background ?? 'GRAVEYARD']!)
				this.player = new Entity('player')
				this.player.addComponent(this.skills)
				this.player.addComponent(this.store)
				const knight = this.player.addChildren(PlayerEntity(HEROS.knightMale, WEAPONS.swordKnight))
				this.player.addChildren(PlayerEntity(HEROS.elfMale, WEAPONS.bow, knight))
				ENEMYWAVES[options?.enemies ?? 'DEMONS']?.start()
			}; break
		}
		const store = this.player?.getComponent(StoreComponent)
		if (store) {
			ECS.eventBus.publish<LEVEL_UP>(ECSEVENTS.LEVEL_UP, store.level)
			ECS.eventBus.publish<XP_PERCENT>(ECSEVENTS.XP_PERCENT, store.xp / store.nextLevel)
		}



	}
	unset(newState?: GameStates) {
		ECS.unRegisterSystems()
		inputManager.disable('dpad')
		Coroutines.stop()
		this.ui?.destroy()
		switch (newState) {
			case GameStates.map: {
				this.background?.destroy()
				this.ui?.destroy()
				this.player?.destroy()
			}; break
		}
	}
}

export default RunState