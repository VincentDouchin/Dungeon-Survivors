import { ECS, Entity } from "../Globals/ECS"
import { inputManager, render, world } from "../Globals/Initialize"

import AnimationSystem from "../Systems/AnimationSystem"
import BACKGROUNDS from "../Constants/BackGrounds"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import CameraSystem from "../Systems/CameraSystem"
import Coroutines from "../Globals/Coroutines"
import Encounter from "../Game/Encounter"
import Enemies from "../Constants/Enemies"
import Engine from "../Globals/Engine"
import FlockingSystem from "../Systems/FlockingSystem"
import HEROS from "../Constants/Heros"
import HealthSystem from "../Systems/HealthSystem"
import LightingSystem from "../Systems/LightingSystem"
import MovementSystem from "../Systems/MovementSystem"
import { PAUSE } from "../Constants/InputsNames"
import PlayerEntity from "../Entities/PlayerEntity"
import RenderSystem from "../Systems/RenderSystem"
import RenderingSystem from "../Systems/RenderingSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import SkillsComponent from "../Components/SkillsComponent"
import { State } from "../Constants/GameStates"
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
			Engine.setState(State.pause)
		}
	}
	render() {

		render()
	}
	set(oldState?: State) {
		inputManager.enable('dpad')
		MovementSystem.register()
		AnimationSystem.register()
		HealthSystem.register()
		BodyCreationSystem.register()
		RenderingSystem.register()
		XPPickupSystem.register()
		LightingSystem.register()
		ShootingSystem.register()
		TargetingSystem.register()
		CameraSystem.register()
		Coroutines.resume()
		RenderSystem.register()
		SwitchingSystem.register()
		FlockingSystem.register()

		switch (oldState) {
			case State.pause: {

			}; break
			case State.levelUp: {

			}; break
			default: {
				this.ui = UIRunEntity()
				this.background = BackgroundEntity(BACKGROUNDS.FOREST)
				this.player = new Entity()
				this.player.addComponent(this.skills)
				this.player.addComponent(this.store)
				const knight = this.player.addChildren(PlayerEntity(HEROS.knightMale, WEAPONS.sword))
				this.player.addChildren(PlayerEntity(HEROS.elfMale, WEAPONS.bow, knight))
				const encounter = new Encounter()
				Coroutines.add(function* () {
					yield* encounter.wave(Enemies.goblin, 20, 10)
					yield* encounter.wave(Enemies.orc, 15, 5)
					yield* encounter.wave(Enemies.orcShaman, 10, 4)
					yield* encounter.wave(Enemies.orcMasked, 10, 3)
					yield* encounter.wave(Enemies.zombieBig, 1, 1)
					yield* encounter.waitForEnemiesCleared()
					yield Engine.setState(State.map)
				})
			}; break
		}




	}
	unset(newState?: State) {
		ECS.unRegisterSystems()
		inputManager.disable('dpad')
		Coroutines.stop()
		switch (newState) {
			case State.map: {
				this.background?.destroy()
				this.ui?.destroy()
				this.player?.destroy()
			}; break
		}
	}
}

export default RunState