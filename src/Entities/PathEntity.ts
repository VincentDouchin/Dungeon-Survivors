import { ECS, Entity } from '../Globals/ECS'
import type { node } from '../Components/PathNodeComponent'
import PathNodeComponent from '../Components/PathNodeComponent'

import AnimationComponent from '../Components/AnimationComponent'
import { ECSEVENTS } from '../Constants/Events'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'

const PathEntity = (nodes: node[]) => {
	const nodeEntities: Map<number, Entity> = new Map()
	const path = new Entity('path')
	for (const node of nodes) {
		const nodeEntity = new Entity('path node')
		const nodePosition = nodeEntity.addComponent(new PositionComponent(node.x, node.y))
		if (node.start) {
			ECS.eventBus.publish(ECSEVENTS.PATH_POSITION, { position: nodePosition, encounter: false })
		}
		nodeEntities.set(node.id, nodeEntity)
		path.addChildren(nodeEntity)
		nodeEntity.addComponent(new PathNodeComponent(node, nodeEntities))
		if (node.flag) {
			nodeEntity.addComponent(new SpriteComponent(assets.effects.flag))
			nodeEntity.addComponent(new AnimationComponent({ idle: assets.effects.flag }))
		}
	}
	return path
	// const startNode = nodes.find(node => node.start)!
	// let lastEntity: Entity | null = null
	// const createPath = (node: node, selected = false) => {
	// 	if (nodeEntities.has(node.id)) return nodeEntities.get(node.id)
	// 	const nodeEntity = new Entity('node')
	// 	const nodePosition = nodeEntity.addComponent(new PositionComponent(node.x, node.y))
	// 	if (selected) {
	// 		ECS.eventBus.publish(ECSEVENTS.PATH_POSITION, nodePosition)
	// 		lastEntity = nodeEntity
	// 	} else if (lastEntity) {
	// 		lastEntity?.addChildren(nodeEntity)
	// 	}
	// 	const directions: Partial<Record<nodeDirection, Entity>> = {}
	// 	for (let direction of ['left', 'right', 'top'] as nodeDirection[]) {
	// 		if (node[direction]) {

	// 			const otherNode = nodes.find(otherNode => otherNode.id == node[direction])
	// 			if (!otherNode) continue
	// 			directions[direction] = createPath(otherNode, false)
	// 		}
	// 	}

	// 	nodeEntity.addComponent(new PathNodeComponent(directions, selected, node))

	// 	return nodeEntity
	// }
	// return createPath(startNode, true)
}
export default PathEntity
