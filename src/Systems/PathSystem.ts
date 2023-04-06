import { Tween } from '@tweenjs/tween.js'
import { ECS, Entity, System } from '../Globals/ECS'

import AnimationComponent from '../Components/AnimationComponent'
import { ECSEVENTS } from '../Constants/Events'
import PathNodeComponent from '../Components/PathNodeComponent'
import PathWalkerComponent from '../Components/PathWalkerComponent'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import RunState from '../GameStates/RunState'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import WinState from '../GameStates/WinState'
import assets from '../Globals/Assets'
import { engine } from '../Globals/Initialize'
import INPUTS from '../Constants/InputsNames'
class PathSystem extends System {
	position?: PositionComponent
	encounter?: boolean
	transitionFinished = false
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
			}
			else if (this.position) {
				if (position.x !== this.position.x || position.y !== this.position.y) {
					animation.setState('run')
					sprite.flipped = position.x - this.position.x > 0
					position.x += Math.sign(this.position.x - position.x)
					position.y += Math.sign(this.position.y - position.y)
					return
				}
			}

			const nodes = ECS.getEntitiesAndComponents(PathNodeComponent)
			const selectedNode = nodes.find(([, pathNode]) => {
				return pathNode.options.x === this.position?.x && pathNode.options.y === this.position?.y
			})
			if (!selectedNode) return
			const [nodeEntity, node] = selectedNode

			if (node.encounter && !this.encounter) {
				engine.setState(RunState, node)
				return
			}
			if (node.possibleDirections === 0) {
				engine.setState(WinState)
			}
			else if (!node.showingOptions) {
				const arrows: Entity[] = []
				const next: Record<string, Entity> = {}
				for (const direction of ['left', 'right', 'top'] as nodeDirection[]) {
					const otherNode = node.next(direction)
					const otherPathNode = otherNode?.getComponent(PathNodeComponent)
					const otherNodePosition = otherNode?.getComponent(PositionComponent)
					if (node.possibleDirections > 1 && otherNode && otherNodePosition) {
						const arrow = new Entity('arrow')
						const selectable = arrow.addComponent(new SelectableComponent(
							assets.UI.arrowselected,
							assets.UI.arrow,
							() => {
								this.position = otherNodePosition
								this.encounter = !otherPathNode?.encounter
								arrows.forEach(arrow => arrow.destroy())
							}),
						)
						next[{
							left: INPUTS.MOVELEFT,
							right: INPUTS.MOVERIGHT,
							top: INPUTS.MOVEUP,
						}[direction]] = arrow
						selectable.next = next
						arrows.push(arrow)
						nodeEntity.addChildren(arrow)
						arrow.addComponent(new SpriteComponent(assets.UI.arrow))
						const arrowPosition = arrow.addComponent(new PositionComponent(position.x, position.y))

						switch (direction) {
						case 'left': {
							arrowPosition.x -= 16
						} break
						case 'top': {
							arrowPosition.y += 16
							arrow.addComponent(new RotationComponent({ rotation: Math.PI }))
						} break
						case 'right': {
							arrowPosition.x += 16
							arrow.addComponent(new RotationComponent({ rotation: Math.PI / 2 }))
						} break
						}
						const tween = new Tween(arrowPosition)
							.to({ y: arrowPosition.y + 2 }, 60)
							.repeat(Infinity)
							.yoyo(true)
							.start(engine.timer)
						arrow.onDestroy(() => tween.stop())
					}
					else {
						if (otherNode && otherNodePosition) {
							this.position = otherNodePosition
							this.encounter = !otherPathNode?.encounter
						}
					}
				}
				if (arrows.length) {
					ECS.eventBus.publish(ECSEVENTS.SELECTED, arrows[0])
				}
				// SelectableComponent.setFromArray(arrows)
			}

			node.showingOptions = true
		})
	}
}
export default PathSystem
