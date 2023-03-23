import { ECS, Entity } from '../Globals/ECS'
import LDTKMap, { ldtkNode } from '../Utils/LDTKMap'
import { camera, engine, inputManager, render, world } from '../Globals/Initialize'

import AnimationComponent from '../Components/AnimationComponent'
import AnimationSystem from '../Systems/AnimationSystem'
import CameraSystem from '../Systems/CameraSystem'
import CameraTargetComponent from '../Components/CameraTargetComponent'
import Coroutine from '../Globals/Coroutine'
import { ECSEVENTS } from '../Constants/Events'
import { GameState } from '../Globals/Engine'
import INPUTS from '../Constants/InputsNames'
import MovementSystem from '../Systems/MovementSystem'
import PathEntity from '../Entities/PathEntity'
import PathSystem from '../Systems/PathSystem'
import PathWalkerComponent from '../Components/PathWalkerComponent'
import PlayerSelectState from './PlayerSelectState'
import PositionComponent from '../Components/PositionComponent'
import RenderSystem from '../Systems/RenderSystem'
import RunState from './RunState'
import SelectionSystem from '../Systems/SelectionSystem'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import UIMapEntity from '../UIEntities/UIMapEntity'
import assets from '../Globals/Assets'
import { easeInOutQuart } from '../Utils/Tween'

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
		ECS.updateSystems()
		world.step()
	}
	async set(previousState: Constructor<GameState> | null) {
		const showMap = () => {
			if (!level) return
			this.player = new Entity('player')
			const hero = [...State.heros][0]
			this.player.addComponent(new SpriteComponent(hero.tiles.idle, { scale: 0.6, renderOrder: 11 }))
			this.player.addComponent(new AnimationComponent(hero.tiles))
			this.player.addComponent(new CameraTargetComponent())
			this.player.addComponent(new PathWalkerComponent())
			const pathEntities = level
				.layerInstances?.find(layer => layer.__identifier == 'Path')
				?.entityInstances.map(node => LDTKMap.getPropertiesOfEntity(level)(node)) as ldtkNode[]
			this.path = PathEntity(pathEntities)

			if (this.lastPosition) {
				ECS.eventBus.publish(ECSEVENTS.PATH_POSITION, { position: this.lastPosition, encounter: wasEncounter })
			}
		}
		let wasEncounter = false
		const map = new LDTKMap(assets.mapData['OVERWORLD'], assets.mapTiles['OVERWORLD'])
		const level = map.levels[0]
		const mapTile = map.tile

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
		if (previousState !== PlayerSelectState) {
			this.map = new Entity('map')
			this.map.addComponent(new SpriteComponent(mapTile))
			this.map.addComponent(new PositionComponent(0, 0))
		}
		this.ui = UIMapEntity()
		if (previousState === RunState) {
			wasEncounter = true
		}
		if (previousState === null) {
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
					while (State.difficulty === null) {
						yield
					}
					counter++

				}
				title.destroy()
				engine.setState(PlayerSelectState)
				return
			})
		} else {
			showMap()
		}


	}
	unset(newState: Constructor<GameState> | null) {
		ECS.unRegisterSystems()
		this.ui?.destroy()
		switch (newState) {
		case PlayerSelectState: break
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