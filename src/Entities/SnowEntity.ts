import AnimationComponent from "../Components/AnimationComponent"
import ColorShader from "../Shaders/ColorShader"
import Coroutine from "../Globals/Coroutine"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import assets from "../Globals/Assets"
import { camera } from "../Globals/Initialize"
import waitFor from "../Utils/WaitFor"

const SnowEntity = () => {
	const snow = new Entity('rain')
	const tile = assets.effects.Snow
	snow.addComponent(new SpriteComponent(tile, { renderOrder: 10, shaders: [new ColorShader(1, 1, 1, 1, 'add')] }))
	snow.addComponent(new AnimationComponent({ default: tile, }))
	const position = snow.addComponent(new PositionComponent(
		((Math.random() - 0.5) * 2) * camera.right + camera.position.x,
		((Math.random() - 0.5) * 2) * camera.top + camera.position.y
	))
	new Coroutine(function* () {
		const max = Math.random() * 120 + 60
		for (let i = 0; i < max; i++) {
			position.y -= 0.5
			position.x -= 0.2
			yield* waitFor(2)
		}
		snow.destroy()
	})
	return snow


}
export default SnowEntity