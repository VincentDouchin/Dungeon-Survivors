import BACKGROUNDS, { backgroundName } from "../Constants/BackGrounds"
import { ECS, Entity } from "../Globals/ECS"
import { ECSEVENTS, UIEVENTS } from "../Constants/Events"
import ENEMYWAVES, { enemyWaveName } from "../Constants/EnemyEncounters"
import Engine, { DEBUG } from "../Globals/Engine"
import { inputManager, render, soundManager, world } from "../Globals/Initialize"

import { ALLSOUNDS } from "../Globals/Sounds"
import AnimationSystem from "../Systems/AnimationSystem"
import BackgroundElementSpawnerSystem from "../Systems/BackgroundElementSpawnerSystem"
import BackgroundEntity from "../Entities/BackgroundEntity"
import BodyCreationSystem from "../Systems/BodyCreationSystem"
import CameraSystem from "../Systems/CameraSystem"
import Encounter from "../Game/Encounter"
import ExpirationSystem from "../Systems/ExpirationSystem"
import FlockingSystem from "../Systems/FlockingSystem"
import { GameStates } from "../Constants/GameStates"
import HealthSystem from "../Systems/HealthSystem"
import INPUTS from "../Constants/InputsNames"
import LightingSystem from "../Systems/LightingSystem"
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

class RunState implements GameState {
	ui?: Entity
	background?: Entity
	players: Entity[] = []
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

		switch (oldState) {
			case GameStates.pause: {
				this.encounter?.resume()
			}; break
			case GameStates.levelUp: {
				this.encounter?.resume()
			}; break
			case GameStates.map: {
				if (!this.music) {
					this.music ??= soundManager.play(ALLSOUNDS.Fight, 0.8)
					this.music.loop = true
				}
				const backgroundDefinition = BACKGROUNDS[options?.background ?? DEBUG.DEFAULT_BACKGROUND]
				this.background = BackgroundEntity(backgroundDefinition)

				this.players.push(PlayerEntity(State.heros[0] ?? DEBUG.DEFAULT_HEROS[0], State.selectedTiles[0] ?? 0, true, this.mana))
				this.players.push(PlayerEntity(State.heros[1] ?? DEBUG.DEFAULT_HEROS[1], State.selectedTiles[1] ?? 0, false, this.mana))
				this.players.forEach(player => {
					const stats = player.getComponent(StatsComponent)
					const levelUnsubscriber = ECS.eventBus.subscribe(ECSEVENTS.LEVEL_UP, ({ level, entity }) => {
						if (this.players.some(player => player.id === entity)) {
							stats.level = level
						}
						ECS.eventBus.publish(UIEVENTS.UI_LEVEL, level)
					})
					const xpUnsubscriber = ECS.eventBus.subscribe(ECSEVENTS.XP_PERCENT, ({ amount, entity }) => {
						if (this.players.some(player => player.id === entity)) {
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
				this.encounter ??= ENEMYWAVES[options?.enemies ?? DEBUG.DEFAULT_ENEMIES]()
				if (backgroundDefinition.boundaries) {
					this.encounter.setBoundary(backgroundDefinition.boundaries.x, backgroundDefinition.boundaries.y)
				}
				this.encounter.start()
				if (!this.tutorialShown && !State.mobile) {
					TutorialEntity()
					this.tutorialShown = true
				}
			}; break
		}
		this.music?.play()

		ECS.eventBus.publish(ECSEVENTS.MANA_PERCENT, this.mana.mana / this.mana.maxMana.value)
		ECS.eventBus.publish(ECSEVENTS.MANA_AMOUNT, this.mana.mana)
		ECS.getEntitiesAndComponents(SpellComponent).forEach(([id, spell]) => {
			const entity = ECS.getEntityById(id)
			if (!entity.getComponent(SwitchingComponent).main) {
				ECS.eventBus.publish(ECSEVENTS.SPELL_ICON, spell.icon)
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
				this.encounter = null
				this.music = null
			}; break
		}
	}
}

export default RunState