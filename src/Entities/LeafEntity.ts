import { Easing, Tween } from '@tweenjs/tween.js'
import AnimationComponent from '../Components/AnimationComponent'
import { Entity } from '../Globals/ECS'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'
import { camera, engine } from '../Globals/Initialize'

const LeafEntity = () => {
	const leaf = new Entity('leaf')
	const sprite = leaf.addComponent(new SpriteComponent(assets.effects.Leaf, { renderOrder: 10, scale: 1.5 }))
	leaf.addComponent(new AnimationComponent({ default: assets.effects.Leaf }))
	const position = leaf.addComponent(new PositionComponent(
		((Math.random() - 0.5) * 2) * camera.right + camera.position.x,
		((Math.random() - 0.5) * 2) * camera.top + camera.position.y,
	))
	const fallingEnd = 10 + ((Math.random() * 10)) * (Math.random() > 0.5 ? 1 : -1)
	const fallingEndTimer = 180 + Math.random() * 120

	new Tween(sprite)
		.to({ opacity: 0 }, fallingEndTimer)
		.start(engine.timer)
	new Tween(position)
		.to({ x: position.x + fallingEnd }, fallingEnd * (2 + Math.random()))
		.easing(Easing.Sinusoidal.InOut)
		.repeat(Infinity)
		.yoyo(true)
		.start(engine.timer)
	new Tween(position)
		.to({ y: position.y - fallingEndTimer * (0.5 + 0.5 * Math.random()) }, fallingEndTimer)
		.start(engine.timer)
		.onComplete(() => leaf.destroy())
	// new Coroutine(function* (counter: number) {
	// 	// position.y += linear(counter, 0, -2, 100)
	// 	position.x = easeInSine(counter, start, fallingEnd, fallingEndTimer)
	// 	sprite.opacity = linear(counter, 1, 0, 100)

	// 	yield

	// 	leaf.destroy()
	// }, 100)
	return leaf
}
export default LeafEntity
