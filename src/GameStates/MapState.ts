import { ECS, Entity } from "../Globals/ECS";
import LDTKMap, { ldtkNode } from "../Utils/LDTKMap";
import { camera, inputManager, render, world } from "../Globals/Initialize";

import AnimationComponent from "../Components/AnimationComponent";
import AnimationSystem from "../Systems/AnimationSystem";
import CameraSystem from "../Systems/CameraSystem";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import Coroutine from "../Globals/Coroutine";
import { ECSEVENTS } from "../Constants/Events";
import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import INPUTS from "../Constants/InputsNames";
import MovementSystem from "../Systems/MovementSystem";
import PathEntity from "../Entities/PathEntity";
import PathSystem from "../Systems/PathSystem";
import PathWalkerComponent from "../Components/PathWalkerComponent";
import PositionComponent from "../Components/PositionComponent";
import RenderSystem from "../Systems/RenderSystem";
import SelectionSystem from "../Systems/SelectionSystem";
import SpriteComponent from "../Components/SpriteComponent";
import State from "../Globals/State";
import assets from "../Globals/Assets";
import { easeInOutQuart } from "../Utils/Tween";

class MapState implements GameState {
	map?: Entity
	player?: Entity
	path?: Entity
	initialPosition = true
	lastPosition?: PositionComponent
	render() {
		render()
	}
	update() {
		ECS.updateSystems()
		world.step()
	}
	async set(previousState: GameStates) {
		let wasEncounter = false
		const map = new LDTKMap(assets.mapData['OVERWORLD'],assets.mapTiles['OVERWORLD'])
		const level = map.levels[0]
		const mapTile = map.tile
		debugger
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
		if (previousState !== GameStates.playerSelect) {
			this.map = new Entity('map')
			this.map.addComponent(new SpriteComponent(mapTile))
			this.map.addComponent(new PositionComponent(0, 0))
		}
		await new Promise<void>((resolve) => {
			switch (previousState) {
				case GameStates.run: {
					wasEncounter = true
					resolve()
				}; break
				case GameStates.none: {

					const title = new Entity('title text')
					title.addComponent(new SpriteComponent(assets.UI.title))
					title.addComponent(new PositionComponent(0, mapTile.height / 2 - camera.top / 2))
					new Coroutine(function* () {
						yield
						camera.position.x = 0
						let counter = 1
						while (counter < 600) {
							yield camera.position.y = easeInOutQuart(counter, (mapTile.height / 2) - camera.top, -(mapTile.height / 2) + camera.top, 600)
							if (inputManager.getInput(INPUTS.SWITCH)?.active) {
								counter += 10
							}
							counter++
						}
						title.destroy()
						Engine.setState(GameStates.playerSelect)
						return
					})
				}; break
				default: {
					resolve()
				}; break
			}
		})
		if (!level ) return
		this.player = new Entity('player')
		const hero = State.heros[0]
		this.player.addComponent(new SpriteComponent(hero.tiles[State.selectedTiles[0]].idle, { scale: 0.6, renderOrder: 11 }))
		this.player.addComponent(new AnimationComponent(hero.tiles[State.selectedTiles[0]]))
		this.player.addComponent(new CameraTargetComponent())
		this.player.addComponent(new PathWalkerComponent())
		const pathEntities = level
			.layerInstances?.find(layer => layer.__identifier == 'Path')
			?.entityInstances.map(node => LDTKMap.getPropertiesOfEntity(level)(node)!) as ldtkNode[]
		this.path = PathEntity(pathEntities)

		if (this.lastPosition) {
			ECS.eventBus.publish(ECSEVENTS.PATH_POSITION, { position: this.lastPosition, encounter: wasEncounter })
		}
	}
	unset(newState: GameStates) {
		ECS.unRegisterSystems()
		switch (newState) {
			case GameStates.playerSelect: {
			}; break
			default: {
				this.lastPosition = this.player?.getComponent(PositionComponent)
				this.map?.destroy()
				this.path?.destroy()
				this.player?.destroy()
			}; break
		}
	}
}
export default MapState