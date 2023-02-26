import BACKGROUNDS, { backgroundName } from "../Constants/BackGrounds"
import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { LEVEL_UP, MANA_PERCENT, SKILL_ICON, SPELL_ICON, XP_PERCENT } from "../Constants/ECSEvents"
import ENEMYWAVES, { enemyWaveName } from "../Constants/EnemyEncounters"
import { inputManager, render, world } from "../Globals/Initialize"

import AnimationSystem from "../Systems/AnimationSystem"
import BackgroundElementSpawnerSystem from "../Systems/BackgroundElementSpawnerSystem"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import CameraSystem from "../Systems/CameraSystem"
import Coroutines from "../Globals/Coroutines"
import Encounter from "../Game/Encounter"
import Engine from "../Globals/Engine"
import ExpirationSystem from "../Systems/ExpirationSystem"
import FlockingSystem from "../Systems/FlockingSystem"
import { GameStates } from "../Constants/GameStates"
import HEROS from "../Constants/Heros"
import HealthSystem from "../Systems/HealthSystem"
import LightingSystem from "../Systems/LightingSystem"
import ManaComponent from "../Components/ManaComponent"
import MinionSpawnerSytem from "../Systems/MinionSpawnerSystem"
import MovementSystem from "../Systems/MovementSystem"
import { PAUSE } from "../Constants/InputsNames"
import PlayerEntity from "../Entities/PlayerEntity"
import RenderSystem from "../Systems/RenderSystem"
import SelectionSystem from "../Systems/SelectionSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import SpellComponent from "../Components/SpellComponent"
import SpellSystem from "../Systems/SpellSystem"
import SpriteComponent from "../Components/SpriteComponent"
import StatUpdateSystem from "../Systems/StatUpdateSystem"
import StatsComponent from "../Components/StatsComponent"
import SwitchingComponent from "../Components/SwitchingComponent"
import SwitchingSystem from "../Systems/SwitchingSystem"
import TargetingSystem from "../Systems/TargetingSystem"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import UIRunEntity from "../UIEntities/UIRunEntity"
import WEAPONS from "../Constants/Weapons"
import XPPickupSystem from "../Systems/XPPickupSystem"
import assets from "../Globals/Assets"
import waitFor from "../Utils/WaitFor"

class RunState implements GameState {
	ui?: Entity
	background?: Entity
	player?: Entity
	stats = new StatsComponent(0, true)
	mana = new ManaComponent()
	encounter: Encounter | null = null
	tutorialShown = false
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
		inputManager.enable('pauseButton')
		inputManager.enable('switchButton')
		inputManager.enable('activeSkillButton')
		MovementSystem.register()
		AnimationSystem.register()
		HealthSystem.register()
		BodyCreationSystem.register()
		XPPickupSystem.register()
		LightingSystem.register()
		ShootingSystem.register()
		TargetingSystem.register()
		CameraSystem.register()
		RenderSystem.register()
		SwitchingSystem.register()
		FlockingSystem.register()
		StatUpdateSystem.register()
		SpellSystem.register()
		BackgroundElementSpawnerSystem.register()
		ExpirationSystem.register()
		SelectionSystem.register()
		MinionSpawnerSytem.register()
		this.ui = UIRunEntity()
		switch (oldState) {
			case GameStates.pause: {
				this.encounter?.resume()
			}; break
			case GameStates.levelUp: {
				this.encounter?.resume()
			}; break
			case GameStates.map: {
				const backgroundDefinition = BACKGROUNDS[options?.background ?? (import.meta.env.VITE_DEFAULT_ARENA as backgroundName)]!
				this.background = BackgroundEntity(backgroundDefinition)
				this.player = new Entity('player')
				this.player.addChildren(PlayerEntity(HEROS.knightMale, WEAPONS.swordKnight, true, this.stats, this.mana))
				this.player.addChildren(PlayerEntity(HEROS.wizardFemale, WEAPONS.staff, false, this.stats, this.mana))
				this.encounter ??= ENEMYWAVES[options?.enemies ?? (import.meta.env.VITE_DEFAULT_ENEMIES as enemyWaveName)]()
				if (backgroundDefinition.boundaries) {
					this.encounter.setBoundary(backgroundDefinition.boundaries.x, backgroundDefinition.boundaries.y)
				}
				this.encounter.start()
				if (!this.tutorialShown) {
					const tutorial = new Entity('tutorial')
					tutorial.addComponent(new SpriteComponent(assets.UI.empty))
					tutorial.addComponent(new TextComponent('WASD - Movement     Shift - Switch charcaters     P - Spell     Escape - Pause'))
					tutorial.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: -1 }))
					Coroutines.add(function* () {
						yield* waitFor(600)
						tutorial.destroy()
					})
					this.tutorialShown = true
				}
			}; break
		}
		ECS.eventBus.publish<LEVEL_UP>(ECSEVENTS.LEVEL_UP, this.stats.level)
		ECS.eventBus.publish<XP_PERCENT>(ECSEVENTS.XP_PERCENT, this.stats.xp / this.stats.nextLevel)
		ECS.eventBus.publish<MANA_PERCENT>(ECSEVENTS.MANA_PERCENT, this.mana.mana / this.mana.maxMana.value)
		ECS.getEntitiesAndComponents(SpellComponent).forEach(([id, spell]) => {
			const entity = ECS.getEntityById(id)
			if (!entity.getComponent(SwitchingComponent).main) {
				ECS.eventBus.publish<SPELL_ICON>(ECSEVENTS.SPELL_ICON, spell.icon)
			}
		})
		this.mana.skills.forEach(skill => {
			ECS.eventBus.publish<SKILL_ICON>(ECSEVENTS.SKILL_ICON, skill.icon)
		})

	}
	unset(newState?: GameStates) {
		ECS.unRegisterSystems()
		inputManager.disable('dpad')
		inputManager.disable('pauseButton')
		inputManager.disable('switchButton')
		inputManager.disable('activeSkillButton')
		this.ui?.destroy()
		switch (newState) {
			case GameStates.levelUp: {
				this.encounter?.pause()
			}; break
			case GameStates.pause: {
				this.encounter?.pause()
			}; break
			case GameStates.map: {
				this.background?.destroy()
				this.ui?.destroy()
				this.player?.destroy()
				this.encounter = null
			}; break
		}
	}
}

export default RunState