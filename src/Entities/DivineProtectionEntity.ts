import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import Coroutines from "../Globals/Coroutines"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import { Vector2 } from "three"
import assets from "../Globals/Assets"
import waitFor from "../Utils/WaitFor"

const DivineProtectionEntity = (position: Vector2) => {
	const tile = assets.effects.Aura
	const spell = new Entity('divine protection')
	spell.addComponent(new PositionComponent(position.x, position.y))
	spell.addComponent(new SpriteComponent(tile, { scale: 2, renderOrder: 1 }))
	spell.addComponent(new AnimationComponent({ default: tile }))
	spell.addComponent(new BodyComponent({}, [{
		sensor: true, canCollideWith: [COLLISIONGROUPS.ENEMY], group: COLLISIONGROUPS.PLAYER, contact: true, width: tile.width * 2, height: tile.height * 2
	}]))
	spell.addComponent(new DamageComponent(5, [COLLISIONGROUPS.ENEMY], -1))
	Coroutines.add(function* () {
		yield* waitFor(120)
		spell.destroy()
	})
	return spell
}
export default DivineProtectionEntity