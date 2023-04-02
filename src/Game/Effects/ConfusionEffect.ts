import AIMovementComponent from '../../Components/AIMovementComponent'
import BodyComponent from '../../Components/BodyComponent'
import PlayerControllerComponent from '../../Components/PlayerControllerComponent'
import Coroutine from '../../Globals/Coroutine'
import type { Entity } from '../../Globals/ECS'
import waitFor from '../../Utils/WaitFor'

const ConfusionEffect = (player: Entity) => {
	if (!(player.getComponent(AIMovementComponent) || player.getComponent(PlayerControllerComponent))) return
	const controller = player.removeComponent(AIMovementComponent) ?? player.removeComponent(PlayerControllerComponent)
	const body = player.getComponent(BodyComponent)
	const randomDirection = new Coroutine(function*() {
		const angle = Math.random() * Math.PI * 2
		const duration = Math.random() * 60 + 30
		for (let i = 0; i < duration; i++) {
			if (body.velocity.x === 0 && body.velocity.y === 0) {
				body.velocity.x = Math.cos(angle)
				body.velocity.y = Math.sin(angle)
			} else {
				i--
			}
			yield
		}
	}, Infinity)
	new Coroutine(function*() {
		yield * waitFor(180)
		randomDirection.stop()
		player.addComponent(controller)
	})
}
export default ConfusionEffect
