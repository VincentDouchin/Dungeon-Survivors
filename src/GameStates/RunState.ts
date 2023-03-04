import BACKGROUNDS, { backgroundName } from "../Constants/BackGrounds"
import { ECS, Entity } from "../Globals/ECS"
import { ECSEVENTS, UIEVENTS } from "../Constants/Events"
import ENEMYWAVES, { enemyWaveName } from "../Constants/EnemyEncounters"
import Engine, { DEBUG } from "../Globals/Engine"
import { inputManager, render, soundManager, world } from "../Globals/Initialize"

import AnimationSystem from "../Systems/AnimationSystem"
import BackgroundElementSpawnerSystem from "../Systems/BackgroundElementSpawnerSystem"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import CameraSystem from "../Systems/CameraSystem"
import Coroutine from "../Globals/Coroutine"
import Encounter from "../Game/Encounter"
import ExpirationSystem from "../Systems/ExpirationSystem"
import FlockingSystem from "../Systems/FlockingSystem"
import { GameStates } from "../Constants/GameStates"
import HealthSystem from "../Systems/HealthSystem"
import INPUTS from "../Constants/InputsNames"
import LightingSystem from "../Systems/LightingSystem"
import { MUSICS } from "../Constants/Sounds"
import ManaComponent from "../Components/ManaComponent"
import MinionSpawnerSytem from "../Systems/MinionSpawnerSystem"
import MovementSystem from "../Systems/MovementSystem"
import PickupSystem from "../Systems/PickupSystem"
import PlayerEntity from "../Entities/PlayerEntity"
import RenderSystem from "../Systems/RenderSystem"
import SelectionSystem from "../Systems/SelectionSystem"
import ShootingSystem from "../Systems/ShootingSystem"
import SpellComponent from "../Components/SpellComponent"
import SpellSystem from "../Systems/SpellSystem"
import StatUpdateSystem from "../Systems/StatUpdateSystem"
import State from "../Globals/State"
import StatsComponent from "../Components/StatsComponent"
import SwitchingComponent from "../Components/SwitchingComponent"
import SwitchingSystem from "../Systems/SwitchingSystem"
import TargetingSystem from "../Systems/TargetingSystem"
import TutorialEntity from "../UIEntities/TutorialEntity"
import UIRunEntity from "../UIEntities/UIRunEntity"
import waitFor from "../Utils/WaitFor"

class RunState implements GameState {
	ui?: Entity
	background?: Entity
	players: Set<Entity> = new Set()
	mana = new ManaComponent()
	encounter: Encounter | null = null
	tutorialShown = false
	music: HTMLAudioElement | null = null
	constructor() {
	}



	update() {
		if (inputManager.getInput(INPUTS.PAUSE)?.once) {
			Engine.setState(GameStates.pause)
		}
		world.step()
		ECS.updateSystems()
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
		PickupSystem.register()
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
		this.encounter?.resume()
		switch (oldState) {
			case GameStates.pause: {
				this.encounter?.resume()
			}; break
			case GameStates.levelUp: {
				this.encounter?.resume()
			}; break
			case GameStates.map: {
				// !MUSIC
				this.music ??= soundManager.play('music', MUSICS.Fight, { volume: 0.8, autoplay: false, loop: true })

				// !BACKGROUND
				const backgroundDefinition = BACKGROUNDS[options?.background ?? DEBUG.DEFAULT_BACKGROUND]
				this.background = BackgroundEntity(backgroundDefinition)
				// !PLAYERS
				this.players.add(PlayerEntity(State.heros[0] ?? DEBUG.DEFAULT_HEROS[0], State.selectedTiles[0] ?? 0, true, this.mana))
				this.players.add(PlayerEntity(State.heros[1] ?? DEBUG.DEFAULT_HEROS[1], State.selectedTiles[1] ?? 0, false, this.mana))
				this.players.forEach(player => {
					const stats = player.getComponent(StatsComponent)
					const levelUnsubscriber = ECS.eventBus.subscribe(ECSEVENTS.LEVEL_UP, ({ level, entity }) => {
						if (this.players.has(entity)) {
							stats.level = level
						}
						ECS.eventBus.publish(UIEVENTS.UI_LEVEL, level)
					})
					const xpUnsubscriber = ECS.eventBus.subscribe(ECSEVENTS.XP_PERCENT, ({ amount, entity }) => {
						if (this.players.has(entity)) {
							stats.xp = amount
						}
						ECS.eventBus.publish(UIEVENTS.UI_XP, stats.xp / stats.nextLevel)
					})
					const SkillUnsubcriber = ECS.eventBus.subscribe(ECSEVENTS.NEW_SKILL, (skill) => {
						stats.setModifier(skill.statName, skill.amount)
					})
					player.onDestroy(() => {
						levelUnsubscriber()
						xpUnsubscriber()
						SkillUnsubcriber()
					})
				})
				// !Encounter
				this.encounter ??= ENEMYWAVES[options?.enemies ?? DEBUG.DEFAULT_ENEMIES]()
				if (backgroundDefinition.boundaries) {
					this.encounter.setBoundary(backgroundDefinition.boundaries.x, backgroundDefinition.boundaries.y)
				}
				this.encounter.start()
				if (!this.tutorialShown && !State.mobile) {
					const tutorial = TutorialEntity()
					this.tutorialShown = true
					new Coroutine(function* () {
						yield* waitFor(600)
						tutorial.destroy()
					})
				}
			}; break
		}
		this.music?.play()

		// !INITIALIZE UI
		ECS.eventBus.publish(ECSEVENTS.MANA_PERCENT, this.mana.mana / this.mana.maxMana.value)
		ECS.eventBus.publish(ECSEVENTS.MANA_AMOUNT, this.mana.mana)
		ECS.getEntitiesAndComponents(SpellComponent).forEach(([id, spell]) => {
			const entity = ECS.getEntityById(id)
			if (!entity.getComponent(SwitchingComponent).main) {
				ECS.eventBus.publish(ECSEVENTS.SPELL_ICON, spell.icon)
			}
		})
		ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, entity => {
			if (this.players.has(entity)) {
				this.players.delete(entity)
				if (this.players.size === 0) {
					Engine.setState(GameStates.gameOver)
				}
			}
		})
	}
	unset(newState?: GameStates) {
		ECS.unRegisterSystems()
		inputManager.disable('dpad')
		inputManager.disable('pauseButton')
		inputManager.disable('switchButton')
		inputManager.disable('activeSkillButton')
		this.ui?.destroy()
		this.music?.pause()
		this.encounter?.pause()
		switch (newState) {
			case GameStates.levelUp: {
				this.encounter?.pause()
			}; break
			case GameStates.pause: {
				this.encounter?.pause()
			}; break
			case GameStates.map: {
				this.background?.destroy()
				this.encounter = null
				this.music = null
			}; break
		}
	}
}

export default RunState