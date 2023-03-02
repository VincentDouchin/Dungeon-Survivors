import AnimationComponent from "../Components/AnimationComponent"
import Coroutine from "../Globals/Coroutine"
import { Entity } from "../Globals/ECS"
import ParticleEntity from "./ParticleEntitty"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import assets from "../Globals/Assets"
import { camera } from "../Globals/Initialize"
import waitFor from "../Utils/WaitFor"

const RainEntity = () => {
	const rain = new Entity('rain')
	const tile = assets.effects.rainDrop
	rain.addComponent(new SpriteComponent(tile, { renderOrder: 10, scale: 1.5 }))
	rain.addComponent(new AnimationComponent({ default: tile, }, { start: false, selectedFrame: Math.floor(Math.random() * 3) }))
	const position = rain.addComponent(new PositionComponent(
		((Math.random() - 0.5) * 2) * camera.right + camera.position.x,
		((Math.random() - 0.5) * 2) * camera.top + camera.position.y
	))
	new Coroutine(function* () {
		const max = Math.random() * 5 + 10
		for (let i = 0; i < max; i++) {
			position.y -= tile.height
			position.x -= tile.width / 2
			yield* waitFor(2)
		}
		ParticleEntity(position.x, position.y, assets.effects.rainFloor)
		rain.destroy()
	})
	return rain


}
export default RainEntity