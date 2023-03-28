import { Vector2 } from 'three'
import BodyComponent from '../Components/BodyComponent'
import type { Entity } from '../Globals/ECS'
import FlockingComponent from '../Components/FlockingComponent'
import PositionComponent from '../Components/PositionComponent'
import { System } from '../Globals/ECS'

const nbToVec = (nb: number) => new Vector2(nb, nb)
class FlockingSystem extends System {
	constructor() {
		super(FlockingComponent)
	}

	update(entities: Entity[]) {
		entities.forEach((entity) => {
			const position = entity.getComponent(PositionComponent)
			const flocking = entity.getComponent(FlockingComponent)
			const body = entity.getComponent(BodyComponent)
			if (flocking.main) return
			// Separation: Each character should try to maintain a certain distance from its neighboring characters to avoid collisions.

			// Alignment: Each character should try to match its velocity with that of its neighboring characters. This creates a coordinated movement of the group.

			// Cohesion: Each character should try to move towards the center of mass of its neighboring characters. This creates a sense of unity among the group.
			const separation = new Vector2()
			const alignment = new Vector2()
			const cohesion = new Vector2()
			let neighborCount = 0

			for (const otherEntity of entities) {
				const otherFlocking = otherEntity.getComponent(FlockingComponent)
				if (otherFlocking.group !== flocking.group) continue
				if (otherEntity.id === entity.id) continue
				const otherPosition = otherEntity.getComponent(PositionComponent)
				const otherBody = otherEntity.getComponent(BodyComponent)
				const distance = position.distanceTo(otherPosition)
				if (distance > flocking.distance) {
					separation.add(position.position.sub(otherPosition.position).divide(nbToVec(distance)))
					alignment.add(otherBody.velocity)
					cohesion.add(otherPosition.position)
					neighborCount += 1
				}
			}

			if (neighborCount > 0) {
				const neighborVec = nbToVec(neighborCount)
				alignment.divide(neighborVec)
				cohesion.divide(neighborVec)
				cohesion.sub(position.position).divide(neighborVec)
				const velocity = new Vector2()
					.add(separation.multiply(nbToVec(1)))
					.add(alignment.multiply(nbToVec(3)))
					.add(cohesion.multiply(nbToVec(1)))
				body.velocity = velocity.normalize()
			}
		})
	}
}
export default FlockingSystem
