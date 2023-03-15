import { ECS, Entity, System } from "../Globals/ECS";

import AnimationComponent from "../Components/AnimationComponent";
import Coroutine from "../Globals/Coroutine";
import { ECSEVENTS } from "../Constants/Events";
import PathNodeComponent from "../Components/PathNodeComponent";
import PathWalkerComponent from "../Components/PathWalkerComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import RunState from "../GameStates/RunState";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import TransitionEntity from "../UIEntities/TransitionEntity";
import WinState from "../GameStates/WinState";
import assets from "../Globals/Assets";
import { easeInCubic } from "../Utils/Tween";
import { engine } from "../Globals/Initialize";

class PathSystem extends System {
	position?: PositionComponent
	encounter?: boolean
	constructor() {
		super(PathWalkerComponent)
		this.subscribers.push(ECS.eventBus.subscribe(ECSEVENTS.PATH_POSITION, ({ position, encounter }) => {
			this.position = position
			this.encounter = encounter
		}))
	}
	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const sprite = entity.getComponent(SpriteComponent)
			const animation = entity.getComponent(AnimationComponent)
			const position = entity.getComponent(PositionComponent)
			if (!position && this.position) {
				entity.addComponent(this.position)
				return
			} else if (this.position) {
				if (position.x !== this.position.x || position.y !== this.position.y) {
					animation.setState('run')
					sprite.flipped = position.x - this.position.x > 0
					position.x += Math.sign(this.position.x - position.x)
					position.y += Math.sign(this.position.y - position.y)
					return
				}
			}

			const nodes = ECS.getEntitiesAndComponents(PathNodeComponent)
			const selectedNode = nodes.find(([_, pathNode]) => {
				return pathNode.options.x === this.position?.x && pathNode.options.y === this.position?.y
			})
			if (!selectedNode) return
			const [nodeId, node] = selectedNode
			const nodeEntity = ECS.getEntityById(nodeId)
			if (node.encounter && !this.encounter) {
				TransitionEntity(60, () => {
					engine.setState(RunState, node)
				})
				return
			}
			if (node.possibleDirections === 0) {
				engine.setState(WinState)
			} else if (!node.showingOptions) {
				const arrows: Entity[] = []
				for (let direction of ['left', 'right', 'top'] as nodeDirection[]) {
					const otherNode = node.next(direction)
					const otherPathNode = otherNode?.getComponent(PathNodeComponent)
					const otherNodePosition = otherNode?.getComponent(PositionComponent)
					if (node.possibleDirections > 1 && otherNode && otherNodePosition) {

						const arrow = new Entity('arrow')
						arrow.addComponent(new SelectableComponent(
							assets.UI.arrowselected,
							assets.UI.arrow,
							() => {
								this.position = otherNodePosition
								this.encounter = !otherPathNode?.encounter
								arrows.forEach(arrow => arrow.destroy())
							})
						)


						arrows.push(arrow)
						nodeEntity.addChildren(arrow)
						arrow.addComponent(new SpriteComponent(assets.UI.arrow))
						const arrowPosition = arrow.addComponent(new PositionComponent(position.x, position.y))

						const arrowBounce = new Coroutine(function* () {
							let t = 0
							let sign = 1
							const delay = 30
							while (true) {
								while (t < delay) {
									arrowPosition.y += easeInCubic(t, -0.1, 0.1, delay) * sign
									t++
									yield
								}
								t = 0
								sign *= -1
							}
						})
						arrow.onDestroy(() => arrowBounce.stop())


						switch (direction) {
							case 'left': {
								arrowPosition.x -= 16
							}; break
							case 'top': {
								arrowPosition.y += 16
								arrow.addComponent(new RotationComponent({ rotation: Math.PI }))
							}; break
							case 'right': {
								arrowPosition.x += 16
								arrow.addComponent(new RotationComponent({ rotation: Math.PI / 2 }))
							}; break

						}
					} else {
						if (otherNode && otherNodePosition) {
							this.position = otherNodePosition
							this.encounter = !otherPathNode?.encounter

						}
					}


				}
				SelectableComponent.setFromArray(arrows)
			}

			node.showingOptions = true
		})
	}
}
export default PathSystem
