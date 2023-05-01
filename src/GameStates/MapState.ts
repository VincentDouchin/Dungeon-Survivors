import { Easing, Tween } from '@tweenjs/tween.js'
import { ECS, Entity } from '../Globals/ECS'

import { camera, engine, inputManager, render, world } from '../Globals/Initialize'

import AnimationSystem from '../Systems/AnimationSystem'
import CameraSystem from '../Systems/CameraSystem'
import type { GameState } from '../Globals/Engine'
import type { ldtkNode } from '../Utils/LDTKMap'
import LDTKMap from '../Utils/LDTKMap'
import MovementSystem from '../Systems/MovementSystem'
import PathSystem from '../Systems/PathSystem'
import PositionComponent from '../Components/PositionComponent'
import RenderSystem from '../Systems/RenderSystem'
import SelectionSystem from '../Systems/SelectionSystem'
import State from '../Globals/State'
import assets from '../Globals/Assets'
import SpriteComponent from '../Components/SpriteComponent'
import CameraTargetComponent from '../Components/CameraTargetComponent'
import UIMapRestoreEntity from '../UIEntities/UIMapRestoreProgressEntity'
import UIMapMultiplayerEntity from '../UIEntities/UIMapMultiplayerEntity'
import UIMapMultiplayerControlsEntity from '../UIEntities/UIMapMultiplayerControlsEntity'
import UIMapDifficultyEntity from '../UIEntities/UIMapDifficultyEntity'
import UIPlayerSelectEntity from '../UIEntities/UIPlayerSelectEntity'
import INPUTS from '../Constants/InputsNames'
import AnimationComponent from '../Components/AnimationComponent'
import PathWalkerComponent from '../Components/PathWalkerComponent'
import PathEntity from '../Entities/PathEntity'
import { ECSEVENTS } from '../Constants/Events'
import saveData, { save, setProgress } from '../Globals/SaveManager'
import HEROS from '../Constants/Heros'
import RunState from './RunState'

class MapState implements GameState {
	map?: Entity
	player?: Entity
	path?: Entity
	initialPosition = true
	lastPosition?: PositionComponent
	ui?: Entity
	render() {
		render()
	}

	update() {
		inputManager.updateInputs()
		ECS.updateSystems()
		world.step()
	}

	async set(previousState: Constructor<GameState> | null) {
		const map = new LDTKMap(assets.mapData.OVERWORLD, assets.mapTiles.OVERWORLD)
		const level = map.levels[0]
		const mapTile = map.tile
		const showMap = (wasEncounter: boolean) => {
			if (!level) return
			this.player = new Entity('player')
			const hero = [...State.heros][0]
			this.player.addComponent(new SpriteComponent(hero.tiles.idle, { scale: 0.6, renderOrder: 11 }))
			this.player.addComponent(new AnimationComponent(hero.tiles))
			this.player.addComponent(new CameraTargetComponent())
			this.player.addComponent(new PathWalkerComponent())
			const pathEntities = level
				.layerInstances?.find(layer => layer.__identifier === 'Path')
				?.entityInstances.map(node => LDTKMap.getPropertiesOfEntity(level)(node)) as ldtkNode[]
			this.path = PathEntity(pathEntities)

			if (this.lastPosition) {
				ECS.eventBus.publish(ECSEVENTS.PATH_POSITION, { position: this.lastPosition, encounter: previousState === RunState || wasEncounter })
			}
		}
		State.cameraBounds = {
			left: -mapTile.width / 2,
			right: mapTile.width / 2,
			bottom: -mapTile.height / 2,
			top: mapTile.height / 2,
		}
		CameraSystem.register()
		AnimationSystem.register()
		MovementSystem.register()
		PathSystem.register()
		RenderSystem.register()
		SelectionSystem.register()
		this.map = new Entity('map')
		this.map.addComponent(new SpriteComponent(mapTile))
		this.map.addComponent(new PositionComponent(0, 0))
		let wasEncounter = false
		if (previousState === null) {
			// ! CAMERA TARGET
			const target = new Entity('target')
			const targetPosition = target.addComponent(new PositionComponent(0, (mapTile.height / 2) - (camera.top / 2)))
			target.addComponent(new CameraTargetComponent())
			// ! TITLE
			const title = new Entity('title text')
			title.addComponent(new SpriteComponent(assets.UI.title))
			title.addComponent(new PositionComponent(0, mapTile.height / 2 - camera.top / 2))
			let restoreProgress = false
			if (saveData.progress) {
				restoreProgress = await UIMapRestoreEntity()
			}
			if (!restoreProgress) {
				saveData.progress = null
				save()
				State.multiplayer = await UIMapMultiplayerEntity()
				if (State.multiplayer) {
					await UIMapMultiplayerControlsEntity()
				}
				State.difficulty = await UIMapDifficultyEntity()

				await new Promise((resolve) => {
					let duration = 600
					const target = { y: -(mapTile.height / 2) + camera.top }
					const moveToBottomTween = new Tween(targetPosition)
						.to(target, duration)
						.easing(Easing.Quartic.InOut)
						.start(engine.timer)
						.onComplete(resolve)
						.onUpdate(() => {
							if (inputManager.getInput(INPUTS.SWITCH)?.active) {
								duration -= 10
								moveToBottomTween.to(target, duration)
							}
						})
				})
				target.destroy()
				await UIPlayerSelectEntity()
				setProgress({
					multiplayer: State.multiplayer,
					difficulty: State.difficulty,
					heros: [...State.heros].map(hero => hero.name),
					controls: [...State.multiplayerControls].map(controller => controller!.name),
				})
			} else {
				target.destroy()
				// State.multiplayerControls = saveData.progress!.controls!.map((controllerName) => {
				// 	const controller = [TouchController, GamepadController, KeyboardController].find(controller => controller.name === controllerName)

				// })
				wasEncounter = true
				if (saveData.progress?.heros) {
					for (let i = 0; i <= 1; i++) {
						const heroDefinition = HEROS.find(hero => saveData.progress?.heros?.[i] === hero.name)
						if (heroDefinition) {
							State.heros.add(heroDefinition)
						}
					}
				}
				if (saveData.progress?.position) {
					this.lastPosition = new PositionComponent(saveData.progress.position.x, saveData.progress.position.y)
				}
				State.multiplayer = saveData.progress!.multiplayer!
				State.difficulty = saveData.progress!.difficulty!
			}
		}
		showMap(wasEncounter)
	}

	unset(newState: Constructor<GameState> | null) {
		ECS.unRegisterSystems()
		this.ui?.destroy()
		switch (newState) {
		default: {
			this.lastPosition = this.player?.getComponent(PositionComponent)
			this.map?.destroy()
			this.path?.destroy()
			this.player?.destroy()
		} break
		}
	}
}
export default MapState
