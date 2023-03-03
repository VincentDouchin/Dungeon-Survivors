import { ECS, Entity } from "../Globals/ECS"
import PathNodeComponent, { node } from "../Components/PathNodeComponent"

import { ECSEVENTS } from "../Constants/Events"
import PositionComponent from "../Components/PositionComponent"

const PathEntity = (nodes: node[]) => {
	const nodeEntities: Map<number, Entity> = new Map()
	const startNode = nodes.find(node => node.start)!
	const createPath = (node: node, selected = false) => {
		if (nodeEntities.has(node.id)) return nodeEntities.get(node.id)
		const nodeEntity = new Entity('node')
		const nodePosition = nodeEntity.addComponent(new PositionComponent(node.x, node.y))
		if (selected) {
			ECS.eventBus.publish(ECSEVENTS.PATH_POSITION, nodePosition)
		}
		const directions: Partial<Record<nodeDirection, Entity>> = {}
		for (let direction of ['left', 'right', 'top'] as nodeDirection[]) {
			if (node[direction]) {

				const otherNode = nodes.find(otherNode => otherNode.id == node[direction])
				if (!otherNode) continue
				directions[direction] = createPath(otherNode, false)
			}
		}
		nodeEntity.addComponent(new PathNodeComponent(directions, selected, node))

		return nodeEntity
	}
	return createPath(startNode, true)



}
export default PathEntity