import SOUNDS_SOURCES, { ALLSOUNDS } from "../Globals/Sounds"

import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import ExpirationComponent from "../Components/ExpirationComponent"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import StatsComponent from "../Components/StatsComponent"
import { Vector2 } from "three"
import assets from "../Globals/Assets"
import { soundManager } from "../Globals/Initialize"

const DivineProtectionEntity = (position: Vector2, stats: StatsComponent) => {
	const tile = assets.effects.Aura
	const spell = new Entity('divine protection')
	spell.addComponent(new PositionComponent(position.x, position.y))
	spell.addComponent(new SpriteComponent(tile, { scale: 2, renderOrder: 1 }))
	spell.addComponent(new AnimationComponent({ default: tile }))
	spell.addComponent(new BodyComponent({}, [{
		sensor: true, canCollideWith: [COLLISIONGROUPS.ENEMY], group: COLLISIONGROUPS.PLAYER, contact: true, width: tile.width * 2, height: tile.height * 2
	}]))
	spell.addComponent(new DamageComponent(stats.spellDamage.calculateValue(5), [COLLISIONGROUPS.ENEMY], -1))
	spell.addComponent(new ExpirationComponent(120))
	soundManager.play(ALLSOUNDS.Magic,)
	return spell
}
export default DivineProtectionEntity