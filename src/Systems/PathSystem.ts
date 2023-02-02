import { ECS, Entity, System } from "../Globals/ECS";
import ECSEVENTS, { PATH_POSITION } from "../Constants/ECSEvents";
import { assets, inputManager } from "../Globals/Initialize";

import AnimationComponent from "../Components/AnimationComponent";
import Coroutines from "../Globals/Coroutines";
import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import PathNodeComponent from "../Components/PathNodeComponent";
import PathWalkerComponent from "../Components/PathWalkerComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import { easeInCubic } from './../Utils/Tween'

class PathSystem extends System {
	constructor() {
		super(PathNodeComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {

			const node = entity.getComponent(PathNodeComponent)

			const [walkerId] = ECS.getEntitiesAndComponents(PathWalkerComponent)
			if (!walkerId) return
			const walker = ECS.getEntityById(walkerId[0])
			const walkerPosition = walker.getComponent(PositionComponent)
			const walkerAnimation = walker.getComponent(AnimationComponent)
			const position = entity.getComponent(PositionComponent)
			if (node.selected) {
				ECS.eventBus.publish<PATH_POSITION>(ECSEVENTS.PATH_POSITION, position)
			}
			if (node.selected && (walkerPosition.x != position.x || walkerPosition.y != position.y)) {
				walkerAnimation.flipped = walkerPosition.x - position.x > 0
				walkerAnimation.state = 'run'
				walkerPosition.x += Math.sign(position.x - walkerPosition.x)
				walkerPosition.y += Math.sign(position.y - walkerPosition.y)

			} else if (node.selected && node.encounter) {
				node.encounter = false
				Engine.setState(GameStates.run, node)
				return
			} else if (node.selected && !node.showingOptions) {

				const possibleDirections = Object.entries(node.nodes)
				if (possibleDirections.length == 1) {
					node.nodes[possibleDirections[0][0] as nodeDirection]!.getComponent(PathNodeComponent).selected = true

					entity.destroy()
				} else {
					for (let [direction, otherNodeode] of possibleDirections) {

						const arrow = new Entity('arrow')
						entity.addChildren(arrow)
						const arrowMesh = arrow.addComponent(new SpriteComponent(assets.UI.arrow,))
						const arrowPosition = arrow.addComponent(new PositionComponent(position.x, position.y))
						Coroutines.add(function* () {
							let t = 0
							let sign = 1
							const delay = 30
							while (arrow) {
								while (t < delay) {
									arrowPosition.y += easeInCubic(t, -0.1, 0.1, delay) * sign
									t++
									yield
								}
								t = 0
								sign *= -1
							}
						})

						arrow.addComponent(new SelectableComponent(assets.UI.arrowselected, assets.UI.arrow))
						switch (direction) {
							case 'left': {
								arrowPosition.x -= 16
							}; break
							case 'top': {
								arrowPosition.y += 16
								arrow.addComponent(new RotationComponent(Math.PI))
							}; break
							case 'right': {
								arrowPosition.x += 16
								arrow.addComponent(new RotationComponent(Math.PI / 2))
							}; break

						}
						inputManager.eventBus.subscribe('down', ({ objects }: TouchCoord) => {
							if (objects.includes(arrowMesh.mesh.id)) {
								otherNodeode.getComponent(PathNodeComponent).selected = true
								node.selected = false
								arrow.destroy()
								entity.destroy()
							}
						})

					}
				}

				node.showingOptions = true
			} else if (node.selected) {
				walkerAnimation.state = 'idle'
			}
		})
	}
}
export default PathSystem