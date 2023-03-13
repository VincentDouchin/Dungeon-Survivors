import { DEBUG, GameState } from "../Globals/Engine"
import { ECS, Entity } from "../Globals/ECS"
import { ECSEVENTS, UIEVENTS } from "../Constants/Events"
import ENEMYWAVES, { enemyWaveName } from "../Constants/EnemyEncounters"
import { engine, inputManager, render, soundManager, world } from "../Globals/Initialize"

import AIMovementSystem from "../Systems/AIMovementSystem"
import AnimationSystem from "../Systems/AnimationSystem"
import { Arenas } from "../../assets/map/Map"
import BACKGROUNDS from "../Constants/BackGrounds"
import BackgroundElementSpawnerSystem from "../Systems/BackgroundElementSpawnerSystem"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import CameraSystem from "../Systems/CameraSystem"
import Coroutine from "../Globals/Coroutine"
import DroppingSystem from "../Systems/DroppingSystem"
import Encounter from "../Game/Encounter"
import ExpirationSystem from "../Systems/ExpirationSystem"
import HealthSystem from "../Systems/HealthSystem"
import LevelComponent from "../Components/LevelComponent"
import LevelUpState from "./LevelUpState"
import LightingSystem from "../Systems/LightingSystem"
import { MUSICS } from "../Constants/Sounds"
import ManaComponent from "../Components/ManaComponent"
import MapState from "./MapState"
import MinionSpawnerSytem from "../Systems/MinionSpawnerSystem"
import MovementSystem from "../Systems/MovementSystem"
import PauseState from "./PauseState"
import PickupSystem from "../Systems/PickupSystem"
import PlayerEntity from "../Entities/PlayerEntity"
import PortalSystem from "../Systems/PortalSystem"
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
import TutorialEntity from "../UIEntities/TutorialEntity"
import UIRunEntity from "../UIEntities/UIRunEntity"
import waitFor from "../Utils/WaitFor"

class RunState implements GameState {
	ui?: Entity
	background?: Entity
	players: Set<Entity> = new Set()
	playerLevel = new LevelComponent()
	mana = new ManaComponent()
	timer?: Coroutine
	encounter: Encounter | null = null
	tutorialShown = false || State.mobile
	music: HTMLAudioElement | null = null
	subscribers: Array<() => void> = []
	tutoCoroutine?: Coroutine
	stats: [StatsComponent, StatsComponent] = [new StatsComponent(), new StatsComponent()]
	update() {
		world.step()
		ECS.updateSystems()
	}
	render() {
		render()
	}
	set(oldState: Constructor<GameState>, options: { background?: Arenas, enemies?: enemyWaveName }) {

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
		PortalSystem.register()
		ShootingSystem.register()
		CameraSystem.register()
		RenderSystem.register()
		SwitchingSystem.register()
		AIMovementSystem.register()
		StatUpdateSystem.register()
		SpellSystem.register()
		BackgroundElementSpawnerSystem.register()
		ExpirationSystem.register()
		SelectionSystem.register()
		MinionSpawnerSytem.register()
		DroppingSystem.register()
		this.ui = UIRunEntity()
		this.encounter?.resume()
		this.timer = new Coroutine(function* () {
			yield* waitFor(60)
			State.timer++
			ECS.eventBus.publish(ECSEVENTS.TIMER, State.timer)
		}, Infinity)
		switch (oldState) {
			case PauseState: {
				this.encounter?.resume()
			}; break
			case LevelUpState: {
				this.encounter?.resume()
			}; break
			case MapState: {
				this.mana.fill()
				// !MUSIC
				this.music ??= soundManager.play('music', MUSICS.Fight, { volume: 0.8, autoplay: false, loop: true })

				// !BACKGROUND
				const backgroundDefinition = BACKGROUNDS[options?.background ?? DEBUG.DEFAULT_BACKGROUND]
				this.background = BackgroundEntity(backgroundDefinition)
				// !PLAYERS

				this.players.add(PlayerEntity(State.heros[0] ?? DEBUG.DEFAULT_HEROS[0], State.selectedTiles[0] ?? 0, true, this.stats[0], this.mana, this.playerLevel))
				this.players.add(PlayerEntity(State.heros[1] ?? DEBUG.DEFAULT_HEROS[1], State.selectedTiles[1] ?? 0, false, this.stats[1], this.mana, this.playerLevel))
				this.subscribers.push(ECS.eventBus.subscribe(ECSEVENTS.XP_UP, ({ entity }) => {
					if (this.players.has(entity)) {
						ECS.eventBus.publish(UIEVENTS.UI_XP, this.playerLevel.xp / this.playerLevel.nextLevel())
					}
				}))
				this.subscribers.push(ECS.eventBus.subscribe(ECSEVENTS.LEVEL_UP, (entity) => {
					if (this.players.has(entity)) {
						ECS.eventBus.publish(UIEVENTS.UI_LEVEL, entity.getComponent(LevelComponent).level)
						engine.setState(LevelUpState)
					}
				}))
				this.players.forEach(player => {
					this.subscribers.push(ECS.eventBus.subscribe(ECSEVENTS.TAKE_DAMAGE, ({ entity, amount, loop }) => {
						if (amount < 0 && this.players.has(entity) && entity !== player && !loop) {
							ECS.eventBus.publish(ECSEVENTS.TAKE_DAMAGE, ({ entity: player, amount, loop: true }))
						}
					}))
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
					this.tutoCoroutine = new Coroutine(function* () {
						yield* waitFor(600)
						tutorial.destroy()
					})
				}

			}; break
		}
		soundManager.resume(this.music)

		// !INITIALIZE UI
		ECS.eventBus.publish(ECSEVENTS.MANA_PERCENT, this.mana.mana / this.mana.maxMana.value)
		ECS.eventBus.publish(ECSEVENTS.MANA_AMOUNT, this.mana.mana)
		ECS.getEntitiesAndComponents(SpellComponent).forEach(([id, spell]) => {
			const entity = ECS.getEntityById(id)
			if (entity.getComponent(SwitchingComponent).main) {
				ECS.eventBus.publish(ECSEVENTS.SPELL_ICON, spell.icon)
			}
		})
		ECS.eventBus.publish(UIEVENTS.UI_XP, this.playerLevel.xp / this.playerLevel.nextLevel())
		ECS.eventBus.publish(UIEVENTS.UI_LEVEL, this.playerLevel.level)
		ECS.eventBus.publish(UIEVENTS.ENEMY_LEVEL, this.encounter?.level.level ?? 0)

	}
	unset(newState: Constructor<GameState>) {
		ECS.unRegisterSystems()
		inputManager.disable('dpad')
		inputManager.disable('pauseButton')
		inputManager.disable('switchButton')
		inputManager.disable('activeSkillButton')
		this.ui?.destroy()
		this.music?.pause()
		this.encounter?.pause()
		this.timer?.stop()
		switch (newState) {
			case LevelUpState: {
				this.encounter?.pause()
			}; break
			case PauseState: {
				this.encounter?.pause()
			}; break
			case MapState: {
				this.tutoCoroutine?.stop()
				this.subscribers.forEach(sub => sub())
				this.players.forEach(player => player.destroy())
				this.background?.destroy()
				this.encounter = null
				this.music = null
			}; break
		}
	}
}

export default RunState