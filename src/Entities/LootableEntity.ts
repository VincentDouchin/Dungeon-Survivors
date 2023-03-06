import { ECS, Entity } from "../Globals/ECS"

import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import ColorShader from "../Shaders/ColorShader"
import Coroutine from "../Globals/Coroutine"
import DroppableComponent from "../Components/DroppableComponent"
import { ECSEVENTS } from "../Constants/Events"
import HealthComponent from "../Components/HealthComponent"
import { LootableOptions } from "../Constants/Lootables"
import PositionComponent from "../Components/PositionComponent"
import PotionEntity from "./PotionEntity"
import SpriteComponent from "../Components/SpriteComponent"
import Tile from "../Utils/Tile"
import waitFor from "../Utils/WaitFor"

const LootableEntity = ({ tile, particle }: LootableOptions) => (x: number, y: number) => {
	const lootable = new Entity('lootable')
	lootable.addComponent(new SpriteComponent(tile, { renderOrder: 0 }))
	lootable.addComponent(new PositionComponent(x, y))
	lootable.addComponent(new BodyComponent(
		{ type: 'fixed' },
		[
			{ width: tile.width, height: tile.height, contact: false, group: COLLISIONGROUPS.ENEMY, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.WEAPON] }
		]))
	lootable.addComponent(new HealthComponent(30, COLLISIONGROUPS.ENEMY, false))
	lootable.addComponent(new DroppableComponent([
		PotionEntity
	]))
	const createParticle = () => {
		const buffer = particle.buffers[Math.floor(Math.random() * particle.frames)]
		const part = new Entity('part')
		const partSprite = part.addComponent(new SpriteComponent(new Tile({ buffer }), { shaders: [new ColorShader(1, 1, 1, 1)] }))
		const partPosition = part.addComponent(new PositionComponent(x, y))
		const direction = Math.sign(Math.random() - 0.5) / 5
		new Coroutine(function* () {
			for (let i = 0; i < 40; i++) {
				partPosition.y += (0.3) * (i > 25 ? -1 : 1)
				partPosition.x += direction * (1 + i / 40)
				partSprite.getUniforms(ColorShader).color.value = [1, 1, 1, 1 - i / 40]
				partSprite.render()
				yield
			}
			part.destroy()

		},)

	}
	ECS.eventBus.subscribe(ECSEVENTS.TAKE_DAMAGE, ({ entity }) => {
		if (entity === lootable) {
			createParticle()
		}
	})
	lootable.onDestroy(() => {
		const particleNb = Math.floor(Math.random() * 3) + 2
		new Coroutine(function* () {
			for (let i = 0; i < particleNb; i++) {
				createParticle()
				yield* waitFor(10 * Math.random())
			}
		})
	})
	return lootable
}
export default LootableEntity