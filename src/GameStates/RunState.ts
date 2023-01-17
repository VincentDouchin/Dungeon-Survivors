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
import { State } from "../Constants/GameStates"
import HEROS from "../Constants/Heros"
import { PAUSE } from "../Constants/InputsNames"
import WEAPONS from "../Constants/Weapons"
import BackgroundEntity from "../Entities/BackgroundEntity"
import PlayerEntity from "../Entities/PlayerEntity"
import Encounter from "../Game/Encounter"
import Coroutines from "../Globals/Coroutines"
import Engine from "../Globals/Engine"
import LightingSystem from "../Systems/LightingSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import TargetingSystem from "../Systems/TargetingSystem"
import XPPickupSystem from "../Systems/XPPickupSystem"
import UIRunEntity from "../UIEntities/UIRunEntity"
import CameraSystem from "../Systems/CameraSystem"

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
		RenderingSystem.register()
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

		switch (oldState) {
			case State.pause: {

			}; break
			case State.map: {
				this.ui = UIRunEntity()
				this.background = BackgroundEntity()
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