import MeshComponent from "../Components/MeshComponent";
import PathNodeComponent from "../Components/PathNodeComponent";
import PositionComponent from "../Components/PositionComponent";
import RotationComponent from "../Components/RotationComponent";
import AssetManager from "../Globals/AssetManager";
import Coroutines from "../Globals/Coroutines";
import { Entity, System } from "../Globals/ECS";
import { inputManager } from "../Globals/Initialize";

class PathSystem extends System {
	constructor() {
		super(PathNodeComponent)
	}
	update(entities: Entity[]) {
		entities.forEach(entity => {

			const node = entity.getComponent(PathNodeComponent)

			const walkerPosition = node.walker.getComponent(PositionComponent)
			const position = entity.getComponent(PositionComponent)
			if (node.selected && (walkerPosition.x != position.x || walkerPosition.y != position.y)) {
				walkerPosition.x += Math.sign(position.x - walkerPosition.x)
				walkerPosition.y += Math.sign(position.y - walkerPosition.y)

			} else if (node.selected && !node.showingOptions) {
				const possibleDirections = Object.entries(node.nodes)
				if (possibleDirections.length == 1) {
					node.nodes[possibleDirections[0][0] as nodeDirection]!.getComponent(PathNodeComponent).selected = true

					entity.destroy()
				} else {
					for (let [direction, otherNodeode] of possibleDirections) {

						const arrow = new Entity()
						entity.addChildren(arrow)
						const arrowMesh = arrow.addComponent(new MeshComponent(AssetManager.UI.arrow))
						const arrowPosition = arrow.addComponent(new PositionComponent(position.x, position.y))
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
			}
		})
	}
}
export default PathSystem