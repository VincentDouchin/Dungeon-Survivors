import AIMovementComponent from '../../Components/AIMovementComponent'
import BodyComponent from '../../Components/BodyComponent'
import JointComponent from '../../Components/JointComponent'
import PositionComponent from '../../Components/PositionComponent'
import SpriteComponent from '../../Components/SpriteComponent'
import type { EnemyType } from '../../Constants/Enemies'
import { ECSEVENTS } from '../../Constants/Events'
import EnemyEntity from '../../Entities/EnemyEntity'
import Coroutine from '../../Globals/Coroutine'
import type { Entity } from '../../Globals/ECS'
import { ECS } from '../../Globals/ECS'

const DopplegangerTransform = (number: number, type: EnemyType) => (parent: Entity) => {
	const createClonesSub = ECS.eventBus.subscribe(ECSEVENTS.TAKE_DAMAGE, ({ entity }) => {
		if (entity === parent) {
			createClonesSub()
			const initialEntity = Math.floor(Math.random() * number)
			const position = entity.getComponent(PositionComponent)

			const getPositionOffset = (i: number) => {
				const angle = Math.PI * 2 * i / number
				const x = Math.cos(angle) * 50
				const y = Math.sin(angle) * 50
				return { x, y }
			}
			const initialSpeed = entity.getComponent(BodyComponent).moveForce.base
			entity.getComponent(BodyComponent).moveForce.base *= 7
			const parentPosition = getPositionOffset(initialEntity)
			for (let i = 0; i < number; i++) {
				const { x, y } = getPositionOffset(i)
				if (i === initialEntity) {
					position.x += x
					position.y += y
				} else {
					const clone = EnemyEntity({ ...type, xp: 0, health: 1, transforms: [] })({ x: x - parentPosition.x + position.x, y: y - parentPosition.y + position.y })
					parent.addChildren(clone)
					clone.name = 'clone'
					clone.removeComponent(AIMovementComponent)
					clone.addComponent(new JointComponent('fixed', { x: x - parentPosition.x, y: y - parentPosition.y }, parent))
					const coroutine = new Coroutine(function*() {
						clone.getComponent(SpriteComponent).flipped = entity.getComponent(SpriteComponent).flipped
						yield
					}, Infinity)
					clone.onDestroy(() => {
						entity.getComponent(BodyComponent).moveForce.base -= initialSpeed
						coroutine.stop()
					})
				}
			}
		}
	})
}
export default DopplegangerTransform
