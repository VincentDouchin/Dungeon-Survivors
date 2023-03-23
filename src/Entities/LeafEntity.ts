import { easeInSine, linear } from '../Utils/Tween'

import AnimationComponent from '../Components/AnimationComponent'
import Coroutine from '../Globals/Coroutine'
import { Entity } from '../Globals/ECS'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'
import { camera } from '../Globals/Initialize'

const LeafEntity = () => {
	const leaf = new Entity('leaf')
	const sprite = leaf.addComponent(new SpriteComponent(assets.effects.Leaf, { renderOrder: 10, scale: 1.5 }))
	leaf.addComponent(new AnimationComponent({ default: assets.effects.Leaf }))
	const position = leaf.addComponent(new PositionComponent(
		((Math.random() - 0.5) * 2) * camera.right + camera.position.x,
		((Math.random() - 0.5) * 2) * camera.top + camera.position.y
	))
	const fallingEnd = position.y + ((Math.random() * 20)) * (Math.random() > 0.5 ? 1 : -1)
	const fallingEndTimer = 20 + Math.random() * 20
	const start = position.y
	new Coroutine(function* (counter: number) {
		position.y += linear(counter, 0, -2, 100)
		position.x = easeInSine(counter, start, fallingEnd, fallingEndTimer)
		sprite.opacity = linear(counter, 1, 0, 100)

		yield

		leaf.destroy()
	}, 100)
	return leaf
}
export default LeafEntity