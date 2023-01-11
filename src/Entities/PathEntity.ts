import PathNodeComponent from "../Components/PathNodeComponent"
import PositionComponent from "../Components/PositionComponent"
import { Entity } from "../Globals/ECS"

const PathEntity = (nodes: node[], target: Entity) => {
	const nodeEntities: Map<number, Entity> = new Map()
	const startNode = nodes.find(node => node.start)!
	const createPath = (node: node, selected = false) => {
		if (nodeEntities.has(node.id)) return nodeEntities.get(node.id)
		const nodeEntity = new Entity()
		nodeEntity.addComponent(new PositionComponent(node.x, node.y))
		const directions: Partial<Record<nodeDirection, Entity>> = {}
		for (let direction of ['left', 'right', 'top'] as nodeDirection[]) {
			if (node[direction]) {

				const otherNode = nodes.find(otherNode => otherNode.id == node[direction])
				if (!otherNode) continue
				directions[direction] = createPath(otherNode, false)
			}
		}
		nodeEntity.addComponent(new PathNodeComponent(directions, target, selected))
		return nodeEntity
	}
	return createPath(startNode, true)



}
export default PathEntity